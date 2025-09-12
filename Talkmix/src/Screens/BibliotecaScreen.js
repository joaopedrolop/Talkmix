import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { removeItem } from '../components/AsyncStorage';

const { width, height } = Dimensions.get("window")

export default function BibliotecaScreen() {
  const navigation = useNavigation()

  const handleReset = async () => {
    await removeItem('login');
    navigation.push('Dashboard')
  }

  return (
    <SafeAreaView style={styles.container}>

      <View>
        <Text style={styles.txt}>Biblioteca</Text>
      </View>

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
    backgroundColor: "#c7d4e2",
    padding: 10,
    borderRadius: 10,
    marginTop: 20
  },
  txt: {
    fontSize: width * 0.09,
    color: "#832220",
    justifyContent: "flex-start"
  }
});
