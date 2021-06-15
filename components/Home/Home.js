// import * as React from 'react';
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import firebase from "../../config";
import { Ionicons } from '@expo/vector-icons'; 

export default function Home({navigation}) {

  // Requirements
  const [requirements, setReq] = useState({
    req: "",
    link: "",
  });

  const getReq = async () => {
    const id = "SGtoHK";

    firebase
      .database()
      .ref("/Requirements")
      .orderByKey()
      .equalTo(id)
      .on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          setReq({
            req: childSnapshot.val().basic,
            link: childSnapshot.val().link,
          });
        });
      });
  };

  useEffect(() => {
    getReq();
  }, []);

  const reqArray = (requirements.req).split(';');

  return (
    <View style={styles.container}>
      
      {reqArray.map((item) =>
      <View style = {styles.action}>
      <Ionicons name="airplane" size={24} color="black" />
      <Text key={item.i} style={styles.reqTxt}>{item}</Text>
      </View>
      )}

      <TouchableOpacity style={styles.linkBtn} onPress={() => {
              Linking.openURL(requirements.link);
            }}>
        <Text style={styles.linkBtnTxt}>More Information</Text>
      </TouchableOpacity>
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  linkBtn: {
    padding: 15,
    width: "100%",
    backgroundColor: "red",
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  linkBtnTxt: {
    color: "white",
  },

  reqTxt: {
    color: 'blue',
  },

  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
});