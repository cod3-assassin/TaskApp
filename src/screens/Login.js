import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { loginUser } from '../api/taskApi';
import { useAuth } from '../components/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import CustomAlert from '../components/CustomAlert';  // Import CustomAlert

const Login = ({ navigation }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);  // State for showing alert
    const [alertTitle, setAlertTitle] = useState('');  // Alert title
    const [alertMessage, setAlertMessage] = useState('');  // Alert message
    const { setJwtToken, setIsAuthenticated } = useAuth();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const { token, user } = await loginUser(identifier, password);


            setJwtToken(token);
            setIsAuthenticated(true);
            navigation.navigate('Home', { username: user.username, email: user.email });
        } catch (error) {
            setAlertTitle('Login Failed');
            setAlertMessage('Please check your credentials');
            setAlertVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={['#0A2E4D', '#003B5C', '#005C8E']} style={styles.container}>
            {loading ? (
                <Loader />
            ) : (
                <View style={styles.scrollContainer}>
                    <LinearGradient colors={['#003f55', '#00587a', '#007d99']} style={styles.formContainer}>
                        <Text style={styles.headerTitle}>Welcome Back!</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Email or Username"
                            placeholderTextColor="#B0B0B0"
                            value={identifier}
                            onChangeText={setIdentifier}
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

                        <Pressable style={styles.submitButton} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </Pressable>

                        <Text style={styles.footer}>
                            <Text style={{ color: '#000000' }}>Don't have an account? </Text>
                            <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                                Register here
                            </Text>
                        </Text>
                    </LinearGradient>
                </View>
            )}

            {/* CustomAlert for showing login errors */}
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onConfirm={() => setAlertVisible(false)}  // Close alert on confirm
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
        backgroundColor: "#2980b9",
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

export default Login;
