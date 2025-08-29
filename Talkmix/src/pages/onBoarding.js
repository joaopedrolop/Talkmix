import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

//Importa o Styles
import { styles } from "../styles/styles";

import { useNavigation } from '@react-navigation/native';

export default function onBoarding() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem Vindo</Text>
      <Text style={styles.subtitulo}>Converse sobre Livros e sobre ESportes</Text>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.login}>Entre com o seu Email</Text>
      </TouchableOpacity>

      <View style={styles.txt}>
        <Text>Não tem uma conta?</Text>
        <Pressable onPress={() => navigation.navigate("Cadastro")}><Text style={{ fontWeight: 'bold' }}>Cria uma Aqui!</Text></Pressable>
      </View>

      <StatusBar hidden />
    </View>
  );
}
