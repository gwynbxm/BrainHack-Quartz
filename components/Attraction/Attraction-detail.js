import * as React from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
/*
  This js file will retrieve the details of attraction place from Attraction-list.js
*/
export default function AttractionDetail({ route }) {
  const { Attraction, Description, Address, Coordinates, PhoneNo, Website } =
    route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Place: {Attraction}</Text>
      <Text style={styles.text}>Description: {Description}</Text>
      <Text style={styles.text}>Address: {Address}</Text>
      <Text style={styles.text}>Coordinates: {Coordinates}</Text>
      <Text style={styles.text}>Phone Number: {PhoneNo}</Text>
      <Text style={styles.text}>Website: </Text>
      <Text
        style={styles.website}
        onPress={() => {
          Linking.openURL(Website);
        }}
      >
        {Website}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    textAlign: "left",
    fontSize: 16,
  },
  website: {
    color: "#03b1fc",
    fontWeight: "bold",
  },
});
