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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { TextInput } from "react-native-paper";
import axios from "axios";

const SeleccionarCandidato = () => {
  const [otherCandidate, setOtherCandidate] = useState("");
  const [selectedVotes, setSelectedVotes] = useState([]); // Almacena los votos seleccionados
  const router = useRouter();

  const [timerActive, setTimerActive] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isAuthenticated");
    Alert.alert("Sesión Cerrada", "Has cerrado sesión correctamente.");
    router.replace("/");
  };

  useEffect(() => {
    let timer;
    Alert.alert(
      "Atencion",
      "Cuentas con 2 minutos a partir de ahora para votar.",
    );

    // Solo inicia el temporizador si está activo
    timer = setTimeout(() => {
      handleLogout(); // Llama la función después de 2 minutos
      setTimerActive(false); // Resetea el estado del temporizador
    }, 120000); // 120000 ms = 2 minutos

    // Limpia el temporizador si el componente se desmonta o si el temporizador se detiene
    return () => clearTimeout(timer);
  }, []);

  async function getCveUser() {
    return await AsyncStorage.getItem("cveuser");
  }

  const auth = "Basic " + btoa("admonsvr@gmail.com:Sistema*Votacion-R01");
  console.log("Votos seleccionados:", selectedVotes.join(" "));

  async function submitVotes() {
    console.log("Votos seleccionados:", selectedVotes.join(" "));

    if (selectedVotes.length === 1) {
      setVote(selectedVotes[0]);
    } else {
      setVoteWithKey(selectedVotes);
    }
  }

  async function setVote(claveCandidate) {
    const cveuser = await getCveUser();

    try {
      const response = await axios.post(
        "https://votacionrectorsys.ddns.net:9002/votacion/setVoto",
        { value1: cveuser, value2: claveCandidate },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
        },
      );

      if (response.data) {
        Alert.alert("Voto registrado", "Has votado correctamente.");
        setSelectedVotes([]); // Resetea los votos después de enviar
        setOtherCandidate("");
      } else if (response.data.status === 403) {
        Alert.alert("Error", "Ya has votado.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema.");
    }
  }

  async function setVoteWithKey(clavesCandidates) {
    const cveuser = await getCveUser();

    const data = JSON.stringify({
      id: cveuser,
      keys: clavesCandidates,
    });

    const config = {
      method: "post",
      url: "https://votacionrectorsys.ddns.net:9002/votacion/setVotoWithKey",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        Alert.alert("Voto registrado", "Has votado correctamente.");
        setSelectedVotes([]); // Resetea los votos después de enviar
        setOtherCandidate("");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error status:", error.response.status);
          Alert.alert("Atención", "Ya has votado.");
        } else {
          console.log("Error:", error.message);
        }
      });
  }

  const handleVote = (candidate) => {
    if (!selectedVotes.includes(candidate)) {
      setSelectedVotes([...selectedVotes, candidate]);
    }
  };

  const handleOtherCandidate = () => {
    if (otherCandidate) {
      handleVote(otherCandidate);
    }
    submitVotes();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.userInfoContainer}>
            <View style={styles.userDetails}>
              <Text style={styles.userInfoText}>
                Espacio académico: Facultad de Ingeniería
              </Text>
              <Text style={styles.userInfoText}>Número de cuenta: 1614429</Text>
              <Text style={styles.userInfoText}>Tipo usuario: Estudiante</Text>
              <Text style={styles.userInfoText}>
                Correo institucional: etaverac429@alumno.uaemex.mx
              </Text>
            </View>
          </View>
          <Text style={styles.userName}>Edgar Alexis Tavera Carbajal</Text>

          <Text style={styles.candidateTitle}>Selecciona tu candidato</Text>
          <View style={styles.candidateContainer}>
            <TouchableOpacity
              style={styles.candidateCard}
              onPress={() => handleVote(1)}
            >
              <Image
                source={require("../assets/AndreaA.jpeg")}
                style={styles.candidateAvatar}
              />
              <Text style={styles.candidateName}>Andrea Aparicio</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.candidateCard}
              onPress={() => handleVote(2)}
            >
              <Image
                source={require("../assets/CristinaP.png")}
                style={styles.candidateAvatar}
              />
              <Text style={styles.candidateName}>Cristina Pacheco</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.candidateCard}
              onPress={() => handleVote(3)}
            >
              <Image
                source={require("../assets/JorgeG.jpeg")}
                style={styles.candidateAvatar}
              />
              <Text style={styles.candidateName}>Jorge Gamez</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.otherCandidateContainer}>
            <Text style={styles.candidateName}>Otro</Text>
            <TextInput
              mode="outlined"
              placeholder="Ingresa el candidato (Opcional)"
              value={otherCandidate}
              onChangeText={setOtherCandidate}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleOtherCandidate}
            >
              <Text style={styles.logoutButtonText}>Votar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>UAEM</Text>
          <Text style={styles.footerSubText}>El voto es libre y secreto</Text>
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
  otherCandidateContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFF",
    marginTop: 5,
    borderRadius: 5,
  },
  voteButton: {
    marginTop: 10,
    backgroundColor: "#3A5335",
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
