import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Sección de selección de candidatos */}
      <Text style={styles.candidateTitle}>
        Selecciona un candidato para ver su información
      </Text>
      <View style={styles.candidateContainer}>
        {/* Candidato A */}
        <Link asChild href="/candidatoA">
          <TouchableOpacity style={styles.candidateCard}>
            <Image
              source={require("../../assets/AndreaA.jpeg")}
              style={styles.candidateAvatar}
            />
            <Text style={styles.candidateName}>Andrea Aparicio</Text>
          </TouchableOpacity>
        </Link>

        {/* Candidato B */}
        <Link asChild href="/candidatoB">
          <TouchableOpacity style={styles.candidateCard}>
            <Image
              source={require("../../assets/CristinaP.png")}
              style={styles.candidateAvatar}
            />
            <Text style={styles.candidateName}>Cristina Pacheco</Text>
          </TouchableOpacity>
        </Link>

        {/* Candidato C */}
        <Link asChild href="/candidatoC">
          <TouchableOpacity style={styles.candidateCard}>
            <Image
              source={require("../../assets/JorgeG.jpeg")}
              style={styles.candidateAvatar}
            />
            <Text style={styles.candidateName}>Jorge Gamez</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>UAEM</Text>
      <Text style={styles.footerSubText}>El voto es libre y secreto</Text>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AE9E5B",
    paddingHorizontal: 16,
  },
  userInfoContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#3A5335",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: "bold",
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
