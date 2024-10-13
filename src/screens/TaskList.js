import React, { useState } from 'react';
import { View, Text, FlatList, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import TaskItem from '../components/TaskItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();


    useFocusEffect(
        React.useCallback(() => {
            handleFetchTasks();
        }, [])
    );

    const handleFetchTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://192.168.8.228:1337/api/tasks');
            setTasks(response.data.data || []);
        } catch (error) {
            setError('Failed to fetch tasks. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditTask = (task) => {
        navigation.navigate('TaskEdit', { task });
    };

    const handleDeleteTask = async (taskId) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('jwtToken');

                            if (!token) {
                                Alert.alert('Error', 'You need to be logged in to delete a task.');
                                return;
                            }

                            console.log('Deleting task with ID:', taskId);
                            console.log('Using token:', token);

                            const response = await axios.delete(`http://192.168.8.228:1337/api/tasks/${taskId}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });

                            console.log('Delete response:', response.status);

                            if (response.status === 204) {
                                // Remove the deleted task from the list
                                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
                                Alert.alert('Success', 'Task has been deleted permanently.');
                            } else {
                                Alert.alert('Error', 'Failed to delete the task from Strapi.');
                            }
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete the task. Please try again.');
                            console.error('Delete Task Error:', error.response ? error.response.data : error.message);
                        }
                    },
                },
            ]
        );
    };

    const handleToggleTaskState = async (taskId) => {

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, state: task.state === 'Active' ? 'Closed' : 'Active' } : task
            )
        );
    };

    const renderTaskItem = ({ item }) => (
        <TaskItem
            title={item.title || 'Untitled Task'}
            description={item.description || 'No description available'}
            date={item.date || 'No date'}
            state={item.state || 'No state'}
            onEdit={() => handleEditTask(item)}
            onDelete={() => handleDeleteTask(item.id)}
            onToggle={() => handleToggleTaskState(item.id)}
        />
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#00796b" style={{ marginVertical: 20 }} />
            ) : error ? (
                <Text style={styles.error}>{error}</Text>
            ) : tasks.length === 0 ? (
                <Text style={styles.noTasks}>No tasks found. Please create a new task.</Text>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderTaskItem}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e0f7fa',
    },
    listContainer: {
        paddingBottom: 20,
    },
    error: {
        fontSize: 16,
        color: 'red',
        marginBottom: 20,
    },
    noTasks: {
        fontSize: 16,
        color: '#00796b',
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default TaskList;
