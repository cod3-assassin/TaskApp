import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set the API_URL based on whether you're running locally or using the deployed backend
// const API_URL = 'https://backend-eiwv.onrender.com';
// Change this to your local URL when testing locally, e.g., 'http://localhost:1337'
const API_URL = "http://10.0.2.2:1337"

// User login
export const loginUser = async (identifier, password) => {
    try {
        // Sending login request to Strapi
        const response = await axios.post(`${API_URL}/api/auth/local`, {
            identifier,
            password
        });

        const token = response.data.jwt; // Get JWT token
        const userId = response.data.user.id.toString(); // Get user ID
        const username = response.data.user.username; // Get username
        const email = response.data.user.email; // Get email

        // Store JWT token and user details in AsyncStorage
        await AsyncStorage.setItem('jwtToken', token);
        await AsyncStorage.setItem('userId', userId);
        // await AsyncStorage.setItem('username', username); // Optional: Store username
        // await AsyncStorage.setItem('email', email); // Optional: Store email

        // Return both token and user details (username and email)
        return {
            token,
            user: {
                id: userId,
                username: username,
                email: email
            }
        };
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
        const token = response.data.jwt;
        const userId = response.data.user.id.toString(); // Convert user ID to string
        await AsyncStorage.setItem('jwtToken', token);  // Store JWT token in AsyncStorage
        await AsyncStorage.setItem('userId', userId);  // Store user ID in AsyncStorage
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};



// Fetch tasks for the logged-in user
// Fetch tasks for the logged-in user
export const fetchTasks = async () => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        const userId = await AsyncStorage.getItem('userId'); // Fetch the logged-in user ID
        // console.log('Fetching tasks for user with ID:', userId); // Log user ID

        // Use populate to include the user relation and filter tasks for the specific user
        const response = await axios.get(`${API_URL}/api/tasks?populate=user&filters[user][id][$eq]=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        // console.log('Fetched Tasks Response:', response.data); // Log the full response
        return response.data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching tasks:', error.response ? error.response.data : error);
        throw error;
    }
};



// Add new task
export const addTask = async (taskData) => {
    const token = await AsyncStorage.getItem('jwtToken'); // Get the JWT token
    const userId = await AsyncStorage.getItem('userId'); // Get the user ID

    const taskWithUser = { ...taskData, user: userId }; // Attach user ID to the task data

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.post(`${API_URL}/api/tasks`, taskWithUser, config);
        // console.log('Strapi Response:', response.data);
        // return response.data;
    } catch (error) {
        console.error('Error adding task:', error.response ? error.response.data : error.message);
        throw error;
    }
};


export const updateTask = async (taskId, updatedData) => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        // Make sure the data is sent inside a `data` object
        const response = await axios.put(`${API_URL}/api/tasks/${taskId}`,
            { data: updatedData },  // Wrap the updatedData inside `data`
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',  // Ensure content type is set correctly
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;  
    }
};



export const deleteTask = async (taskId) => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        const response = await axios.delete(`${API_URL}/api/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log('Delete Response:', response);
        return response;
    } catch (error) {
        console.error('Error deleting task:', error.response ? error.response.data : error.message);
        throw error;
    }
};



