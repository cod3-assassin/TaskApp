import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { registerUser } from '../api/taskApi';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import CustomAlert from '../components/CustomAlert';

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    const handleRegister = async () => {
        // Input validation
        if (!username || !email || !password) {
            setAlertTitle('Validation Failed');
            setAlertMessage('Please fill in all fields.');
            setAlertVisible(true);
            return;
        }

        setLoading(true);
        try {
            const response = await registerUser(username, email, password);
            setAlertTitle('Success');
            setAlertMessage('Account created successfully!');
            setAlertVisible(true);
            // Navigate to Login after alert dismissal
            setTimeout(() => navigation.navigate('Login'), 2000);
        } catch (error) {
            setAlertTitle('Error');
            setAlertMessage('Registration failed. Please try again.');
            setAlertVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={['#0A2E4D', '#003B5C', '#005C8E']}
            style={styles.container}
        >
            {loading ? (
                <Loader />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <LinearGradient colors={['#003f55', '#00587a', '#007d99']}
                        style={styles.formContainer}>
                        <Text style={styles.headerTitle}>Create Account</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            placeholderTextColor="#B0B0B0"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#B0B0B0"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Password"
                                placeholderTextColor="#B0B0B0"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!passwordVisible}
                            />
                            <Pressable onPress={() => setPasswordVisible(!passwordVisible)} style={styles.iconContainer}>
                                <Icon name={passwordVisible ? 'visibility' : 'visibility-off'} size={20} color="#00796b" />
                            </Pressable>
                        </View>

                        <Pressable style={styles.submitButton} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Register</Text>
                        </Pressable>

                        <Text style={styles.footer}>
                            <Text style={{ color: '#000000' }}>Already have an account? </Text>
                            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                                Login here
                            </Text>
                        </Text>
                    </LinearGradient>
                </ScrollView>
            )}

            {/* Custom Alert for validation and error messages */}
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onConfirm={() => setAlertVisible(false)}
                confirmText="OK"
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 10,
    },
    formContainer: {
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 7,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#00BFFF',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#003f55',
        color: 'white',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderColor: '#00BFFF',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#003f55',
        height: 50,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 10,
        color: 'white',
    },
    iconContainer: {
        paddingHorizontal: 10,
    },
    submitButton: {
        backgroundColor: "#8e44ad",
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        marginTop: 20,
        textAlign: 'center',
    },
    link: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Register;
