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
  const [nomeError, setNomeError] = useState('');
  const [sobrenomeError, setSobrenomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [confirmarsenhaError, setConfirmarsenhaError] = useState('');

  const validarNome = (value) => {
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!regex.test(value)) {
      setNomeError("O nome não pode conter números ou caracteres especiais!");
      return false;
    } else {
      setNomeError('');
      setNome(value);
      return true;
    }

  };

  const validarSobrenome = (value) => {
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!regex.test(value)) {
      setSobrenomeError("O sobrenome não pode conter números ou caracteres especiais!")
      return false
    } else {
      setSobrenomeError('');
      setSobrenome(value);
      return true
    }

  };

  // const validarEmail = (value) => {
  //   const partesEmail = email.split("@");

  //   if (
  //     (partesEmail.length === 2 &&
  //       partesEmail[1].toLowerCase() === "gmail.com") ||
  //     (partesEmail.length === 2 &&
  //       partesEmail[1].toLowerCase() === "outlook.com") ||
  //     (partesEmail.length === 2 &&
  //       partesEmail[1].toLowerCase() === "hotmail.com")
  //   ) {
  //     setEmailError("Digite um E-mail valido!")
  //   } else {
  //     setEmailError('')
  //   }
  //   setEmail(value)
  // };


  const Obrigatorio = async () => {
    // Verificação dos dados
    if (nome.trim() === '' ||
      sobrenome.trim() === '' ||
      email.trim() === '' ||
      senha.trim() === '' ||
      confirmarsenha.trim() === '') {
      alert('Este campo é obrigatório preencha-o para continuar!');
      return;
    }

    if (!validarNome(nome)) {
      alert('O nome não pode conter números ou caracteres especiais!');
      return;
    }

    if (!validarSobrenome(sobrenome)) {
      alert('O sobrenome não pode conter números ou caracteres especiais!');
      return;
    }

    // if (!validarEmail(email)) {
    //   alert('Digite um E-mail valido!');
    //   return;
    // }

    await setItem('login', 'logada')
    navigation.navigate("Login")
  };

  return (
    <View>
      <View style={{ width: "100%", height: "100%", backgroundColor: "#EFE6DE", padding: 40, justifyContent: 'center' }}>
        <Text styles={styles.title}>Cadastre-se</Text>
        <Text style={styles.text}>Tenha um Conteúdo Diversificado para comentar sobre</Text>

        <View style={{ marginTop: 80 }}>
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='Nome' value={nome} onChangeText={validarNome} /> {nomeError ? <Text style={{ color: 'red' }}>{nomeError}</Text> : null}
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='Sobrenome' value={sobrenome} onChangeText={validarSobrenome} /> {sobrenomeError ? <Text style={{ color: 'red' }}>{sobrenomeError}</Text> : null}
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='E-mail' value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='Senha' value={senha} onChangeText={setSenha} />
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='Confirmar Senha' value={confirmarsenha} onChangeText={setConfimarsenha} />
        </View>

        <TouchableOpacity style={[styles.btn, { marginTop: 80, width: "100%" }]} onPress={Obrigatorio}>
          <Text style={styles.login}>Cadastre-se</Text>
        </TouchableOpacity>

        <View style={styles.txt}>
          <Text Text > Já tem uma conta? </Text>
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
