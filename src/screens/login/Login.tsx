import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, Image } from "react-native";
import Button from "../../components/Button";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../../components/Logo";
import { useAuth } from "../../hooks/useAuth";


export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { onLogin} = useAuth();

  const handleSignIn  = async () => {
    try {
      await onLogin(email, senha);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Erro", "E-mail ou senha inválidos");
    }

  };

  return (
    <LinearGradient
      colors={["#fb2d5d", "#FFAFBD", "white", "white", "#FFAFBD", "#fb2d5d"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Logo></Logo>
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Login" onPress={handleSignIn} />
      <Text style={styles.subtitle}>Não tem uma conta? Registre-se!</Text>
      <Button
        title="Criar conta"
        onPress={() => navigation.navigate("SignUp")}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#333",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    backgroundColor: "#4b4a4b",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    textAlign: "center",
  },
  buttonsColumn: {
    width: "80%",
  },
});
