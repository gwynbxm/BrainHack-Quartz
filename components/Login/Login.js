import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import styles from "./styles";
import firebase from "../../config";

const Stack = createStackNavigator();

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onFooterLinkPress = () => {
    navigation.navigate('Register')
  }

  const onLoginPress = () => {
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      (response) => {
      const uid = response.user.uid
      const userRef = firebase.database().ref("Accounts/" +  firebase.auth().currentUser.uid)
      userRef
      .on('value', snapshot => {
        console.log('User Data: ', snapshot.val());
     });
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
          style={styles.input}
          placeholder='E-mail'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
      />
      <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
      />
      <TouchableOpacity
          style={styles.button}
          onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
      </TouchableOpacity>
      <View style={styles.footerView}>
          <Text style={styles.footerText}>Don't have an account? 
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text>
          </Text>
      </View>
    </View>
  );
}
