import * as React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default function Home() {
    const [loading, setLoading] = useState(true);

    const [countryChosen, setCountry] = useState("");

    //TextOutput
    const [activeCases, setActive] = useState("");  //active cases
    const [deathCases, setDeath] = useState("");  //total deaths
    const [recoveredCases, setRecovered] = useState("");     //recovered cases
    
    useEffect(() => {
      setLoading(true)
      fetch("https://disease.sh/v3/covid-19/countries/"+countryChosen)
      .then((response) => response.json())
      .then((responseJson) => {
        setActive(responseJson.todayCases)
        setDeath(responseJson.deaths)
        setRecovered(responseJson.recovered)
      })
      .catch((error) => {
        console.error(error);
      });
      setLoading(false)
    }, [countryChosen]);


    const countries = [
        //name of countries
        { id: 1, name: 'Australia', query: 'Australia' },
        { id: 2, name: 'Hong Kong', query: 'Hong%20Kong' },
        { id: 3, name: 'Taiwan', query: 'Taiwan' },
      ];

    
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
        <Text style={styles.headingText}>
          FROM:
        </Text>
        <SearchableDropdown
          onTextChange={(country) => console.log(text)}
          //On text change listner on the searchable input
          //onItemSelect={(item) => console.log("Object clicked " + item.name)}
          onItemSelect={(country) => setCountry(country.query)}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={countries}
          //mapping of item array
          defaultIndex={0}
          //default selected item index
          placeholder={countryChosen.query}
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
        <Text>
          Active Cases: {activeCases}
        </Text>
        <Text>
          Total Deaths: {deathCases}
        </Text>
        <Text>
          Total recovered: {recoveredCases}
        </Text>
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
    },
    titleText: {
      padding: 8,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    headingText: {
      padding: 8,
    },
  });