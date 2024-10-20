import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { loginUser } from '../api/taskApi';  // Import the login function
import { useAuth } from '../components/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';  // For eye icon
import Loader from '../components/Loader';  // Import the Loader

const Login = ({ navigation }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);  // Password visibility state
    const [loading, setLoading] = useState(false);  // State for loader
    const { setJwtToken, setIsAuthenticated } = useAuth();

    const handleLogin = async () => {
        setLoading(true);  // Show loader after clicking login
        try {
            console.log('Login request:', { identifier, password });
            const token = await loginUser(identifier, password);  // Use the API function
            console.log('Login response:', token);
            setJwtToken(token);  // Store JWT token in AuthContext
            setIsAuthenticated(true);
            navigation.navigate('Home');  // Navigate to Home after login
        } catch (error) {
            console.error('Error logging in:', error);
            Alert.alert('Login Failed', 'Please check your credentials');
        } finally {
            setLoading(false);  // Stop loader when request is done
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
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.passwordInput}
                    secureTextEntry={!passwordVisible}  // Toggle visibility
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.iconContainer}>
                    <Icon name={passwordVisible ? 'visibility' : 'visibility-off'} size={20} color="#00796b" />
                </TouchableOpacity>
            </View>

            <Button title="Login" onPress={handleLogin} color="#00796b" />

            {/* Loader component only shows when login is in progress */}
            {loading && <Loader />}

            <Text style={styles.footer}>
                <Text style={{ color: '#000000' }}>Don't have an account? </Text>
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
        color: "black",
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderColor: '#00796b',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        height: 50,  // Match the height of the input
    },
    passwordInput: {
        flex: 1,  // Take up remaining space
        paddingHorizontal: 10,
        color: 'black',
    },
    iconContainer: {
        paddingHorizontal: 10,  // Padding for the icon
        justifyContent: 'center',
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
