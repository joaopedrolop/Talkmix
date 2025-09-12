import { useState, useEffect } from 'react';

// Importa o componente que envolverá nesta navegação
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa as páginas Pages
import OnBoarding from '../pages/OnBoarding';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Biblioteca from '../pages/Biblioteca';

import { getItem } from "../components/AsyncStorage";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null)

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, [])

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded')

    if (onboarded == "1") {
      setShowOnboarding(false)
    } else {
      setShowOnboarding(true)
    }
  }

  if (showOnboarding === null) {
    return null
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OnBoarding">
          <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name="Biblioteca" component={Biblioteca} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OnBoarding">
          <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastron} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name="Biblioteca" component={Biblioteca} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
