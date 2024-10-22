import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from './CustomAlert';

const Logout = ({ navigation }) => {
    const [alertVisible, setAlertVisible] = useState(false);

    const handleLogoutConfirmation = () => {
        setAlertVisible(true);
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('jwtToken');
            setAlertVisible(false); // Hide alert
            navigation.replace('Login');
        } catch (error) {
            // Handle error
            setAlertVisible(false); // Hide alert
            Alert.alert('Error', 'Failed to log out. Please try again.');
        }
    };

    return (
        <>
            <Pressable onPress={handleLogoutConfirmation} style={styles.logoutButton}>
                <Icon name="log-out-outline" size={24} color="#ffffff" />
            </Pressable>

            {/* Custom Alert for Logout Confirmation */}
            <CustomAlert
                visible={alertVisible}
                title="Logout"
                message="Are you sure you want to log out?"
                onConfirm={handleLogout}
                onCancel={() => setAlertVisible(false)}
                confirmText="Yes"
                cancelText="No"
            />
        </>
    );
};

const styles = StyleSheet.create({
    logoutButton: {
        marginRight: 10,
    },
});

export default Logout;
