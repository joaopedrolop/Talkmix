// Importa as páginas Pages
// import Cadastro from '../src/pages/Cadastro';
// import Login from '../src/pages/Login';
// import Home from '../src/pages/Home';

import onBoarding from "../src/pages/onBoarding";
import Cadastro from "../src/pages/Cadastro";

// Importa o componente que envolverá nesta navegação
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="onBoarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onBoarding" component={onBoarding} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
