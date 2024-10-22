import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const TaskItem = ({ number, title, description, date, state, onDelete, onToggle }) => {
    const getColorForState = () => {
        switch (state) {
            case 'new':
                return '#4CAF50';
            case 'active':
                return '#FF9800';
            case 'closed':
                return '#F44336';
            default:
                return '#9E9E9E';
        }
    };

    const getToggleIconName = () => {
        return state === 'closed' ? 'close-circle-outline' : 'checkmark-circle-outline';
    };

    const getToggleIconColor = () => {

        switch (state) {
            case "new":
                return "#4CAF50";
            case "active":
                return "#FF9800"
            case "closed":
                return "#F44336"
        }
    };

    return (
        <LinearGradient
            colors={['#003f55', '#00587a', '#007d99']}
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.numberText}>{number}</Text>
                <View style={styles.taskDetails}>
                    <Text style={styles.title}>{title || 'Untitled Task'}</Text>
                    <Text style={styles.description}>{description || 'No description available'}</Text>
                    <Text style={styles.date}>{date || 'No date provided'}</Text>
                </View>
                <Text style={[styles.state, { color: getColorForState() }]}>{state || 'No state'}</Text>
            </View>
            <View style={styles.actions}>
                <Pressable onPress={onDelete} style={styles.icon}>
                    <Icon name="trash-outline" size={32} color="#d32f2f" />
                </Pressable>
                <Pressable onPress={onToggle} style={styles.icon}>
                    <Icon name={getToggleIconName()} size={32} color={getToggleIconColor()} />
                </Pressable>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        marginVertical: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    numberText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginRight: 10,
    },
    taskDetails: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#ffffff",
    },
    description: {
        fontSize: 14,
        color: '#ffffff',
    },
    date: {
        fontSize: 12,
        color: '#ffffff',
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
