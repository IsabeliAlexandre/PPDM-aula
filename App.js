import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaTaverna from './src/screens/TelaTaverna';
import { TelaPergaminho } from './src/screens/TelaPergaminho';

const Stack = createStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="Taverna">

        <Stack.Screen
          name="Taverna"
          component={TelaTaverna}
          options={{ title: 'Diário de Missões' }}
        />

        <Stack.Screen
          name="Pergaminho"
          component={TelaPergaminho}
          options={{ title: 'Nova Missão' }}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}