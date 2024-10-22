import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import Logout from '../components/Logout';

const HomeScreen = ({ navigation, route }) => {
    const { username, email } = route.params
    return (
        <LinearGradient
            colors={['#0A2E4D', '#003B5C', '#005C8E']} // Darker gradient for background
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Welcome to Task Manager</Text>
                <Text style={styles.headerSubtitle}>Your tasks, organized and efficient.</Text>
            </View>

            <View style={styles.userProfileContainer}>
                <View style={styles.userProfile}>
                    <View style={styles.avatarContainer}>
                        <Icon name="person-circle-outline" size={50} color="#00BFFF" />
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>{username}</Text>
                        <Text style={styles.userEmail}>{email}</Text>
                    </View>
                </View>
                <View style={styles.logoutContainer}>
                    <Logout navigation={navigation} />
                </View>
            </View>

            <View style={styles.cardContainer}>
                {cardData.map((card, index) => (
                    <LinearGradient
                        key={index}
                        colors={['#003f55', '#00587a', '#007d99']} // Darker gradient for cards
                        style={styles.card}
                    >
                        <Icon name={card.icon} size={40} color="#ffffff" />
                        <Text style={styles.cardTitle}>{card.title}</Text>
                        <Text style={styles.cardDescription}>{card.description}</Text>
                    </LinearGradient>
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Create Task"
                    onPress={() => navigation.navigate('CreateTask')}
                    backgroundColor="#2980b9"
                    padding={16}
                />
                <Button
                    title="View Tasks"
                    onPress={() => navigation.navigate('TaskList')}
                    backgroundColor="#8e44ad"
                    padding={16}

                />
            </View>
        </LinearGradient>
    );
};

const cardData = [
    {
        title: 'Create Tasks',
        description: 'Easily create and manage your tasks with our intuitive interface.',
        icon: 'add-circle-outline',
    },
    {
        title: 'Track Progress',
        description: 'Keep track of your task status and deadlines in one place.',
        icon: 'list-circle-outline',
    },
    {
        title: 'Stay Organized',
        description: 'Organize your tasks by categories and priorities.',
        icon: 'folder-open-outline',
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E0E0E0', // Changed to light gray for contrast
        textAlign: 'center',
        marginTop: 25,
        margin: 0,
        padding: 0,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#B0B0B0', // Changed to a softer gray
        textAlign: 'center',
        marginBottom: 10,
    },
    userProfileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 10,
    },
    userProfile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: 10,
    },
    userDetails: {
        justifyContent: 'center',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E0E0E0', // Changed to light gray for contrast
    },
    userEmail: {
        fontSize: 14,
        color: '#B0B0B0', // Changed to a softer gray
    },
    logoutContainer: {
        marginLeft: 'auto',
    },
    cardContainer: {
        flex: 1,
        marginBottom: 20,
    },
    card: {
        borderRadius: 20,
        padding: 18,
        marginHorizontal: 20,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff', // White for card titles
        marginTop: 10,
    },
    cardDescription: {
        fontSize: 14,
        color: '#E0E0E0', // Light gray for descriptions
        textAlign: 'center',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 12,
        marginBottom: 15,

    },
});

export default HomeScreen;
