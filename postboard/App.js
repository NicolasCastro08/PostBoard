import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';

export default function App() {

  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
    ).start();
  }, [opacity]);

  const testarAlerta = () => {
    Alert.alert(
      'Funcionou!',
      'O projeto está pronto para começar.',
      [{ text: 'OK' }]
    );
  };

  const verDocumentacao = () => {
    Alert.alert(
      'Documentação',
      'API: https://jsonplaceholder.typicode.com',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.Text style={[styles.titulo, { opacity }]}>
        PostBoard
      </Animated.Text>

      <Text style={styles.subtitulo}>Nicolas de Castro Ferreira</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={testarAlerta}
      >
        <Text style={styles.textoBotao}>Testar alerta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={verDocumentacao}
      >
        <Text style={styles.textoBotao}>Ver documentação</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a5f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a56db',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 40,
  },
  botao: {
    backgroundColor: '#1a56db',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});