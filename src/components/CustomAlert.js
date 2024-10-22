import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomAlert = ({ visible, title, message, onConfirm, onCancel, confirmText = 'OK', cancelText = 'Cancel' }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
        >
            <View style={styles.centeredView}>
                <LinearGradient colors={['#003f55', '#00587a', '#007d99']} style={styles.modalView}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttonContainer}>
                        {onCancel ? (
                            <>
                                <Pressable style={styles.cancelButton} onPress={onCancel}>
                                    <Text style={styles.buttonText}>{cancelText}</Text>
                                </Pressable>
                                <Pressable style={styles.confirmButton} onPress={onConfirm}>
                                    <Text style={styles.buttonText}>{confirmText}</Text>
                                </Pressable>
                            </>
                        ) : (
                            <Pressable style={styles.singleButton} onPress={onConfirm}>
                                <Text style={styles.buttonText}>{confirmText}</Text>
                            </Pressable>
                        )}
                    </View>
                </LinearGradient>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    message: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        width: '45%',
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: '#2980b9',
        padding: 10,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
    },
    singleButton: {
        backgroundColor: '#2980b9',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default CustomAlert;
