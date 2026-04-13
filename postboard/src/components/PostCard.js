import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PostCard({ post, onPress }) {

    // ✅ EXERCÍCIO 3 - resumo maior
    const resumo = post.body.length > 120
        ? post.body.substring(0, 120) + '...'
        : post.body;

    // ✅ EXERCÍCIO 3 - cor dinâmica
    const corBadge = post.userId % 2 === 0 ? '#dcfce7' : '#fef3c7';
    const corTexto = post.userId % 2 === 0 ? '#166534' : '#92400e';

    // ✅ EXERCÍCIO 3 - data fake
    const dataHoje = new Date().toLocaleDateString();

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.cabecalho}>
                <View style={[styles.badge, { backgroundColor: corBadge }]}>
                    <Text style={[styles.badgeTexto, { color: corTexto }]}>
                        #{post.id}
                    </Text>
                </View>

                <Text style={styles.titulo}>{post.title}</Text>
            </View>

            <Text style={styles.resumo}>{resumo}</Text>

            <View style={styles.rodape}>
                <Text>👤 Usuário #{post.userId}</Text>

                {/* ✅ EXERCÍCIO 3 - data */}
                <Text>{dataHoje}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        // Sombra no iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        // Sombra no Android
        elevation: 2,
    },
    cabecalho: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
        gap: 10,
    },
    badge: {
        backgroundColor: '#e8f0fe',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 3,
        marginTop: 2,
    },
    badgeTexto: {
        color: '#1a56db',
        fontSize: 12,
        fontWeight: '700',
    },
    titulo: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#1e3a5f',
        lineHeight: 21,
        textTransform: 'capitalize',
    },
    resumo: {
        fontSize: 13,
        color: '#6b7280',
        lineHeight: 19,
        marginBottom: 12,
    },
    rodape: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
        paddingTop: 10,
    },
    autor: {
        fontSize: 12,
        color: '#9ca3af',
    },
    lerMais: {
        fontSize: 12,
        color: '#1a56db',
        fontWeight: '600',
    },
});
