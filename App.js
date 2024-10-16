
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/components/AuthContext';
import HomeScreen from './src/screens/HomeScreen';
import CreateTask from './src/screens/CreateTask';
import TaskList from './src/screens/TaskList';
import Register from './src/screens/Register';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Register"} screenOptions={{
      title: 'Your Tasks',
      headerStyle: {
        backgroundColor: '#00796b',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
    }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateTask" component={CreateTask} />
      <Stack.Screen name="TaskList" component={TaskList} />
      <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
