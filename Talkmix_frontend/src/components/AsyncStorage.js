import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log(error)
  }
}

export const getItem = async (key, value) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log(error)
  }
}

export const removeItem = async (key, value) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.log(error)
  }
}
