import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set the API_URL based on whether you're running locally or using the deployed backend
const API_URL = 'https://backend-eiwv.onrender.com';
// Change this to your local URL when testing locally, e.g., 'http://localhost:1337'

// User login
export const loginUser = async (identifier, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/local`, {
            identifier,
            password
        });
        const token = response.data.jwt;
        await AsyncStorage.setItem('jwtToken', token);  // Store JWT token in AsyncStorage
        return token;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// User registration
export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/local/register`, {
            username,
            email,
            password
        });
        return response.data;  // Return the full response to handle success
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Fetch all tasks
export const fetchTasks = async () => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        const response = await axios.get(`${API_URL}/api/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

// Add new task
export const addTask = async (taskData) => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        console.log('JWT Token:', token); // Log the token for debugging
        const response = await axios.post(`${API_URL}/api/tasks`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding task:', error.response.data);
        throw error;
    }
};

// Update task
export const updateTask = async (taskId, updatedData) => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        const response = await axios.put(`${API_URL}/api/tasks/${taskId}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error; // Re-throw to handle it in the caller
    }
};




// Delete task
// Delete task
export const deleteTask = async (taskId) => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        const response = await axios.delete(`${API_URL}/api/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(`Task ${taskId} deleted successfully`);
        return response; // Return the response
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error; // Rethrow the error for handling
    }
};
