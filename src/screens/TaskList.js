import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TaskItem from '../components/TaskItem';
import { fetchTasks, deleteTask, updateTask } from '../api/taskApi';
import LinearGradient from 'react-native-linear-gradient';
import CustomAlert from '../components/CustomAlert';
import Loader from '../components/Loader'; // Import the Loader component

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');
    const [documentIdToDelete, setDocumentIdToDelete] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            handleFetchTasks();
        }, [])
    );

    const handleFetchTasks = async () => {
        setLoading(true);
        try {
            const response = await fetchTasks();
            setTasks(response.data);
        } catch (error) {
            setError('Failed to fetch tasks. Please try again later.');
            setAlertTitle('Error');
            setAlertMessage('Failed to fetch tasks. Please try again later.');
            setAlertVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTask = async (documentId) => {
        setDocumentIdToDelete(documentId);
        setAlertTitle('Delete Task');
        setAlertMessage('Are you sure you want to delete this task?');
        setAlertVisible(true);
    };

    const confirmDeleteTask = async () => {
        try {
            const response = await deleteTask(documentIdToDelete);
            if (response.status === 204) {
                setTasks((prevTasks) => prevTasks.filter((task) => task.documentId !== documentIdToDelete));
                setAlertTitle('Success');
                setAlertMessage('Task has been deleted permanently.');
            } else {
                setAlertTitle('Error');
                setAlertMessage('Failed to delete the task from Strapi.');
            }
        } catch (error) {
            setAlertTitle('Error');
            setAlertMessage('Failed to delete the task. Please try again.');
        } finally {
            setAlertVisible(false);
            setDocumentIdToDelete(null);
        }
    };

    const handleToggleTaskState = async (documentId, currentState) => {
        let newState = '';

        // Determine the new state based on the current state
        switch (currentState.toLowerCase()) {  // Normalize to lowercase
            case 'new':
                newState = 'active';
                break;
            case 'active':
                newState = 'closed';
                break;
            case 'closed':
                newState = 'new';
                break;
            default:
                newState = 'new';
        }

        // Update the task in the Strapi backend
        try {
            const updatedTaskData = { state: newState };  // Create the update payload
            const updatedTask = await updateTask(documentId, updatedTaskData);  // Use documentId

            // If the update is successful, update the state locally
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.documentId === documentId ? { ...task, state: newState } : task
                )
            );
        } catch (error) {
            console.error('Failed to update task state:', error);
            setAlertTitle('Error');
            setAlertMessage('Failed to update task state. Please try again later.');
            setAlertVisible(true);
        }
    };


    const renderTaskItem = ({ item, index }) => (
        <TaskItem
            number={index + 1}
            title={item.title || 'Untitled Task'}
            description={item.description || 'No description available'}
            date={item.date || 'No date'}
            state={item.state || 'No state'}
            onDelete={() => handleDeleteTask(item.documentId)}
            onToggle={() => handleToggleTaskState(item.documentId, item.state)}
        />
    );


    return (
        <LinearGradient colors={['#0A2E4D', '#003B5C', '#005C8E']} style={styles.container}>
            {loading ? (
                <Loader /> // Use the Loader component here
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

            {/* Custom Alert for Delete Confirmation and Errors */}
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onConfirm={documentIdToDelete ? confirmDeleteTask : () => setAlertVisible(false)}
                onCancel={documentIdToDelete ? () => setAlertVisible(false) : null}
                confirmText={documentIdToDelete ? 'Delete' : 'OK'}
                cancelText={documentIdToDelete ? 'Cancel' : null}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
