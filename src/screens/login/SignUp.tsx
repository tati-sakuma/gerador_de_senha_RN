import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Button from "../../components/Button";
import { TextInput } from "react-native-gesture-handler";
import { useAuth } from "../../hooks/useAuth";

export default function NewUser({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const { onRegister } = useAuth();

  const isValidForm = useMemo(() => {
    return (
      senha === confirmarSenha &&
      !!nome &&
      !!email &&
      !!senha &&
      !!confirmarSenha
    );
  }, [nome, email, senha, confirmarSenha]);

  const register = async () => {
    try {
      if (senha !== confirmarSenha) {
        Alert.alert("Erro", "As senhas não coincidem.");
        return;
      }
      await onRegister(nome, email, senha, confirmarSenha);
      Alert.alert("Sucesso", "Usuário registrado com sucesso!");
      navigation.navigate("Login");
    } catch (error: any) {
      console.error("Erro ao registrary", error);
      const msg =
        error.response?.data?.message || // se for erro vindo do backend (ex: JSON com "message")
        error.message ||                 // se for erro do próprio JS/Error
        "Erro desconhecido";

      Alert.alert("Erro", msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>

      <TextInput
      style={styles.input}
      placeholder="Nome"
      value={nome}
      onChangeText={setNome}
      />

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
      value={senha}
      onChangeText={setSenha}
      secureTextEntry
      />

      <TextInput
      style={styles.input}
      placeholder="Confirmar Senha"
      value={confirmarSenha}
      onChangeText={setConfirmarSenha}
      secureTextEntry
      />

      <Button title="Cadastrar" disabled={!isValidForm} onPress={register} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
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
    backgroundColor: "#eee",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
});
