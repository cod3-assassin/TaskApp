import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Loader = ({ message = 'Loading...' }) => {
    return (
        <LinearGradient
            colors={['#0A2E4D', '#003B5C', '#005C8E']}
            style={styles.loaderContainer}
        >
            <View style={styles.loaderContent}>
                <ActivityIndicator size="large" color="#00BFFF" />
                <Text style={styles.loadingText}>{message}</Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContent: {
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
});

export default Loader;
