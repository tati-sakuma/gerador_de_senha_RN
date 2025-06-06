import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, Image, Modal } from "react-native";
import * as Clipboard from "expo-clipboard";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { gerarSenha, savePassword } from "../../services/password/passwordService";
import AppLink from "../../components/appLink/AppLink";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import { TextInput } from "react-native-gesture-handler";
import api from "../../utils/api";

export default function Home({ navigation }) {
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeSenha, setNomeSenha] = useState("");

  const handleGerarSenha = () => {
    const novaSenha = gerarSenha();
    setPassword(novaSenha);
  };

  const copiarSenha = async () => {
    if (password) {
      try {
        await Clipboard.setStringAsync(password);
        Alert.alert("Senha copiada para a área de transferência.");
      } catch (error) {
        Alert.alert("Erro", "Não foi possível copiar a senha.");
      }
    } else {
      Alert.alert("Atenção", "Gere uma senha antes de tentar copiar.");
    }
  };

  const salvarSenha = async () => {
    if (password) {
      setModalVisible(true);
    } else {
      Alert.alert("Atenção", "Gere uma senha antes de tentar copiar.");
    }
  };


  return (
    <LinearGradient
      colors={["#fb2d5d", "#FFAFBD", "white", "white", "#FFAFBD", "#fb2d5d"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.title}>Gerador de senhas</Text>
      <Logo></Logo>

      <View style={styles.buttonsColumn}>
      <Text style={styles.passwordText}>{password || "Senha gerada"}</Text>
        <Button title="Gerar Senha" onPress={handleGerarSenha}></Button>

        <Button title="Salvar" onPress={salvarSenha}></Button>

        <Button title="Copiar" onPress={copiarSenha}></Button>

        <AppLink
          text="Ver histórico de senhas"
          route="History"
          navigation={navigation}
        />
      </View>
      <StatusBar style="light" />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000000aa" }}>
          <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "80%" }}>
            <Text>Digite um nome para a senha:</Text>
            <TextInput
              placeholder="Nome da senha"
              value={nomeSenha}
              onChangeText={setNomeSenha}
              style={{ borderBottomWidth: 1, marginTop: 10, marginBottom: 20 }}
            />
            <Button
              title="Salvar"
              onPress={() => {
                if (!nomeSenha) {
                  Alert.alert("Erro", "Digite um nome.");
                  savePassword(nomeSenha, password);
                  return;
                }

                // aqui você salva
                console.log("Salvando senha:", { nome: nomeSenha, senha: password });

                api.post("/senha", {
                  nome: nomeSenha,
                  senha: password,
                })
                .then(() => {
                  setModalVisible(false);
                  setNomeSenha("");
                  Alert.alert("Sucesso", "Senha salva com sucesso.");
                  navigation.navigate("History");
                })
                .catch((error) => {
                  console.error("Erro ao salvar senha:", error);
                  Alert.alert("Erro", "Não foi possível salvar a senha.");
                });
              }}
            />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    color: "##000C40",
  },
  passwordText: {
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
    alignItems: "center",
    width: "80%",
  },
});
