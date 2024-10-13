import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import Logout from '../components/Logout'; // Import Logout component

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Logout button on the top right corner */}
            <View style={styles.logoutContainer}>
                <Logout navigation={navigation} />
            </View>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Welcome to Task Manager</Text>
                <Text style={styles.headerSubtitle}>Manage your tasks efficiently</Text>
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Create Tasks</Text>
                    <Text style={styles.cardDescription}>
                        Easily create and manage your tasks with our intuitive interface.
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Track Progress</Text>
                    <Text style={styles.cardDescription}>
                        Keep track of your task status and deadlines in one place.
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Stay Organized</Text>
                    <Text style={styles.cardDescription}>
                        Organize your tasks by categories and priorities.
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Achieve Goals</Text>
                    <Text style={styles.cardDescription}>
                        Set and achieve your goals with our productivity tools.
                    </Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Create Task"
                    onPress={() => navigation.navigate('CreateTask')}
                    backgroundColor="#00796b"
                    padding={16}
                />
                <Button
                    title="View Tasks"
                    onPress={() => navigation.navigate('TaskList')}
                    backgroundColor="#004d40"
                    padding={16}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e0f7fa',


    },
    logoutContainer: {
        position: 'absolute',
        top: 10,
        right: 10,

    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#00796b',
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#004d40',
    },
    cardContainer: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00796b',
    },
    cardDescription: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default HomeScreen;
