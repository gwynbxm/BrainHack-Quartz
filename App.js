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
import Doctor from "./components/Doctor/Doctor";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

// vaccine_pp
import Vaccine from "./components/Profile/Vaccine";

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Others") {
            iconName = "address-book";
            focused ? (color = "#051C60") : (color = "#B4D9EE");
          } else if (route.name === "Home") {
            iconName = "home";
            focused ? (color = "#051C60") : (color = "#B4D9EE");
          } else if (route.name === "Profile") {
            iconName = "user";
            focused ? (color = "#051C60") : (color = "#B4D9EE");
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#051C60",
        inactiveTintColor: "#B4D9EE",
      }}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Profile" component={Profile} />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen
            name="Home"
            component={BottomTabs}
            options={{ headerShown: false }}
          />

          {/* <Stack.Screen mame="Profile" component={Profile} /> */}
          <Stack.Screen name="Attraction Places" component={AttractionList} />
          <Stack.Screen name="Details" component={AttractionDetail} />
          <Stack.Screen name="Healthcare Facilities" component={Doctor} />
          {/* <Stack.Screen name="Guest" component={Guest} /> */}
          {/* <Stack.Screen name="Register" component={Register} /> */}
          {/* <Stack.Screen name="Login" component={Login} /> */}

          {/* vaccine_pp */}
          {/* <Stack.Screen name="Vaccine" component={Vaccine} /> */}
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
