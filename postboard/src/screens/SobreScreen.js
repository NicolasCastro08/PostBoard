import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SobreScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>PostBoard</Text>
            <Text style={styles.info}>Versão 1.0</Text>
            <Text style={styles.info}>Desenvolvedor: Seu Nome</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center'
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#064e3b',
        marginBottom: 10
    },

    info: {
        fontSize: 16,
        color: '#374151'
    },
});