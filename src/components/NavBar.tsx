import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import SearchPage from '../pages/SearchPage';
import GamePage from '../pages/GamePage';
import ProfilePage from '../pages/ProfilePage';
import SearchIcon from './icons/SearchIcon';
import GameIcon from './icons/GameIcon';
import ProfileIcon from './icons/ProfileIcon';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }: { route: { name: string } }) => ({
    headerShown: false,
    tabBarIcon: ({ color }: { color: string }) => {
      switch (route.name) {
        case "Search":
          return <SearchIcon color={color} />;
        case "Game":
          return <GameIcon color={color} />;
        case "Profile":
          return <ProfileIcon color={color} />;
        default:
          return null;
      }
    },
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: styles.tabBar,
  });
  
  const Navbar = () => (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Search" component={SearchPage} />
        <Tab.Screen name="Game" component={GamePage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
  
  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: "#121212",
      borderTopWidth: 1,
      borderColor: "#1F1F1F",
      paddingBottom: 5,
      paddingTop: 10,
      height: 60,
      marginBottom: 50,
    },
});
  
export default Navbar;