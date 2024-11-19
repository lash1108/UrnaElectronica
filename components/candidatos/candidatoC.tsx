import React from "react";
import { SafeAreaView, View, StyleSheet, Text, Image } from "react-native";

const CandidateC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Jorge Gamez</Text>
      <Image
        source={require("../../assets/JorgeG.jpeg")}
        style={styles.avatar}
      />
      <Text style={styles.description}>
        Jorge Gamez tiene una sólida trayectoria en el ámbito académico y
        administrativo. Su plan se centra en modernizar la infraestructura y
        promover programas de intercambio estudiantil.
      </Text>
    </SafeAreaView>
  );
};

export default CandidateC;

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
