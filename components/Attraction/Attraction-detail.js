import * as React from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import firebase from "../../config";
/*
  This js file will retrieve the details of attraction place from Attraction-list.js
*/
export default function AttractionDetail({ route }) {
  const { Attraction, Description, Address, Coordinates, PhoneNo, Website } =
    route.params;
  const isSaved = false;

  const addBookmark = async () => {
    firebase
      .database()
      //this is harcoded for testing. to push new bookmark to a user will be "Accounts/" + "user1"
      .ref("Accounts/user1/Bookmarks")
      .once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (accountSnapshot) {
          accountSnapshot.child("Hong Kong").ref.push(Attraction);
        });
      });
    alert("Bookmark added!");

    // firebase
    //   .database()
    //   .ref("Accounts/" + "user1" + "/Bookmarks/Hong Kong")
    //   .set({
    //     Attraction,
    //   });
    // alert("Updated user's bookmark!");
  };

  //This is a reference for removing bookMark.. hopefully it works
  const deleteBookmark = async () => {
    firebase
      .database()
      .ref("Accounts/user1/Bookmarks")
      .once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (accountSnapshot) {
          accountSnapshot.child("Hong Kong").ref.remove();
        });
      });

    alert("Bookmark removed!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Place: {Attraction}</Text>
      <Text style={styles.text}>Description: {Description}</Text>
      <Text style={styles.text}>Address: {Address}</Text>
      <Text style={styles.text}>Coordinates: {Coordinates}</Text>
      <Text style={styles.text}>Phone Number: {PhoneNo}</Text>
      <Text
        style={styles.website}
        onPress={() => {
          Linking.openURL(Website);
        }}
      >
        Click here to know more!
      </Text>

      {/*<Fontisto name="bookmark-alt" size={24} color="black" />*/}
      <Fontisto
        name="bookmark"
        size={24}
        color="black"
        onPress={() => addBookmark()}
      />
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
