import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Linking, ScrollView } from "react-native";
import { Fontisto, AntDesign } from "@expo/vector-icons";
import firebase from "../../config";
/*
  This js file will retrieve the details of attraction place from Attraction-list.js
*/
export default function AttractionDetail({ route }) {
  const {
    Attraction,
    Description,
    Address,
    Coordinates,
    TelephoneNumber,
    Website,
  } = route.params;
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

  const [safetyData, setSafetyData] = useState({
    link: "",
    rules: "",
  });

  const getSafetyData = async () => {
    firebase
      .database()
      //this is harcoded for testing. to push new bookmark to a user will be "Accounts/" + "user1"
      .ref("Attraction")
      .orderByKey()
      .on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          setSafetyData({
            link: childSnapshot.val().link,
            rules: childSnapshot.val().rules,
          });
        });
      });
  };

  useEffect(() => {
    getSafetyData();
  }, []);

  const safetyArray = safetyData.rules.split(";");

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.nameAndBM}>
          <Text style={styles.attractionName}>{Attraction}</Text>
          <View
            style={{
              borderRadius: 50,
              backgroundColor: "blue",
              width: 35,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/*<Fontisto name="bookmark-alt" size={24} color="black" />*/}
            <Fontisto
              name="bookmark"
              size={24}
              color="black"
              onPress={() => addBookmark()}
            />
          </View>
        </View>

        <Text style={[styles.infoStyle, { paddingVertical: 10 }]}>
          {Description}
        </Text>
        <ScrollView>
          <View style={styles.infoContainer}>
            <View style={styles.contactInfoContainer}>
              <Fontisto name="map-marker-alt" size={20} color="black" />
              <Text style={styles.infoStyle}>{Address}</Text>
              {/* <Text style={styles.text}>Coordinates: {Coordinates}</Text> */}
            </View>
            <View style={styles.contactInfoContainer}>
              <Fontisto name="phone" size={20} color="black" />
              <Text style={styles.infoStyle}>{TelephoneNumber}</Text>
            </View>
            <View style={styles.contactInfoContainer}>
              <Fontisto name="world" size={20} color="black" />
              <Text
                style={styles.website}
                onPress={() => {
                  Linking.openURL(Website);
                }}
              >
                Website
              </Text>
            </View>

            <View style={styles.safetyContainer}>
              {/*Newly Added*/}
              {safetyArray.map((item) => (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      marginTop: 10,
                    }}
                  >
                    <AntDesign name="Safety" size={24} color="black" />
                    <Text key={item.i} style={styles.infoStyle}>
                      {item}
                    </Text>
                  </View>
                </>
              ))}
            </View>
            <View style={styles.contactInfoContainer}>
              {/*Newly Added*/}
              <Text
                style={[
                  styles.website,
                  { alignItems: "center", justifyContent: "center" },
                ]}
                onPress={() => {
                  Linking.openURL(safetyData.link);
                }}
              >
                More information on Social Distancing
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "white",
    alignItems: "center",
  },

  topContainer: {
    flex: 1,
    margin: 10,
    paddingHorizontal: 15,
  },
  attractionName: {
    fontSize: 35,
    fontWeight: "bold",
    margin: 10,
    color: "#2F66C1",
  },

  infoContainer: {
    // flex: 1,
    // justifyContent: "space-evenly",
    // paddingHorizontal: 15,
  },

  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  infoStyle: {
    paddingHorizontal: 14,
    lineHeight: 26,
    justifyContent: "flex-start",
    textAlign: "justify",
    fontSize: 16,
  },

  contactInfoContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    margin: 10,
  },

  website: {
    paddingHorizontal: 14,
    color: "#03b1fc",
    fontSize: 16,
  },

  nameAndBM: {
    alignItems: "center",
    flexDirection: "row",
    // paddingHorizontal: 14,
  },

  safetyContainer: {
    flex: 1,
    flexDirection: "column",
  },
});
