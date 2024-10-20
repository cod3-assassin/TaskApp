import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { registerUser } from '../api/taskApi';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader'; // Import the Loader component

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading

    const handleRegister = async () => {
        setLoading(true); // Start loading
        try {
            const response = await registerUser(username, email, password);
            console.log('Registered User:', response);
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error registering user:', error);
            // Only log the error to console, don't show to user
            Alert.alert('Error', 'Registration failed. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    if (loading) {
        return <Loader />; // Show loader while loading
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create Account</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.passwordInput}
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.iconContainer}>
                    <Icon name={passwordVisible ? 'visibility' : 'visibility-off'} size={20} color="#00796b" />
                </TouchableOpacity>
            </View>

            <Button title="Register" onPress={handleRegister} color="#00796b" />
            <Text style={styles.footer}>
                <Text style={{ color: '#000000' }}>Already have an account? </Text>
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                    Login here
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
        color: 'black',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderColor: '#00796b',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        height: 50,
    },
    passwordInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        color: 'black',
    },
    iconContainer: {
        paddingHorizontal: 10,
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

export default Register;
