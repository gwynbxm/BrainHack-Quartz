import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import logo from "./assets/logo.png";

export default function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate("Home");
  }, 2000);
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 150, height: 120 }} />
      <View style={styles.tagline}>
        <Text style={{ color: "#7a7a7a", fontSize: 18, textAlign: "center" }}>
          Remember to stay safe while travelling
        </Text>
      </View>
      <ActivityIndicator
        style={{ marginTop: 40 }}
        size="large"
        color="#4BCDEB"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8e8",
    justifyContent: "center",
    alignItems: "center",
  },
  tagline: {
    marginTop: 15,
    paddingLeft: 70,
    paddingRight: 70,
  },
});
