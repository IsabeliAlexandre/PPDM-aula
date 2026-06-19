import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';

import db from '../database/database';

export function TelaPergaminho({ route, navigation }) {

  const missaoRecebida = route.params?.missaoSelecionada;

  const [titulo, setTitulo] = useState(
    missaoRecebida ? missaoRecebida.titulo : ''
  );

  const [xp, setXp] = useState(
    missaoRecebida ? missaoRecebida.xp.toString() : ''
  );

  const salvarMissao = () => {

    try {

      if (titulo.trim() === '' || xp.trim() === '') {
        throw new Error("Os campos Título e XP não podem ficar vazios!");
      }

      const numeroXp = parseInt(xp);

      if (isNaN(numeroXp)) {
        throw new Error("O valor de XP deve ser apenas numérico!");
      }

      // UPDATE OU INSERT
      if (missaoRecebida) {

        db.runSync(
          'UPDATE missoes SET titulo = ?, xp = ? WHERE id = ?',
          [titulo, numeroXp, missaoRecebida.id]
        );

        Alert.alert("Sucesso!", "Missão atualizada.");

      } else {

        db.runSync(
          'INSERT INTO missoes (titulo, xp) VALUES (?, ?)',
          [titulo, numeroXp]
        );

        Alert.alert("Sucesso!", "Missão registrada no diário.");

      }

      navigation.goBack();

    } catch (erro) {

      Alert.alert("Falha na Missão", erro.message);

    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        {missaoRecebida ? 'Editar Missão' : 'Nova Missão'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome da missão..."
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={styles.input}
        placeholder="Recompensa (Ex: 500)"
        value={xp}
        onChangeText={setXp}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.botaoSalvar}
        onPress={salvarMissao}
      >
        <Text style={styles.textoBotao}>
          Salvar Missão
        </Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5dc',
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4a4a4a',
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  botaoSalvar: {
    width: '100%',
    height: 50,
    backgroundColor: '#8b4513',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});