import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';

type Item = {
    id: string;
    name: string;
    image: string;
    creator: string;
    type: string;
    uri?: string;
};

type Section = {
    title: string;
    data: Item[];
};

const Suggestions = ({ token, onSelectItem }: { token: string | null; onSelectItem: (item: Item) => void; }) => {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) return;

        const fetchDefaults = async () => {
        setLoading(true);
        try {
            const headers = { Authorization: `Bearer ${token}` };

            const [playlistsRes, recentRes, newRes] = await Promise.all([
                fetch('https://api.spotify.com/v1/me/playlists?limit=10', { headers }),
                fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', { headers }),
                fetch('https://api.spotify.com/v1/browse/new-releases?limit=10', { headers }),
            ]);

            const playlistsJson = await playlistsRes.json();
            const recentJson = await recentRes.json();
            const newJson = await newRes.json();

            const getImageUrl = (obj: any) => (obj?.images?.[0]?.url ? obj.images[0].url : '');

            const userPlaylists: Item[] = playlistsJson.items?.map((pl: any) => ({
                id: pl.id,
                name: pl.name,
                image: getImageUrl(pl),
                creator: pl.owner?.display_name || 'Unknown',
                type: 'User Playlist',
                uri: pl.uri,
            })) ?? [];

            const recentAlbums: Item[] = recentJson.items?.map((playback: any) => {
            const album = playback.track?.album;
            return album
                ? {
                    id: album.id,
                    name: album.name,
                    image: getImageUrl(album),
                    creator: album.artists?.map((a: any) => a.name).join(', ') || 'Unknown artist',
                    type: 'Recently Played Album',
                    uri: album.uri,
                }
                : null;
            }).filter(Boolean) ?? [];

            const newAlbums: Item[] = newJson.albums?.items?.map((al: any) => ({
                id: al.id,
                name: al.name,
                image: getImageUrl(al),
                creator: al.artists?.map((a: any) => a.name).join(', ') || 'Unknown artist',
                type: 'New Release',
                uri: al.uri,
            })) ?? [];

            setSections([
                { title: 'Your Playlists', data: userPlaylists },
                { title: 'Recently Played Albums', data: recentAlbums },
                { title: 'New Releases', data: newAlbums },
            ]);
        } catch (err) {
            console.error('Error fetching default content:', err);
        } finally {
            setLoading(false);
        }
        };

        fetchDefaults();
    }, [token]);

    if (loading) {
        return <ActivityIndicator color="coral" style={{ marginTop: 20 }} />;
    }

    if (!sections.length) {
        return (
        <View style={{ marginTop: 40, alignItems: 'center' }}>
            <Text style={{ color: '#aaa' }}>No content available</Text>
        </View>
        );
    }

    const renderItem = ({ item }: { item: Item }) => (
        <TouchableOpacity onPress={() => onSelectItem(item)} style={styles.itemContainer}>
            {item.image ? <Image source={{ uri: item.image }} style={styles.itemImage} /> : null}
            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.itemCreator} numberOfLines={1}>{item.creator}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={{ flex: 1 }}>
            {sections.map((section, index) => (
                <View key={section.title} style={{ marginBottom: 25, marginTop: index === 0 ? 20 : 0 }}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <FlatList horizontal data={section.data} keyExtractor={(item) => item.id} renderItem={renderItem} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} />
                </View>
            ))}
        </ScrollView>
    );
}

export default Suggestions;

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600',
        paddingLeft: 15,
        marginBottom: 10,
    },
    itemContainer: {
        width: 140,
        marginRight: 15,
    },
    itemImage: {
        width: 140,
        height: 140,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    itemName: {
        marginTop: 6,
        fontSize: 15,
        color: 'white',
        fontWeight: '600',
    },
    itemCreator: {
        fontSize: 13,
        color: '#bbb',
    },
});