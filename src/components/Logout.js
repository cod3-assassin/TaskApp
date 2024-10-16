import React from 'react';
import { Pressable, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('jwtToken');
            Alert.alert('Logged Out', 'You have been successfully logged out.');
            navigation.replace('Login');
        } catch (error) {
            Alert.alert('Error', 'Failed to log out. Please try again.');
        }
    };

    return (
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="sign-out" size={24} color="black" />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    logoutButton: {
        marginRight: 10,
    },
});

export default Logout;
