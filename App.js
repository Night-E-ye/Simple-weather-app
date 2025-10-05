import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";

export default function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setTemperature(null);

      const response = await fetch(
     "<USE OPEN WEATHER APP API KEY">);
      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message || "Could not fetch weather");
      } else {
        setTemperature(data.main.temp);
      }
    } catch (err) {
      setError("Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>🌤️ Simple Weather App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
        returnKeyType="search"
        onSubmitEditing={getWeather}
        clearButtonMode="while-editing"
      />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={getWeather}
      >
        {loading ? (
          <ActivityIndicator style={{ height: 20 }} />
        ) : (
          <Text style={styles.buttonText}>GET WEATHER</Text>
        )}
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {temperature !== null && (
        <View style={styles.resultBox}>
          <Text style={styles.cityText}>{city.trim()}</Text>
          <Text style={styles.tempText}>{temperature}°C</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // main container: center everything with some breathing room
  container: {
    flex: 1,
    padding: 24,
    paddingTop: Platform.OS === "android" ? 36 : 60,
    backgroundColor: "#f7fbff",
    alignItems: "center",
  },

  // title: bold and centered
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 28,
    color: "#0b3d91",
    letterSpacing: 0.3,
  },

  // input: professional with padding, rounded corners, subtle shadow
  input: {
    width: "90%",
    maxWidth: 520,
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    fontSize: 16,
    marginBottom: 14,
  },

  // button container: big touch target with padding, rounded, drop shadow
  button: {
    width: "90%",
    maxWidth: 520,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#1976d2",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    marginTop: 6,
    marginBottom: 12,
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 4,
  },

  // button text
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.6,
  },

  // error message style
  error: {
    marginTop: 12,
    color: "#c53030",
    fontSize: 14,
    width: "90%",
    textAlign: "left",
    maxWidth: 520,
  },

  // result box for temperature display
  resultBox: {
    marginTop: 22,
    width: "90%",
    maxWidth: 520,
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e6eefc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
  },

  cityText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0b3d91",
    marginBottom: 6,
  },

  tempText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1f2937",
  },
});
