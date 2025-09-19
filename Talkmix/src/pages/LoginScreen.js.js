import { StatusBar } from "react-native";
import { StyleSheet, Pressable, Text, TouchableOpacity, View, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { setItem } from "../components/AsyncStorage";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const Obrigatorio = async () => {
    if (email.trim() === '' || senha.trim() === '') {
      alert('Este campo é obrigatório preencha-o para continuar!');
      return;
    }
    await setItem('login', 'logada')
    navigation.navigate("Home")
  };

  return (
    <View>
      <View style={{ width: "100%", height: "100%", backgroundColor: "#EFE6DE", padding: 40, justifyContent: 'center' }}>
        <Text styles={styles.title}>Login</Text>


        <View style={{ marginTop: 80 }}>
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='E-mail' value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholderTextColor={"#CC0000"} placeholder='Senha' value={senha} onChangeText={setSenha} />
        </View>

        <TouchableOpacity style={[styles.btn, { marginTop: 80, width: "100%" }]} onPress={Obrigatorio}>
          <Text style={styles.login}>Logue-se</Text>
        </TouchableOpacity>

        <View style={styles.txt}>
          <Pressable onPress={() => navigation.navigate("Cadastro")}><Text style={{ fontWeight: 'bold', color: "#CC0000" }}>Esqueceu a Senha?</Text></Pressable>
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
