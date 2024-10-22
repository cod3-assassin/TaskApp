import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/components/AuthContext';
import HomeScreen from './src/screens/HomeScreen';
import CreateTask from './src/screens/CreateTask';
import TaskList from './src/screens/TaskList';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

// Custom Header Component
const CustomHeader = ({ title }) => {
  return (
    <LinearGradient
      colors={['#0A2E4D', '#003B5C', '#005C8E']}
      style={styles.headerContainer}
    >
      <Text style={styles.headerTitle}>{title}</Text>
    </LinearGradient>
  );
};

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'Home' : 'Register'}
      screenOptions={({ route }) => ({
        header: () => <CustomHeader title={route.name} />,
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateTask" component={CreateTask} />
      <Stack.Screen name="TaskList" component={TaskList} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
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

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
