import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Clipboard,
} from "react-native";
import { getUserPasswords, deletePassword } from "../../services/password/passwordService";
import Button from "../../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

const History = ({ navigation }) => {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    navigation.setOptions({
      title: "Histórico de senhas",
      headerStyle: {
        backgroundColor: "#fff",
        elevation: 2,
      },
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: "500",
        color: "#000",
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 16, padding: 8 }}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchPasswords = async () => {
    try {
      setLoading(true);
      const data = await getUserPasswords();

      const formattedData = data.map((passwordItem) => ({
        id: passwordItem.id, 
        senha: passwordItem.senha,
        servico: passwordItem.nome || "Senha Gerada",
      }));

      setPasswords(formattedData);
    } catch (error) {
      console.error("Erro ao buscar senhas:", error);
      ToastAndroid.show("Erro ao carregar senhas", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyPassword = async (password) => {
    try {
      await Clipboard.setString(password);
      ToastAndroid.show("Senha copiada!", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Erro ao copiar senha", ToastAndroid.SHORT);
    }
  };

  const handleDeletePassword = async (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja deletar esta senha?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            try {
              // Chama o service para deletar do backend
              await deletePassword(id);

              // Remove da lista local
              const updatedPasswords = passwords.filter(
                (item) => item.id !== id
              );
              setPasswords(updatedPasswords);

              ToastAndroid.show(
                "Senha deletada com sucesso!",
                ToastAndroid.SHORT
              );
            } catch (error) {
              console.error("Erro ao deletar senha:", error);
              ToastAndroid.show("Erro ao deletar senha", ToastAndroid.SHORT);
            }
          },
        },
      ]
    );
  };

  const renderPasswordItem = ({ item }) => {
    const isVisible = visiblePasswords[item.id];
    const displayPassword = isVisible ? item.senha : "••••••••";

    return (
      <View style={styles.passwordItem}>
        <View style={styles.passwordHeader}>
          <Text style={styles.serviceName}>{item.servico || "Serviço"}</Text>
          <TouchableOpacity
            onPress={() => handleDeletePassword(item.id)}
            style={styles.deleteButton}
          >
            <Icon name="delete" size={20} color="#ff4444" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordRow}>
          <Text style={styles.passwordText}>{displayPassword}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => togglePasswordVisibility(item.id)}
              style={styles.actionButton}
            >
              <Icon
                name={isVisible ? "visibility-off" : "visibility"}
                size={20}
                color="#6227a3"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => copyPassword(item.senha)}
              style={styles.actionButton}
            >
              <Icon name="content-copy" size={20} color="#6227a3" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Icon name="lock" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>Nenhuma senha salva</Text>
      <Text style={styles.emptySubtitle}>
        Suas senhas salvas aparecerão aqui
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando senhas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Minhas Senhas</Text>

        <FlatList
          data={passwords}
          renderItem={renderPasswordItem}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={
            passwords.length === 0 ? styles.emptyListContainer : null
          }
          showsVerticalScrollIndicator={false}
        />

        {passwords.length > 0 && (
          <View style={styles.footerContainer}>
            <Button title="Voltar" onPress={() => navigation.goBack()} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6227a3",
    textAlign: "center",
    marginBottom: 20,
  },
  passwordItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  deleteButton: {
    padding: 4,
  },
  passwordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passwordText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginRight: 12,
  },
  actionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    width: "90%",
  },
});

export default History;
