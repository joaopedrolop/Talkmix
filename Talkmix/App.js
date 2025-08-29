// Importa as páginas Pages
// import Cadastro from '../src/pages/Cadastro';
// import Login from '../src/pages/Login';
// import Home from '../src/pages/Home';

import onBoarding from "../src/pages/onBoarding";
import cadastro from "../Talkmix/src/pages/cadastro";
import login from "../src/pages/login";
import home from "../Talkmix/src/pages/home"

// Importa o componente que envolverá nesta navegação
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="onBoarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onBoarding" component={onBoarding} />
        <Stack.Screen name="Cadastro" component={cadastro} />
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Home" component={home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
