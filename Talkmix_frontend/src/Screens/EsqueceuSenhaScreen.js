import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { setItem } from '../components/AsyncStorage';

export default function EsqueceuSenhaScreen() {
  const navigation = useNavigation();

  const [senha, setSenha] = useState('');
  const [confirmarsenha, setConfimarsenha] = useState('');

  const Obrigatorio = async () => {
    if (senha.trim() === '') {
      alert('Este campo é obrigatório preencha-o para continuar!');
      return;
    }

    await setItem('login', 'logada')
    navigation.navigate("Login")
  };

  return (
    <View>
      <View style={{ width: "100%", height: "100%", backgroundColor: "#EFE6DE", padding: 40, justifyContent: 'center' }}>
        <Text style={styles.title}>Esqueceu a Senha?</Text>
        <Text style={styles.text}>Coloque uma nova aqui!</Text>

        <View style={{ marginTop: 80 }}>
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='Senha' value={senha} onChangeText={setSenha} secureTextEntry />
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='Confirmar Senha' value={confirmarsenha} onChangeText={setConfimarsenha} secureTextEntry />
        </View>

        <TouchableOpacity style={[styles.btn, { marginTop: 80, width: "100%" }]} onPress={Obrigatorio}>
          <Text style={styles.login}>Mudar Senha</Text>
        </TouchableOpacity>

      </View>
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#CC0000"
  },
  text: {
    color: "#CC0000"
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#CC0000",
    paddingLeft: 7,
    padding: 15
  },
  txt: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: "#CC0000",
    borderRadius: 20,
    width: 120,
    height: 40,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  login: {
    fontStyle: 'italic',
    color: 'white'
  },
  error: {
    color: "#CC0000",
    marginBottom: 10
  }
})
