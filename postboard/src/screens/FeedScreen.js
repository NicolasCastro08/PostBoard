import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    View, Text, FlatList, StyleSheet,
    TouchableOpacity, RefreshControl,
} from 'react-native';

import { getPosts } from '../services/api';
import PostCard from '../components/PostCard';
import LoadingIndicator from '../components/LoadingIndicator';
import EmptyState from '../components/EmptyState';

export default function FeedScreen({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    // ✅ EXERCÍCIO 5 - estados de paginação
    const [pagina, setPagina] = useState(1);
    const [carregandoMais, setCarregandoMais] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('FormularioTab')}
                    style={{ marginRight: 4, padding: 4 }}
                >
                    <Text style={{ color: '#fff', fontSize: 28 }}>+</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        carregarPosts();
    }, []);

    async function carregarPosts() {
        try {
            setLoading(true);
            setErro(null);

            const dados = await getPosts();
            setPosts(dados);

            // ✅ EXERCÍCIO 2 - contador no header
            navigation.setOptions({
                title: `PostBoard (${dados.length})`
            });

        } catch (e) {
            setErro('Não foi possível carregar os posts.');
        } finally {
            setLoading(false);
        }
    }

    async function onRefresh() {
        try {
            setRefreshing(true);
            setErro(null);

            const dados = await getPosts();
            setPosts(dados);

        } catch (e) {
            setErro('Erro ao atualizar.');
        } finally {
            setRefreshing(false);
        }
    }

    // ✅ EXERCÍCIO 5 - função carregar mais
    async function carregarMais() {
        try {
            setCarregandoMais(true);

            const proximaPagina = pagina + 1;

            const novosDados = await fetch(
                `https://jsonplaceholder.typicode.com/posts?_page=${proximaPagina}&_limit=10`
            ).then(res => res.json());

            setPosts(prev => [...prev, ...novosDados]);
            setPagina(proximaPagina);

        } catch (e) {
            console.warn('Erro ao carregar mais');
        } finally {
            setCarregandoMais(false);
        }
    }

    if (loading) {
        return <LoadingIndicator mensagem="Carregando posts..." />;
    }

    if (erro && posts.length === 0) {
        return (
            <EmptyState
                icone="⚠️"
                titulo="Erro"
                mensagem={erro}
                textoBotao="Tentar novamente"
                onBotao={carregarPosts}
            />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <PostCard
                        post={item}
                        onPress={() => navigation.navigate('Detalhes', { post: item })}
                    />
                )}

                // ✅ EXERCÍCIO 5 - botão carregar mais
                ListFooterComponent={
                    <TouchableOpacity
                        onPress={carregarMais}
                        disabled={carregandoMais}
                        style={{ padding: 16, alignItems: 'center' }}
                    >
                        <Text style={{ color: '#1a56db' }}>
                            {carregandoMais ? 'Carregando...' : 'Carregar mais'}
                        </Text>
                    </TouchableOpacity>
                }

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f3f4f6' },
});