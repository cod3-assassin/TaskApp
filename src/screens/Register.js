import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { registerUser } from '../api/taskApi';

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await registerUser(username, email, password);  // Use the API function
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('Login');  // Navigate to login after successful registration
        } catch (error) {
            console.error('Error registering user:', error);
            Alert.alert('Error', error.response?.data.message || 'Registration failed');
        }
    };

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
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
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
        color: "black"
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
