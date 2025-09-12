import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, Text, TouchableOpacity, View, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Onboarding from 'react-native-onboarding-swiper';
import { setItem } from '../components/AsyncStorage';

const { width, height } = Dimensions.get("window");

export default function OnBoarding() {
  const navigation = useNavigation();

  const handleDone = () => {
    setItem('onboarded', '1');
    navigation.navigate("Cadastro")
  }

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[{
          backgroundColor: "#EFE6DE",
          color: "#CC0000",
          title: "Bem-Vindo(a) ao TalkMix!",
          subtitle: "Comente sobre os seus Livros Favoritos."
        },
        {
          backgroundColor: "#EFE6DE",
          color: "#CC0000",
          title: "Um Catálogo Diversificado!",
          subtitle: "Tenha uma Experiência Divertida e Relaxante."
        }
        ]}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFE6DE',
  },
  lottie: {
    width: width * 0.9,
    height: width
  },
  doneButton: {
    padding: 15,
    backgroundColor: "#EFE6DE",
    borderTopLeftRadius: "100%",
    borderBottomLeftRadius: '100%'
  }
});
