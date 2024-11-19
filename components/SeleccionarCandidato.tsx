import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { TextInput } from "react-native-paper";
import axios from "axios";

type UserData = {
  name: string;
  lastName: string;
  numCuenta: string;
  instList: string;
  email: string;
  rolList: string;
};

const SeleccionarCandidato = () => {
  const [otherCandidate, setOtherCandidate] = useState("");
  const [selectedVotes, setSelectedVotes] = useState<string[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para loader

  const router = useRouter();

  const isVoteButtonDisabled =
    selectedVotes.length === 0 && otherCandidate.trim() === "";

  useEffect(() => {
    (async () => {
      const storedData = await AsyncStorage.multiGet([
        "name",
        "lastName",
        "numCuenta",
        "instList",
        "email",
        "rolList",
      ]);
      const dataObject = Object.fromEntries(storedData);
      setUserData({
        name: dataObject.name || "",
        lastName: dataObject.lastName || "",
        numCuenta: dataObject.numCuenta || "",
        instList: dataObject.instList || "Facultad de Ingeniería",
        email: dataObject.email || "",
        rolList: dataObject.rolList || "Estudiante",
      });
      startTimer();
    })();
  }, []);

  const startTimer = () => {
    Alert.alert(
      "Atención",
      "Cuentas con 3 minutos a partir de ahora para votar.",
    );

    setTimeout(() => {
      handleLogout();
    }, 180000); // 3 minutos
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isAuthenticated");
    Alert.alert("Sesión Cerrada", "Has cerrado sesión correctamente.");
    router.replace("/");
  };

  const getStorageValue = async (key: string) => {
    return await AsyncStorage.getItem(key);
  };

  const submitVotes = async () => {
    if (selectedVotes.length === 1) {
      await sendVote(Number(selectedVotes[0]));
    } else {
      await sendMultipleVotes(selectedVotes);
    }
  };

  const sendVote = async (claveCandidate: number) => {
    setIsLoading(true); // Mostrar loader
    try {
      const [cveuser, token] = await Promise.all([
        getStorageValue("cveuser"),
        getStorageValue("authToken"),
      ]);

      let userKey: number | null = null;
      if (typeof cveuser === "string") {
        const cleanedKey = cveuser.replace(/,/g, "");
        if (/^\d+$/.test(cleanedKey)) {
          userKey = Number(cleanedKey);
        } else {
          Alert.alert("Error", "Clave de usuario no válida.");
          return;
        }
      }

      if (userKey === null) {
        Alert.alert("Error", "Clave de usuario no válida.");
        return;
      }

      const response = await axios.post(
        "https://votacionrectorsys.ddns.net:9002/votacion/setVoto",
        { value1: userKey, value2: claveCandidate },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        Alert.alert("Voto registrado", "Has votado correctamente.");
        resetVote();
      } else {
        Alert.alert("Error", "Ya has votado.");
      }
    } catch (error) {
      handleError(error, "Hubo un problema al registrar tu voto.");
    } finally {
      setIsLoading(false); // Ocultar loader
    }
  };

  const sendMultipleVotes = async (clavesCandidates: string[]) => {
    setIsLoading(true); // Mostrar loader
    try {
      const [cveuser, token] = await Promise.all([
        getStorageValue("cveuser"),
        getStorageValue("authToken"),
      ]);

      let userKey: number | null = null;
      if (typeof cveuser === "string") {
        const cleanedKey = cveuser.replace(/,/g, "");
        if (/^\d+$/.test(cleanedKey)) {
          userKey = Number(cleanedKey);
        } else {
          Alert.alert("Error", "Clave de usuario no válida.");
          return;
        }
      }

      if (userKey === null) {
        Alert.alert("Error", "Clave de usuario no válida.");
        return;
      }

      let votesString = clavesCandidates.join(" ");
      if (otherCandidate.trim() !== "") {
        votesString += `,${otherCandidate.trim()}`;
      }

      const response = await axios.post(
        "https://votacionrectorsys.ddns.net:9002/votacion/setVotoWithKey",
        {
          id: userKey,
          keys: votesString,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        Alert.alert("Voto registrado", "Has votado correctamente.");
        resetVote();
      } else {
        Alert.alert("Error", "Ya has votado.");
      }
    } catch (error) {
      handleError(error, "Hubo un problema al registrar tu voto.");
    } finally {
      setIsLoading(false); // Ocultar loader
    }
  };

  const handleError = (error: any, defaultMessage: string) => {
    if (error.response) {
      Alert.alert("Atención", "Ya has votado.");
    } else {
      Alert.alert("Error", defaultMessage);
    }
  };

  const resetVote = () => {
    setSelectedVotes([]);
    setOtherCandidate("");
  };

  const toggleVote = (candidate: string) => {
    if (selectedVotes.includes(candidate)) {
      setSelectedVotes((prevVotes) =>
        prevVotes.filter((vote) => vote !== candidate),
      );
    } else {
      setSelectedVotes((prevVotes) => [...prevVotes, candidate]);
    }
  };

  const isSelected = (candidate: string) => selectedVotes.includes(candidate);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {isLoading ? ( // Mostrar loader mientras se realiza una petición
            <ActivityIndicator size="large" color="#3A5335" />
          ) : (
            <>
              {userData && (
                <View style={styles.userInfoContainer}>
                  <View style={styles.userDetails}>
                    <Text style={styles.userInfoText}>
                      Espacio académico: {userData.instList}
                    </Text>
                    <Text style={styles.userInfoText}>
                      Número de cuenta: {userData.numCuenta}
                    </Text>
                    <Text style={styles.userInfoText}>
                      Tipo usuario: {userData.rolList}
                    </Text>
                    <Text style={styles.userInfoText}>
                      Correo institucional: {userData.email}
                    </Text>
                  </View>
                </View>
              )}
              {userData && (
                <Text style={styles.userName}>
                  {userData.name} {userData.lastName}
                </Text>
              )}
              <Text style={styles.candidateTitle}>Selecciona tu candidato</Text>
              <View style={styles.candidateContainer}>
                {["1", "2", "3"].map((candidate) => (
                  <TouchableOpacity
                    key={candidate}
                    style={[
                      styles.candidateCard,
                      isSelected(candidate) && styles.selectedCard,
                    ]}
                    onPress={() => toggleVote(candidate)}
                  >
                    <Image
                      source={
                        candidate === "1"
                          ? require("../assets/AndreaA.jpeg")
                          : candidate === "2"
                            ? require("../assets/CristinaP.png")
                            : require("../assets/JorgeG.jpeg")
                      }
                      style={styles.candidateAvatar}
                    />
                    <Text style={styles.candidateName}>
                      {candidate === "1"
                        ? "Andrea Aparicio"
                        : candidate === "2"
                          ? "Cristina Pacheco"
                          : "Jorge Gamez"}
                    </Text>
                    {isSelected(candidate) && (
                      <Text style={styles.overlayText}>X</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.otherCandidateContainer}>
                <TextInput
                  mode="outlined"
                  placeholder="Ingresa el candidato (Opcional)"
                  value={otherCandidate}
                  onChangeText={setOtherCandidate}
                  style={styles.input}
                />
                <TouchableOpacity
                  style={[
                    styles.logoutButton,
                    isVoteButtonDisabled && { backgroundColor: "#CCC" },
                  ]}
                  onPress={submitVotes}
                  disabled={isVoteButtonDisabled}
                >
                  <Text style={styles.logoutButtonText}>Votar</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
              </TouchableOpacity>
              <Text style={styles.footerText}>UAEM</Text>
              <Text style={styles.footerSubText}>
                El voto es libre y secreto
              </Text>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SeleccionarCandidato;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AE9E5B",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  userInfoContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  userDetails: {
    marginLeft: 20,
    justifyContent: "center",
  },
  userInfoText: {
    fontSize: 14,
    color: "#3A5335",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    color: "#3A5335",
    marginVertical: 10,
  },
  candidateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3A5335",
    marginVertical: 20,
  },
  candidateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  candidateCard: {
    backgroundColor: "#3A5335",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    width: 100,
    position: "relative",
  },
  selectedCard: {
    backgroundColor: "#B5651D",
  },
  candidateAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  candidateName: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  overlayText: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 4,
    textAlign: "center",
  },
  otherCandidateContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFF",
    marginTop: 5,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: "#3A5335",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3A5335",
    marginTop: 20,
  },
  footerSubText: {
    fontSize: 14,
    textAlign: "center",
    color: "#3A5335",
    marginBottom: 20,
  },
});
