import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import axios from "axios";

const Login = () => {
  const [unip, setUnip] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Función para verificar la autenticación
  const handleLogin = async () => {
    if (!unip || !password) {
      Alert.alert("Error", "Por favor, ingresa todos los campos.");
      return;
    }

    /* try {
      const response = await axios.post(
        "https://votacionrectorsys.ddns.net:9002/usuarios/auth",
        {
          identificador: unip,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic ZG1vbnN2ckBnbWFpbC5jb206U2lzdGVtYSpWb3RhY2lvbi1SMDE=",
          },
        },
      );

      console.log(response);

      // Suponiendo que el token de autenticación se devuelve en response.data.token
      if (response.data.token) {
        await AsyncStorage.setItem("authToken", response.data.token);
        Alert.alert("Éxito", "Inicio de sesión correcto.");
        router.replace("/home"); // Redirige a la pantalla principal
      } else {
        Alert.alert("Error", "Credenciales incorrectas.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al iniciar sesión.");
    } */

    //const auth = "Basic " + btoa("admonsvr@gmail.com:Sistema*Votacion-R01");

    try {
      const response = await axios.post(
        "https://votacionrectorsys.ddns.net:9002/auth/login",
        {
          username: "admonsvr@gmail.com",
          password: "Sistema*Votacion-R01"
      }
      );

      if (response.data) {
        console.log(response.data);
        await AsyncStorage.setItem("authToken", response.data.token);
        await AsyncStorage.setItem("email", response.data.email);
        await AsyncStorage.setItem("name", response.data.name);
        await AsyncStorage.setItem("lastName", response.data.lastName);
        await AsyncStorage.setItem("numCuenta", response.data.numCuenta);
        await AsyncStorage.setItem(
          "cveuser",
          response.data.cveuser.toLocaleString(),
        );
        if(response.data.instList.length>0) {
        await AsyncStorage.setItem("instList", response.data.instList[0].toLocaleString());
        }

        router.replace("/home"); // Redirige a la pantalla principal
      } else {
        Alert.alert("Error", "Credenciales incorrectas.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al iniciar sesión.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/UAEMex.png")} style={styles.logo} />
      </View>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      </View>

      <TextInput
        placeholder="UNIP"
        style={styles.input}
        value={unip}
        onChangeText={setUnip}
      />
      <TextInput
        placeholder="CONTRASEÑA"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>UAEM</Text>
      <Text style={styles.slogan}>“El voto es libre y secreto”</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CAC09F",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#496942",
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  avatarContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: "#496942",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#707070",
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#496942",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 20,
    color: "#496942",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  slogan: {
    fontSize: 12,
    color: "#707070",
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default Login;
