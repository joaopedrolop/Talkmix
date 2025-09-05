import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { setItem } from '../components/AsyncStorage';


export default function CadastroScreen() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarsenha, setConfimarsenha] = useState('');

  const Obrigatorio = async () => {
    if (nome.trim() === '' ||
      sobrenome.trim() === '' ||
      email.trim() === '' ||
      senha.trim() === '' ||
      confirmarsenha.trim() === '') {
      alert('Este campo é obrigatório preencha-o para continuar!');
      return;
    }
    await setItem('login', 'logada')
    navigation.navigate("Login")
  };

  return (
    <View>
      <View style={{ width: "100%", height: "100%", backgroundColor: "#EFE6DE", padding: 40, justifyContent: 'center' }}>
        <Text styles={styles.title}>Cadastre-se</Text>
        <Text style={styles.text}>Tenha um Conteúdo Diversificado para comentar sobre</Text>

        <View style={{ marginTop: 80 }}>
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='Nome' value={nome} onChangeText={setNome} />
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='Sobrenome' value={sobrenome} onChangeText={setSobrenome} />
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='E-mail' value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='Senha' value={senha} onChangeText={setSenha} />
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='Confirmar Senha' value={confirmarsenha} onChangeText={setConfimarsenha} />
        </View>

        <TouchableOpacity style={[styles.btn, { marginTop: 80, width: "100%" }]} onPress={Obrigatorio}>
          <Text style={styles.login}>Cadastre-se</Text>
        </TouchableOpacity>

        <View style={styles.txt}>
          <Text Text > já tem uma conta? </Text>
          <Pressable onPress={() => navigation.navigate("Login")}><Text style={{ fontWeight: 'bold', color: "#CC0000" }}>Faça Login!</Text></Pressable>
        </View>

      </View>
      <StatusBar hidden />
    </View >
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
  }
})
