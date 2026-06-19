import React, { useState, useCallback } from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import db from '../database/database';

export default function TelaTaverna({ navigation }) {

  const [missoes, setMissoes] = useState([]);

  function carregarMissoes() {

    const dados = db.getAllSync(
      'SELECT * FROM missoes'
    );

    setMissoes(dados);

  }

  function excluirMissao(id) {

    Alert.alert(
      'Excluir missão',
      'Deseja realmente excluir esta missão?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          onPress: () => {

            db.runSync(
              'DELETE FROM missoes WHERE id = ?',
              [id]
            );

            carregarMissoes();

          }
        }
      ]
    );

  }

  useFocusEffect(
    useCallback(() => {
      carregarMissoes();
    }, [])
  );

  const lidarComToqueLongo = (titulo) => {

    Alert.alert(
      'Missão concluída',
      `Você finalizou sua missão: ${titulo}. XP adquirido!`
    );

  };

  const totalXp = missoes.reduce(
    (total, missao) => total + missao.xp,
    0
  );

  return (

    <View style={styles.container}>

      <Text style={styles.totalXp}>
        🏆 {totalXp} XP
      </Text>

      <Text style={styles.titulo}>
        Quadro de Missões
      </Text>

      <FlatList
        data={missoes}

        keyExtractor={(item) =>
          item.id.toString()
        }

        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.cartaoMissao}

            onPress={() => {
              navigation.navigate(
                'Pergaminho',
                { missaoSelecionada: item }
              );
            }}

            onLongPress={() =>
              lidarComToqueLongo(item.titulo)
            }
          >

            <Text style={styles.textoMissao}>
              {item.titulo}
            </Text>

            <Text style={styles.textoXp}>
              XP: {item.xp}
            </Text>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirMissao(item.id)}
            >
              <Text style={styles.textoExcluir}>
                Excluir
              </Text>
            </TouchableOpacity>

          </TouchableOpacity>

        )}
      />

      <TouchableOpacity
        style={styles.botaoNovaMissao}

        onPress={() =>
          navigation.navigate('Pergaminho')
        }
      >

        <Text style={styles.textoBotao}>
          + Nova Missão
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5dc',
    padding: 20
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4a4a4a',
    textAlign: 'center'
  },

  totalXp: {
    position: 'absolute',
    top: 15,
    right: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8b4513',
    zIndex: 1
  },

  cartaoMissao: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2
  },

  textoMissao: {
    fontSize: 18,
    color: '#000'
  },

  textoXp: {
    fontSize: 14,
    color: '#666',
    marginTop: 5
  },

  botaoExcluir: {
    marginTop: 10,
    backgroundColor: '#8b4513',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center'
  },

  textoExcluir: {
    color: '#fff',
    fontWeight: 'bold'
  },

  botaoNovaMissao: {
    backgroundColor: '#8b4513',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }

});