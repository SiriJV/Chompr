import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, StatusBar } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import Suggestions from '../components/Suggestions';

const clientId = '38ba685be9484817b828d263941fb5b2';
const redirectUri = 'exp://aiyjufo-anonymous-8081.exp.direct';
const scopes = ['user-read-email', 'user-read-recently-played', 'playlist-read-private'];

const spotifyEndpoints = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const SearchScreen = () => {
    const [token, setToken] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<{ type: string; name: string; image: string; creator: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const codeVerifierRef = useRef<string | null>(null);

    const [request, response, spotifyLogin] = AuthSession.useAuthRequest({ clientId, scopes, redirectUri, responseType: 'code', usePKCE: true, }, spotifyEndpoints);

    useEffect(() => {
        if (request?.codeVerifier) {
        codeVerifierRef.current = request.codeVerifier;
        }
    }, [request]);

    useEffect(() => {
        const getToken = async () => {
        if (response?.type === 'success' && codeVerifierRef.current) {
            const code = response.params.code;

            const details = { client_id: clientId, grant_type: 'authorization_code', code, redirect_uri: redirectUri, code_verifier: codeVerifierRef.current };
            const formBody = Object.entries(details).map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&');

            try {
                const tokenResponse = await fetch('https://accounts.spotify.com/api/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: formBody });
                const tokenJson = await tokenResponse.json();

                if (tokenJson.access_token) {
                    setToken(tokenJson.access_token);
                } else {
                    console.error('Failed to get access token:', tokenJson);
                }
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        }
        };
        getToken();
    }, [response]);

    const searchSpotify = async () => {
        if (!token || !searchTerm.trim()) return;

        setLoading(true);
        setResults([]);

        try {
            const query = encodeURIComponent(searchTerm.trim());
            const searchUrl = `https://api.spotify.com/v1/search?q=${query}&type=album,playlist&limit=10`;

            const response = await fetch(searchUrl, { headers: { Authorization: `Bearer ${token}` }});
            const data = await response.json();

            const allResults: { type: string; name: string; image: string; creator: string }[] = [];

            if (data.albums?.items) {
                data.albums.items.forEach((album: any) => {
                if (!album?.name) return;
                allResults.push({
                    type: 'Album',
                    name: album.name,
                    image: album.images?.[0]?.url || '',
                    creator: album.artists?.map((a: any) => a?.name).join(', ') || 'Unknown artist',
                });
              });
            }

            if (data.playlists?.items) {
                data.playlists.items.forEach((playlist: any) => {
                if (!playlist?.name) return;
                allResults.push({
                    type: 'Playlist',
                    name: playlist.name,
                    image: playlist.images?.[0]?.url || '',
                    creator: playlist.owner?.display_name || 'Unknown creator',
                });
              });
            }

            setResults(allResults);
        } catch (error) {
        console.error('Search failed:', error);
        }
        setLoading(false);
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#1F1F1F" }} edges={['top', 'left', 'right']}>
                <StatusBar barStyle="light-content" backgroundColor="black" />
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput editable={!!token} style={styles.input} keyboardAppearance="dark" placeholder="Search albums and playlists" placeholderTextColor="#B3B3B3" value={searchTerm} onChangeText={setSearchTerm} onSubmitEditing={searchSpotify} returnKeyType="search" />
                    </View>

                    {loading && <ActivityIndicator color="coral" style={{ marginTop: 20 }} />}

                    {searchTerm.trim() === '' ? (
                        <Suggestions token={token} onSelectItem={(item) => {}} />
                    ) : (
                    <ScrollView style={{ paddingHorizontal: 15 }}>
                        {results.map((item, i) => (
                        <View key={i} style={[styles.resultItem, i === 0 && { marginTop: 15 }]}>
                            {item.image && <Image source={{ uri: item.image }} style={styles.resultImage} />}
                            <View style={{ marginLeft: 10, flex: 1 }}>
                            <Text style={styles.resultName}>{item.name}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={[styles.resultType, { color: item.type === 'Album' ? 'yellow' : 'hotpink' }]}>{item.type}</Text>
                                <Text style={styles.resultCreator}> • {item.creator}</Text>
                            </View>
                            </View>
                        </View>
                        ))}
                    </ScrollView>
                    )}

                    {!token && (
                    <View style={styles.loginOverlay}>
                        <View style={styles.loginModal}>
                            <Text style={styles.loginTitle}>Sign in with Spotify</Text>
                            <Text style={styles.loginSubtitle}>To provide personalized search results and playlists, we need your permission to access your Spotify account data.</Text>
                            <TouchableOpacity disabled={!request} style={styles.loginButtonModal} onPress={() => spotifyLogin()}>
                                <Text style={styles.loginText}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>              
                    )}
                </View>
            </SafeAreaView>
        </>
    );
}

export default SearchScreen;

const styles = StyleSheet.create({
    inputContainer: {
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 15,
        backgroundColor: '#1F1F1F',
    },
    container: {
        paddingBottom: 0,
        flex: 1,
        backgroundColor: '#121212',
    },
    input: {
        backgroundColor: '#353535',
        color: '#fff',
        padding: 8,
        borderRadius: 8,
    },
    resultItem: {
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
    },
    resultType: {
        fontSize: 14,
    },
    resultName: {
        color: '#fff',
        fontSize: 16,
        marginTop: 2,
    },
    resultImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    resultCreator: {
        color: '#B3B3B3',
        fontSize: 14,
    },
    loginOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    loginModal: {
        backgroundColor: '#282828',
        borderRadius: 10,
        padding: 25,
        width: '80%',
    },
    loginTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginBottom: 8,
    },
    loginSubtitle: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 16,
    },
    loginButtonModal: {
        backgroundColor: 'hotpink',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
    },
    loginText: {
        color: '#121212',
        fontWeight: '600',
        fontSize: 16,
    },  
});