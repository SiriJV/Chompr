import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Game from './src/components/Game';
import "react-native-gesture-handler";
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SpotifyLogin from './src/SpotifyLogin';

import * as AuthSession from 'expo-auth-session';
import NavBar from './src/components/NavBar';


const App = () => {
  const redirectUri = AuthSession.makeRedirectUri();
  console.log("Redirect URI:", redirectUri);


  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black"}}>
      {/* <Game /> */}
      {/* <SpotifyLogin /> */}
      <NavBar />
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});