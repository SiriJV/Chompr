import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfilePage = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>profile page is empty at the moment</Text>
            </View>
        </>
    )
}

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#121212',
  },
  text: {
    color: "white"
  },
});