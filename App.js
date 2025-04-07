import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/screens/home/Home";
import History from "./src/screens/history/History";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "Gerador de Senhas",
            // headerShown: false 
          }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{
            headerTitle: "Histórico de senhas",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
