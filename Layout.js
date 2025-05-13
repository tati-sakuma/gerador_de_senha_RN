import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/screens/home/Home";
import History from "./src/screens/history/History";
import Login from "./src/screens/login/Login";
import SignUp from "./src/screens/login/SignUp";
import TestApi from "./src/screens/testApi/testApi";
import { useAuth } from "./src/hooks/useAuth";  

const Stack = createNativeStackNavigator();

export default function Layout() {
  const {authState, onLogout} = useAuth(); 

  return (
    <GestureHandlerRootView style={{ flex: 1 }
    }>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TesteApi"
            component={TestApi}
            options={{
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: "Login",
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerTitle: "Nova conta",
            }}
          />
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
    </GestureHandlerRootView >
  );
}