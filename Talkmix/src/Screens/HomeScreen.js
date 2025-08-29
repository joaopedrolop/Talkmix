import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { removeItem } from '../components/AsyncStorage';

const { width, height } = Dimensions.get("window")

export default function HomeScreen() {
  const navigation = useNavigation()

  const handleReset = async () => {
    await removeItem('login');
    navigation.push('Cadastro')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Página Home</Text>
      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <Text>Sair</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFE6DE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: width * 0.09,
    marginBottom: 20
  },
  resetButton: {
    backgroundColor: "#FAF0CA",
    padding: 10,
    borderRadius: 10
  }
});


