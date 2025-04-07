import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import AppLink from "../../components/appLink/AppLink";
import { useState } from "react";

export default function History({ navigation }) {

    const [passwords, setPasswords] = useState([]);

  return (
    <LinearGradient
      colors={["#fb2d5d", "#FFAFBD", "white", "white", "#FFAFBD", "#fb2d5d"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.title}>Histórico de senhas</Text>
      <Image
        source={require("../../../assets/cadeado.png")}
        style={styles.logo}
      />

      <View style={styles.buttonsColumn}>
        <Text style={styles.passwordText}>
          {"\n"}
          Senha 1: 12345678
          {"\n"}
          Senha 2: 87654321
          {"\n"}
          Senha 3: 1234abcd
          {"\n"}
        </Text>
        <AppLink
          text="Voltar"
          route="Home"
          navigation={navigation}
        />
      </View>
      <StatusBar style="light" />
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
    width: "80%",
  },
});
