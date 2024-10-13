import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskEdit = ({ route, navigation }) => {
    const { task } = route.params; // Get the task details passed from TaskList
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [date, setDate] = useState(task.date);
    const [state, setState] = useState(task.state);
    const handleUpdateTask = async () => {
        try {
            const token = await AsyncStorage.getItem('jwtToken');

            console.log('Updating task with ID:', task.id);

            const response = await axios.put(`http://192.168.8.228:1337/api/tasks/${task.id}`, {
                data: {
                    // Provide values directly for testing purposes
                    title: title,
                    description: description,
                    date: date,
                    state: state,
                },
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            Alert.alert('Success', 'Task updated successfully');
            navigation.goBack(); // Navigate back after update
        } catch (error) {
            console.error('Update Task Error:', error.response ? error.response.data : error.message);
            Alert.alert('Error', error.message || 'Something went wrong');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Task</Text>
            <TextInput
                style={styles.input}
                placeholder="Task Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Task Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Task Date"
                value={date}
                onChangeText={setDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Task State"
                value={state}
                onChangeText={setState}
            />
            <Button title="Update Task" onPress={handleUpdateTask} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e0f7fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});

export default TaskEdit;
