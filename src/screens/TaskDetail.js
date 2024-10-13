import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const TaskDetail = ({ route }) => {
    const { task } = route.params; // Assuming you're passing the task as a parameter
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
            <Text style={styles.date}>{task.date}</Text>
            <Text style={styles.state}>{task.state}</Text>
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
    description: {
        fontSize: 16,
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        marginBottom: 5,
    },
    state: {
        fontSize: 14,
        color: '#00796b',
    },
});

export default TaskDetail;
