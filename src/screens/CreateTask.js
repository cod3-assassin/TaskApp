import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTask } from '../api/taskApi';
import Loader from '../components/Loader'; // Reuse the Loader component
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const CreateTask = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const handleSubmit = async () => {
        if (!title || !description) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            setLoading(true); // Show loader during request

            // Retrieve user ID from AsyncStorage
            const userId = await AsyncStorage.getItem('userId');

            // New task payload with user association
            const newTaskPayload = {
                data: {
                    title: title,
                    description: description,
                    date: date.toISOString(),
                    state: 'new',
                    users: userId
                },
            };

            console.log('New Task Payload:', newTaskPayload);

            const response = await addTask(newTaskPayload);
            console.log('Task Created Response:', response);

            Alert.alert('Success', 'Task created successfully!');
            setTitle('');
            setDescription('');
            setDate(new Date());
            navigation.navigate('TaskList');
        } catch (error) {
            console.error('Error creating task:', error);
            Alert.alert('Error', error.response?.data?.error?.message || 'Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Add a New Task</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Task Title"
                    placeholderTextColor="#aaa"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Task Description"
                    placeholderTextColor="#aaa"
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

                {/* Loader */}
                {loading && <Loader />}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#e0f7fa',
    },
    header: {
        marginBottom: 20,
        paddingVertical: 20,
        backgroundColor: '#00796b',
        borderRadius: 10,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    input: {
        height: 50,
        borderColor: '#00796b',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#f1f1f1',
        color: "black"
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateButton: {
        width: '48%',
        backgroundColor: '#4caf50',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton: {
        width: '48%',
        backgroundColor: '#007bff',
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
