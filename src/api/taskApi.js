import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set the API_URL based on whether you're running locally or using the deployed backend
// const API_URL = 'https://backend-eiwv.onrender.com';
// Change this to your local URL when testing locally, e.g., 'http://localhost:1337'
const API_URL = "http://10.0.2.2:1337"

// User login
// User login
// User login
export const loginUser = async (identifier, password) => {
    try {
        console.log('Logging in with:', { identifier, password });
        const response = await axios.post(`${API_URL}/api/auth/local`, {
            identifier,
            password
        });
        const token = response.data.jwt;
        const userId = response.data.user.id.toString(); // Convert user ID to string
        await AsyncStorage.setItem('jwtToken', token);  // Store JWT token in AsyncStorage
        await AsyncStorage.setItem('userId', userId);  // Store user ID in AsyncStorage
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


// Fetch tasks for the logged-in user
export const fetchTasks = async () => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        console.log('Fetching tasks with token:', token); // Log the token


        const response = await axios.get(`${API_URL}/api/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Make sure this is returning the expected data
    } catch (error) {
        console.error('Error fetching tasks:', error.response ? error.response.data : error);
        throw error;
    }
};



// Add new task
export const addTask = async (taskData) => {
    const token = await AsyncStorage.getItem('jwtToken'); // Get the JWT token

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Set the authorization header
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.post(`${API_URL}/api/tasks`, taskData, config); // Ensure correct endpoint
        console.log('Strapi Response:', response.data); // Log the full response data
        return response.data;
    } catch (error) {
        console.error('Error adding task:', error.response?.data || error.message); // Log error details
        throw error; // Re-throw the error to handle it in the calling function
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
