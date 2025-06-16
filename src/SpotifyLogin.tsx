import * as React from 'react';
import { Button, View, Text } from 'react-native';
import * as AuthSession from 'expo-auth-session';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function SpotifyLogin() {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: '38ba685be9484817b828d263941fb5b2',
      scopes: ['user-read-email', 'playlist-modify-public'],
      redirectUri: AuthSession.makeRedirectUri()
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log('Authorization code:', code);
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login to Spotify</Text>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}