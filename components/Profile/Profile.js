import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";; 
import firebase from "../../config.js";

export default function Profile() {

  const [isModify, setisModify] = useState(false);
  
  const updateState = () => {
    setisModify(!isModify);
  };

  const [errorText, setErrorText] = useState("");

  // const userUid = firebase.auth().currentUser.uid;
  const userUid = "user1";

  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    profilePic: "",
    username: "",
    vaccine: false
  });

  const getUserData = async () => {
    firebase
      .database()
      .ref("/Accounts")
      .orderByKey()
      .equalTo(userUid)
      .on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          setUserData({
            email: childSnapshot.val().email,
            firstName: childSnapshot.val().firstName,
            profilePic: childSnapshot.val().profilePic,
            username: childSnapshot.val().username,
            vaccine: childSnapshot.val().vaccine,
          });
        });
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleChangeText = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const updateUser = async () => {
    firebase
      .database()
      .ref("Accounts/" + userUid)
      .update({
        firstName: userData.firstName,
        email: userData.email,
        username: userData.username,
      });
    alert("updated user details!");
  };

  const deleteUser = async () => {
    await firebase.database().ref("/Accounts/" + userUid).set(null);
    alert("deleted user");
  };

  const signOut = () =>{
    firebase.auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  } 

  const doNothing = () => {
    return;
  }
  
  return (
    <View style={styles.container}>

      {/* Profile Picture */}
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.dpContainer}>
          <ImageBackground
            style={styles.profileDp}
            imageStyle={{ borderRadius: 100 }}
            source={{
              uri: (userData.profilePic),
            }}
          >
            <View style={styles.cameraContainer}>
              <Icon name="camera" size={35} style={styles.cameraIcon} />
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>

      {/* Vaccination Status */}
      <View style = {{padding: 15, width: "100%", borderRadius: 10, marginTop: 15, alignItems: "center", 
      borderWidth: 2, borderColor: (userData.vaccine? "green" : "red")}}>
      <FontAwesome5 name="syringe" size={24} color={(userData.vaccine? "green" : "red")} />
      <Text style = {{color: (userData.vaccine? "green" : "red")}}>
        {userData.vaccine? "Vaccinated":"Not vaccinated"}
        </Text>
      </View>

      {/* First Name */}
      <View style={styles.action}>
        <FontAwesome name="user-o" color="red" size={20} />
        <TextInput
          editable={isModify ? true : false}
          placeholder="First Name"
          style={styles.textInput}
          value={userData.firstName}
          onChangeText={(value) => handleChangeText("firstName", value)}
        ></TextInput>
      </View>

      {/* Username */}
      <View style={styles.action}>
        <FontAwesome name="user-o" color="red" size={20} />
        <TextInput
          editable={isModify ? true : false}
          placeholder="Username"
          style={styles.textInput}
          value={userData.username}
          onChangeText={(value) => handleChangeText("username", value)}
        ></TextInput>
      </View>

      {/* Email */}
      <View style={styles.action}>
        <Icon name="email-outline" size={24} color="red" />
        <TextInput
          editable={isModify ? true : false}
          placeholder="Email Address"
          style={styles.textInput}
          keyboardType="email-address"
          value={userData.email}
          onChangeText={(value) => handleChangeText("email", value)}
        ></TextInput>
      </View>

      {/* Modify/Save Toggle Button */}
      <TouchableOpacity style={styles.modifyBtn} 
      onPress={
        () => { updateState(); (isModify? updateUser(): doNothing())}
      }>
        <Text style={styles.BtnTitle}>
          {isModify ? "SAVE" : "MODIFY"}
        </Text>
      </TouchableOpacity>


      {/* Delete Account Button */}
      <TouchableOpacity
        style={styles.deleteProfileBtn}
        onPress={() => deleteUser()}
      >
        <Text style={styles.BtnTitle}>DELETE ACCOUNT</Text>
      </TouchableOpacity>

      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  dpContainer: {
    height: 150,
    width: "100%",
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileDp: {
    height: 150,
    width: 150,
  },

  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    opacity: 0.7,
    alignItems: "center",
  },

  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "black",
  },

  saveProfileBtn: {
    padding: 15,
    width: "100%",
    backgroundColor: "orange",
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },

  deleteProfileBtn: {
    padding: 15,
    width: "100%",
    backgroundColor: "red",
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  BtnTitle: {
    color: "white",
  },

  modifyBtn: {
    padding: 15,
    width: "100%",
    backgroundColor: "green",
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  input: {
    borderColor: "blue",
    borderWidth: 1,
    height: 40,
    padding: 5,
    backgroundColor: "pink",
    marginTop: 10,
    width: "90%",
  },
});