import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TaskItem = ({ number, title, description, date, state, onDelete, onToggle }) => {
    const getColorForState = () => {
        switch (state) {
            case 'new':
                return '#4CAF50'; // Green
            case 'Active':
                return '#FF9800'; // Orange
            case 'Closed':
                return '#F44336'; // Red
            default:
                return '#9E9E9E'; // Grey for undefined state
        }
    };

    const getToggleIconName = () => {
        return state === 'Closed' ? 'close-circle-outline' : 'checkmark-circle-outline';
    };

    const getToggleIconColor = () => {
        return state === 'Closed' ? '#F44336' : '#4CAF50';
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Task number */}
                <Text style={styles.numberText}>{number}</Text>

                {/* Task Title and Details */}
                <View style={styles.taskDetails}>
                    <Text style={styles.title}>{title || 'Untitled Task'}</Text>
                    <Text style={styles.description}>{description || 'No description available'}</Text>
                    <Text style={styles.date}>{date || 'No date provided'}</Text>
                </View>

                {/* Task State */}
                <Text style={[styles.state, { color: getColorForState() }]}>{state || 'No state'}</Text>
            </View>

            {/* Action icons (Delete, Toggle) */}
            <View style={styles.actions}>
                <Pressable onPress={onDelete} style={styles.icon}>
                    <Icon name="trash-outline" size={32} color="#d32f2f" />
                </Pressable>
                <Pressable onPress={onToggle} style={styles.icon}>
                    <Icon name={getToggleIconName()} size={32} color={getToggleIconColor()} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        marginVertical: 10,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    numberText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 10,
    },
    taskDetails: {
        flex: 1,
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
        fontSize: 16,
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    icon: {
        paddingHorizontal: 15,
    },
});

export default TaskItem;
