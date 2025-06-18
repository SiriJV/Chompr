import React from 'react';
import "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavBar from './src/components/NavBar';


const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#121212"}}>
          <NavBar />
        </GestureHandlerRootView>
    );
}

export default App;