import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveCredentials = async (username, password, cveuser) => {
  try {
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("password", password);
    await AsyncStorage.setItem("cveuser", cveuser);
  } catch (error) {
    console.error("Error saving data: ", error);
  }
};

export const getCredentials = async () => {
  try {
    const username = await AsyncStorage.getItem("username");
    const password = await AsyncStorage.getItem("password");
    const cveuser = await AsyncStorage.getItem("cveuser");

    if (username !== null && password !== null && cveuser !== null) {
      // Datos encontrados, puedes usarlos
      console.log("Username:", username);
      console.log("Password:", password);
      console.log("cveuser:", cveuser);
    } else {
      console.log("No credentials found");
    }
  } catch (error) {
    console.error("Error getting data: ", error);
  }
};

export const removeCredentials = async () => {
  try {
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("password");
    await AsyncStorage.removeItem("cveuser");
  } catch (error) {
    console.error("Error removing data: ", error);
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing data: ", error);
  }
};
