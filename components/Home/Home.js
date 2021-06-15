// import * as React from "react";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.titleStyle}>Where are you visiting?</Text>
          <SearchableDropdown
            onTextChange={(text) => console.log(text)}
            //On text change listner on the searchable input
            onItemSelect={
              (data) => data.name
              //console.log("item selected" + data.name)
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
            items={data}
            //mapping of item array
            defaultIndex={0}
            //default selected item index
            placeholder="From"
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            //To remove the underline from the android input
          />
          <SearchableDropdown
            onTextChange={(text) => console.log(text)}
            //On text change listner on the searchable input
            onItemSelect={
              (items) => getStats(items.query)
              //console.log("item selected" + data.name)
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
            items={items}
            //mapping of item array
            defaultIndex={0}
            //default selected item index
            placeholder="To"
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            //To remove the underline from the android input
          />

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text
                style={[styles.statsText, { fontSize: 26, fontWeight: "bold" }]}
              >
                {totalCases}
              </Text>
              <Text style={styles.statsText}>total cases</Text>
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
                style={[styles.statsText, { fontSize: 26, fontWeight: "bold" }]}
              >
                {/* {totalDeaths} */}
                1.9
              </Text>
              <Text style={styles.statsText}>total Deaths</Text>
            </View>
            <View style={styles.statsBox}>
              <Text
                style={[styles.statsText, { fontSize: 26, fontWeight: "bold" }]}
              >
                {/* {totalVaccines} */}
                194
              </Text>
              <Text style={styles.statsText}>total vaccines</Text>
            </View>
          </View>

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
