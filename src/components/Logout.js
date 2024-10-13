import React from 'react';
import { Pressable, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('jwtToken');
            Alert.alert('Logged Out', 'You have been successfully logged out.');
            navigation.replace('Login'); // Ensure user can't go back to Home
        } catch (error) {
            Alert.alert('Error', 'Failed to log out. Please try again.');
        }
    };

    return (
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    logoutButton: {
        marginRight: 10,
    },
    logoutText: {
        fontSize: 16,
        color: 'black', // White text for better visibility in the header
        fontWeight: 'bold',
    },
});

export default Logout;
