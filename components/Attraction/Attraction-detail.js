import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
/*
  This js file will retrieve the details of attraction place from Attraction-list.js
*/
export default function AttractionDetail({ route }) {
  const { Attraction, Description, Address, Coordinates, PhoneNo, Website } =
    route.params;

  return (
    <View style={styles.container}>
      <Text>Place: {Attraction}</Text>
      <Text>Description: {Description}</Text>
      <Text>Address: {Address}</Text>
      <Text>Coordinates: {Coordinates}</Text>
      <Text>Phone Number: {PhoneNo}</Text>
      <Text>Website: {Website}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
