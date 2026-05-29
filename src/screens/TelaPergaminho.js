import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

    // Recebemos 'route' e 'navigation' por padrão do React Navigation
    export function TelaPergaminho({ route, navigation }) {
      
      // 2.2.5 Lendo os parâmetros recebidos da Tela 1 (se existirem)
    const missaoRecebida = route.params?.missaoSelecionada;

  // 2.2.3 Entrada, processamento e saída de dados: 
  // Estados que vão guardar o que o usuário digita (Entrada)
  // Se recebemos uma missão, o campo já vem preenchido; se não, fica vazio.
    const [titulo, setTitulo] = useState(missaoRecebida ? missaoRecebida.titulo : '');  
    const [xp, setXp] = useState(missaoRecebida ? missaoRecebida.xp.toString() : '');     

  // 2.2.1 Tratamento de eventos e exceções: Função acionada pelo evento de clique no botão
    const salvarMissao = () => {
      try {
        // PROCESSAMENTO: Validando se os campos estão em branco
        if (titulo.trim() === '' || xp.trim() === '') {
          //o trim() remove espaços em branco para evitar que o usuário insira apenas espaços e isso seja considerado válido
          // Disparando uma exceção customizada caso falte dados
          throw new Error("Os campos Título e XP não podem ficar vazios!");
        }

      // PROCESSAMENTO: Garantindo que o XP seja um número válido
      const numeroXp = parseInt(xp);
      if (isNaN(numeroXp)) {
        throw new Error("O valor de XP deve ser apenas numérico!");
      }

      // SAÍDA: Mostrando sucesso ao usuário
      Alert.alert("Sucesso!", "Missão registrada no diário.");
      
      // 2.2.4 Navegação: Retornando para a tela anterior (Lista) após salvar
      navigation.goBack();

    } catch (erro) {
      // 2.2.1 Tratamento de exceções: O bloco catch captura o erro e avisa o aluno 
      // sem deixar o aplicativo "crashar" (fechar sozinho).
      Alert.alert("Falha na Missão", erro.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes da Missão</Text>

      {/* 2.2.3 ENTRADA de dados: Onde o usuário digita */}
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da missão..."
        value={titulo}
        onChangeText={setTitulo} // Atualiza o estado a cada letra digitada
      />

      <TextInput
        style={styles.input}
        placeholder="Recompensa (Ex: 500)"
        value={xp}
        onChangeText={setXp}
        keyboardType="numeric" // Mostra apenas o teclado de números no celular
      />

{/* 2.2.1 Evento de clique para ativar a função salvarMissao */}
      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarMissao}>
        <Text style={styles.textoBotao}>Salvar Missão</Text>
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