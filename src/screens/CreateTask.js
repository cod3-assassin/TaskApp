import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Pressable, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';  // Import useFocusEffect
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTask } from '../api/taskApi';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CustomAlert from '../components/CustomAlert';

const CreateTask = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    // Reset the form whenever the component comes into focus
    useFocusEffect(
        useCallback(() => {
            setTitle('');
            setDescription('');
            setDate(new Date());
            setShowDatePicker(false);
            setLoading(false);
            setAlertVisible(false);
        }, [])
    );

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const handleSubmit = async () => {
        if (!title || !description) {
            setAlertTitle('Error');
            setAlertMessage('Please fill in all fields');
            setAlertVisible(true);
            return;
        }

        try {
            setLoading(true);
            const userId = await AsyncStorage.getItem('userId');
            const newTaskPayload = {
                data: {
                    title: title,
                    description: description,
                    date: date.toISOString(),
                    state: 'new',
                    user: { id: userId },
                },
            };

            await addTask(newTaskPayload);
            setAlertTitle('Success');
            setAlertMessage('Task created successfully!');
            setAlertVisible(true);
            setTitle('');
            setDescription('');
            setDate(new Date());
            navigation.navigate('TaskList');
        } catch (error) {
            setAlertTitle('Error');
            setAlertMessage(error.response?.data?.error?.message || 'Failed to create task');
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
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <LinearGradient colors={['#003f55', '#00587a', '#007d99']} style={styles.formContainer}>
                        <View style={styles.formContainer}>
                            <Text style={styles.headerTitle}>Add a New Task</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Task Title"
                                placeholderTextColor="#B0B0B0"
                                value={title}
                                onChangeText={setTitle}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Task Description"
                                placeholderTextColor="#B0B0B0"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={4}
                            />

                            <View style={styles.row}>
                                <Pressable style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                                    <Text style={styles.buttonText}>
                                        Select Date: {date.toLocaleDateString()}
                                    </Text>
                                </Pressable>

                                <Pressable style={styles.submitButton} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>Create Task</Text>
                                </Pressable>
                            </View>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                />
                            )}
                        </View>
                    </LinearGradient>
                </ScrollView>
            )}
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onConfirm={() => setAlertVisible(false)}
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
        padding: 20,
    },
    formContainer: {
        borderRadius: 10,
        padding: 20,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateButton: {
        width: '48%',
        backgroundColor: '#2980b9',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: "#8e44ad",
        width: '48%',
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
});

export default CreateTask;
