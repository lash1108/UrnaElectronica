import React from "react";
import { SafeAreaView, View, StyleSheet, Text, Image } from "react-native";

const CandidateA = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Andrea Aparicio</Text>
      <Image
        source={require("../../assets/AndreaA.jpeg")}
        style={styles.avatar}
      />
      <Text style={styles.description}>
        Andrea Aparicio es una candidata destacada con experiencia en liderazgo
        y gestión de equipos. Su visión incluye mejorar los procesos
        institucionales y promover la innovación educativa.
      </Text>
    </SafeAreaView>
  );
};

export default CandidateA;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AE9E5B",
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3A5335",
    marginVertical: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#3A5335",
  },
});
