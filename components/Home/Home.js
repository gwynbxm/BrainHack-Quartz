// import * as React from "react";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../../config";

export default function Home({ navigation }) {
  const [countryChosenTo, setCountryTo] = useState();
  const [placeholderTo, setPlaceHolderTo] = useState("To");
  const [placeholderFrom, setPlaceHolderFrom] = useState("From");
  const [statsTitle, setStatsTitle] = useState("");

  //TextOutput
  const [activeCases, setActive] = useState(""); //active cases
  const [deathCases, setDeath] = useState(""); //total deaths
  const [recoveredCases, setRecovered] = useState(""); //recovered cases

  const [isToggle, setIsToggle] = useState(false); //visibility toggle

  // Requirements
  const [requirements, setReq] = useState({
    req: "",
    link: "",
  });

  const countries = [
    //name of countries
    { id: 0, name: "Australia", query: "Australia" },
    { id: 1, name: "Hong Kong", query: "Hong%20Kong" },
    { id: 2, name: "Taiwan", query: "Taiwan" },
    { id: 3, name: "Singapore", query: "Singapore" },
  ];

  const reqArray = requirements.req.split(";");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries/" + countryChosenTo)
      .then((response) => response.json())
      .then((responseJson) => {
        const active = kFormatter(responseJson.active);
        setActive(active);
        const death = kFormatter(responseJson.deaths);
        setDeath(death);
        const recovered = kFormatter(responseJson.recovered);
        setRecovered(recovered);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [countryChosenTo]);

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

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

  const onPressViewAttraction = () => {
    navigation.navigate("Attraction Places");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.titleStyle}>Where are you visiting?</Text>
          {/* <FontAwesome5 name="plane-departure" size={24} color="black" /> */}

          {/* FROM Seachable DropDown*/}
          <SearchableDropdown
            onTextChange={(country) => console.log(country)}
            //On text change listner on the searchable input
            onItemSelect={(country) => {
              setPlaceHolderFrom(country.name);
            }}
            //onItemSelect called after the selection from the dropdown
            containerStyle={{ padding: 5 }}
            //suggestion container style
            textInputStyle={styles.textInput}
            itemStyle={styles.itemStyle}
            //single dropdown item style
            itemTextStyle={{
              //text style of a single dropdown item
              color: "#222",
            }}
            itemsContainerStyle={{
              //items container style you can pass maxHeight
              //to restrict the items dropdown hieght
              maxHeight: "50%",
            }}
            items={countries}
            //mapping of item array
            defaultIndex={0}
            //default selected item index
            placeholder={placeholderFrom}
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            //To remove the underline from the android input
          />
          {/* <FontAwesome5 name="plane-arrival" size={24} color="black" /> */}

          {/* TO Searchable DropDown*/}
          <SearchableDropdown
            onTextChange={(country) => console.log(country)}
            //On text change listner on the searchable input
            onItemSelect={(country) => {
              setIsToggle(!isToggle);
              setCountryTo(country.query);
              setPlaceHolderTo(country.name);
              setStatsTitle(country.name);
            }}
            //onItemSelect called after the selection from the dropdown
            containerStyle={{ padding: 5 }}
            //suggestion container style
            textInputStyle={styles.textInput}
            itemStyle={styles.itemStyle}
            //single dropdown item style
            itemTextStyle={{
              //text style of a single dropdown item
              color: "#222",
            }}
            itemsContainerStyle={{
              //items container style you can pass maxHeight
              //to restrict the items dropdown hieght
              maxHeight: "50%",
            }}
            items={countries}
            //mapping of item array
            defaultIndex={0}
            //default selected item index
            placeholder={placeholderTo}
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            //To remove the underline from the android input
          />

          {/* COVID19 Statistics Section */}
          <View style={styles.container}>
            <Text style={styles.statsTitle}>
              {countryChosenTo
                ? "Live COVID19 Statistics in " + statsTitle
                : ""}
            </Text>

            <View style={styles.statsContainer}>
              {isToggle ? (
                <View style={styles.statsBox}>
                  <Text
                    style={[
                      styles.statsText,
                      { fontSize: 26, fontWeight: "bold", color: "#008450" },
                    ]}
                  >
                    {countryChosenTo ? activeCases : ""}
                  </Text>
                  <Text style={styles.statsText}>
                    {countryChosenTo ? "active cases" : ""}
                  </Text>
                </View>
              ) : null}
              {isToggle ? (
                <View
                  style={[
                    styles.statsBox,
                    {
                      borderColor: "#62A2F1",
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statsText,
                      { fontSize: 26, fontWeight: "bold", color: "#EFB700" },
                    ]}
                  >
                    {countryChosenTo ? recoveredCases : ""}
                  </Text>
                  <Text style={styles.statsText}>recovered cases</Text>
                </View>
              ) : null}

              {isToggle ? (
                <View style={styles.statsBox}>
                  <Text
                    style={[
                      styles.statsText,
                      { fontSize: 26, fontWeight: "bold", color: "#B81D13" },
                    ]}
                  >
                    {countryChosenTo ? deathCases : ""}
                  </Text>
                  <Text style={styles.statsText}>death cases</Text>
                </View>
              ) : null}
            </View>

            {/* Requirements Section */}
            {isToggle ? (
              <Text style={styles.subTitle}>Requirements</Text>
            ) : null}

            <ScrollView>
              {/* This is where the requirements will be */}
              {reqArray.map((item) => (
                <View style={styles.action}>
                  {isToggle ? (
                    <Ionicons name="airplane" size={22} color="black" />
                  ) : null}
                  {isToggle ? (
                    <Text key={item.i} style={styles.reqTxt}>
                      {item}
                    </Text>
                  ) : null}
                </View>
              ))}
            </ScrollView>

            {isToggle ? (
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  Linking.openURL(requirements.link);
                }}
              >
                <Text style={styles.linkBtnTxt}>
                  {countryChosenTo ? "More Information" : null}
                </Text>
              </TouchableOpacity>
            ) : null}
            {isToggle ? (
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={onPressViewAttraction}
              >
                <Text style={styles.linkBtnTxt}>View Attraction</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    paddingTop: 15,
  },

  titleStyle: {
    padding: 10,
    fontSize: 30,
    textAlign: "center",
    color: "#2F66C1",
  },

  subTitle: {
    padding: 8,
    fontSize: 22,
    textAlign: "center",
    color: "#2F66C1",
  },

  headingText: {
    padding: 8,
  },

  textInput: {
    padding: 12,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#B4D9EE",
    backgroundColor: "#FAF7F6",
  },

  itemStyle: {
    padding: 10,
    backgroundColor: "white",
    borderColor: "white",
    borderBottomColor: "#62A2F1",
    borderWidth: 1,
  },

  statsTitle: {
    fontSize: 20,
    paddingTop: 10,
    fontWeight: "bold",
    color: "#497080",
    alignSelf: "center",
  },

  statsContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignSelf: "center",
  },

  statsBox: {
    alignItems: "center",
    flex: 1,
  },

  statsText: {
    textTransform: "uppercase",
    fontSize: 13,
  },

  buttonStyle: {
    padding: 15,
    width: "100%",
    backgroundColor: "#051C60",
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  reqTxt: {
    color: "#353535",
    fontSize: 18,
    padding: 5,
  },

  linkBtnTxt: {
    textTransform: "uppercase",
    color: "white",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 5,
  },
});
