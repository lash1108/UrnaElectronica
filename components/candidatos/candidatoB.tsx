import React from "react";
import { SafeAreaView, View, StyleSheet, Text, Image } from "react-native";

const CandidateB = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cristina Pacheco</Text>
      <Image
        source={require("../../assets/CristinaP.png")}
        style={styles.avatar}
      />
      <Text style={styles.description}>
        Cristina Pacheco es conocida por su compromiso con la comunidad
        estudiantil. Su propuesta incluye fortalecer la participación de los
        estudiantes y garantizar recursos adecuados para proyectos académicos.
      </Text>
    </SafeAreaView>
  );
};

export default CandidateB;

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
