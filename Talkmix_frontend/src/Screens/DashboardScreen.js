import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
//import { ProgressChart, BarChart } from 'react-native-chart-kit';

import { removeItem } from "../components/AsyncStorage";

const { width, height } = Dimensions.get("window");

export default function DashboardScreen() {
  const navigation = useNavigation();

  const handleReset = async () => {
    await removeItem("login");
    navigation.push("Biblioteca");
  };

  const handleReset2 = async () => {
    await removeItem("login");
    navigation.push("Login");
  };

  // const chartConfig = {
  //   backgroundGradientFrom: '#1E2923',
  //   backgroundGradientTo: '#08130D',
  //   color: (opacidade = 1) => `rgba(26, 255, 146, ${opacidade} )`
  // }

  //const data = [0.4, 0.6, 0.8];

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: "absolute",
          bottom: 600,
          left: 0,
          width: "100%",
          height: "40%",
          backgroundColor: "#f9dbb2",
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      >
        <Text style={styles.txt}>Username</Text>
      </View>

      {/* <ProgressChart
        data={data}
        width={screenWidth}
        heigth={220}
        chartConfig={chartConfig}
      /> */}

      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <Text>Ir para a Biblioteca</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReset2} style={styles.resetButton}>
        <Text>Sair</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFE6DE",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: width * 0.09,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: "#c7d4e2",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
  txt: {
    fontSize: width * 0.09,
    marginTop: 160,
    marginLeft: 20,
    color: "#832220",
  },
});
