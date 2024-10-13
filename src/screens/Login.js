import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../components/AuthContext'; // Assuming you are using AuthContext

const Login = ({ navigation }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const { setJwtToken, setIsAuthenticated } = useAuth(); // Access context functions

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.8.228:1337/api/auth/local', {
                identifier: identifier,
                password: password
            });

            const token = response.data.jwt;
            console.log('Login successful. JWT Token:', token);

            setJwtToken(token);  // Store JWT token in AuthContext
            setIsAuthenticated(true);  // Mark user as authenticated
            await AsyncStorage.setItem('jwtToken', token);

            console.log('Login successful');
            navigation.navigate('Home'); // Navigate to Home after login
        } catch (error) {
            console.error('Error logging in:', error);
            Alert.alert('Login Failed', 'Please check your credentials');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome Back!</Text>
            <TextInput
                placeholder="Email or Username"
                value={identifier}
                onChangeText={setIdentifier}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} color="#00796b" />
            <Text style={styles.footer}>
                Don't have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                    Register here
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#e0f7fa',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00796b',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#00796b',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    footer: {
        marginTop: 20,
        textAlign: 'center',
    },
    link: {
        color: '#00796b',
        fontWeight: 'bold',
    },
});

export default Login;