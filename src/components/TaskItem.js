import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TaskItem = ({ title, description, date, state, onEdit, onDelete, onToggle }) => {
    return (
        <View style={styles.container}>
            <View style={styles.taskDetails}>
                <Text style={styles.title}>{title || 'Untitled Task'}</Text>
                <Text style={styles.description}>{description || 'No description available'}</Text>
                <Text style={styles.date}>{date || 'No date'}</Text>
                <Text style={styles.state}>{state ? `State: ${state}` : 'No state'}</Text>
            </View>
            <View style={styles.actions}>
                <Pressable onPress={onEdit}>
                    <Icon name="pencil-outline" size={24} color="#00796b" />
                </Pressable>
                <Pressable onPress={onDelete}>
                    <Icon name="trash-outline" size={24} color="#d32f2f" />
                </Pressable>
                <Pressable onPress={onToggle}>
                    <Icon name={state === 'Active' ? "checkmark-circle-outline" : "close-circle-outline"} size={24} color="#00796b" />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        elevation: 2,
        marginVertical: 10,
    },
    taskDetails: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    state: {
        fontSize: 12,
        color: '#00796b',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default TaskItem;
