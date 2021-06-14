import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import AttractionDetail from "./components/Attraction/Attraction-detail";
import AttractionList from "./components/Attraction/Attraction-list";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Attraction Places" component={AttractionList} />
        <Stack.Screen name="Details" component={AttractionDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
