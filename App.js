import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Others") {
              iconName = "address-book";
              focused ? (color = "teal") : (color = "gray");
            } else if (route.name === "Home") {
              iconName = "home";
              focused ? (color = "teal") : (color = "gray");
            } else if (route.name === "Profile") {
              iconName = "user";
              focused ? (color = "teal") : (color = "gray");
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'teal',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  </NavigationContainer>
  );
}

