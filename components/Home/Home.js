// import * as React from "react";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";

export default function Home() {

    const [countryChosenTo, setCountryTo] = useState();
    const [placeholderTo, setPlaceHolderTo] = useState("To");
    const [placeholderFrom, setPlaceHolderFrom] = useState("From");
    const [statsTitle, setStatsTitle] = useState("");

    //TextOutput
    const [activeCases, setActive] = useState("");  //active cases
    const [deathCases, setDeath] = useState("");  //total deaths
    const [recoveredCases, setRecovered] = useState("");     //recovered cases
    
    useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/countries/"+countryChosenTo)
      .then((response) => response.json())
      .then((responseJson) => {
        setActive(responseJson.active)
        setDeath(responseJson.deaths)
        setRecovered(responseJson.recovered)
      })
      .catch((error) => {
        console.error(error);
      });
    }, [countryChosenTo]);


    const countries = [
        //name of countries
        { id: 1, name: 'Australia', query: 'Australia' },
        { id: 2, name: 'Hong Kong', query: 'Hong%20Kong' },
        { id: 3, name: 'Taiwan', query: 'Taiwan' },
      ];

    
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.titleStyle}>Where are you visiting?</Text>
      
          {/* FROM Seachable DropDown*/}
          <SearchableDropdown
            onTextChange={(country) => console.log(country)}
            //On text change listner on the searchable input
            onItemSelect={
              (country) => {
                setPlaceHolderFrom(country.name)
              }
            }
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
              maxHeight: "90%",
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

          {/* TO Searchable DropDown*/}
          <SearchableDropdown
            onTextChange={(text) => console.log(text)}
            //On text change listner on the searchable input
            onItemSelect={
              (country) => {
                setCountryTo(country.query)
                setPlaceHolderTo(country.name)
                setStatsTitle(country.name)
              }
            }
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
              maxHeight: "90%",
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
          <Text style={{fontSize:20, fontWeight: 'bold', color: '#497080' }}>
            {statsTitle} COVID19-Statistics
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text
                style={[styles.statsText, { fontSize: 26, fontWeight: "bold", color: "green" }]}
              >
                {activeCases}
              </Text>
              <Text style={styles.statsText}>active cases</Text>
            </View>
            <View
              style={[
                styles.statsBox,
                {
                  borderColor: "skyblue",
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                },
              ]}
            >
              <Text
                style={[styles.statsText, { fontSize: 26, fontWeight: "bold", color: "#e0a800" }]}
              >
                {recoveredCases}
              </Text>
              <Text style={styles.statsText}>total recovered</Text>
            </View>
            <View style={styles.statsBox}>
              <Text
                style={[styles.statsText, { fontSize: 26, fontWeight: "bold", color: "#e00000" }]}
              >
                {deathCases}
              </Text>
              <Text style={styles.statsText}>total deaths</Text>
            </View>
          </View>


           {/* Requirements Section */}
          <Text style={styles.titleStyle}>Requirements</Text>
          <ScrollView>
            {/* This is where the requirements will be */}
          </ScrollView>

          <TouchableOpacity style={styles.attractionBtn} onPress={() => {}}>
            <Text>VIEW ATTRACTIONS</Text>
          </TouchableOpacity>
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
    padding: 8,
    fontSize: 30,
    textAlign: "center",
    color: "skyblue",
    fontWeight: "bold",
  },

  headingText: {
    padding: 8,
  },

  textInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: "skyblue",
    backgroundColor: "#FAF7F6",
  },

  itemStyle: {
    padding: 10,
    backgroundColor: "white",
    borderColor: "white",
    borderBottomColor: "navy",
    borderWidth: 1,
  },

  statsContainer: {
    paddingTop: 20,
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

  attractionBtn: {
    padding: 15,
    width: "100%",
    backgroundColor: "skyblue",
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
});
