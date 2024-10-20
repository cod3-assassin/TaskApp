// Loader.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#00796b" />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Semi-transparent background
    },
});

export default Loader;
