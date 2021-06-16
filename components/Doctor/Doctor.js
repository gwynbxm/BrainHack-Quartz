import React, { useState } from "react";
import { Card, Title, Paragraph, Headline } from "react-native-paper";
import { Text, View, FlatList, StyleSheet, Linking } from "react-native";

//you can import any name
import dental_info from "../../jsonFiles/dental.json";
import gp_info from "../../jsonFiles/gp.json";
import pri_hos_info from "../../jsonFiles/private_hospital.json";
import pub_hos_info from "../../jsonFiles/public_hospital.json";

export default function Doctor() {
  //Function for Public Hospital
  function renderPublicHospital({ item }) {
    return (
      <>
        <Card>
          <Card.Content>
            <Title style={styles.title}>{item.public_hospital_name}</Title>
            <Paragraph>
              Address: {item.address}
              {"\n"}
              Tel: {item.tel}
              {"\n"}
            </Paragraph>
          </Card.Content>

          <Text
            style={styles.website}
            onPress={() => {
              Linking.openURL(item.website);
            }}
          >
            Click here to know more!
          </Text>
        </Card>
      </>
    );
  }

  //Function for Private Hospital
  function renderPrivateHospital({ item }) {
    return (
      <>
        <Card>
          <Card.Content>
            <Title style={styles.title}>{item.hospital_name}</Title>
            <Paragraph>
              Address: {item.address}
              {"\n"}
              Tel: {item.tel}
              {"\n"}
            </Paragraph>
          </Card.Content>

          <Text
            style={styles.website}
            onPress={() => {
              Linking.openURL(item.website);
            }}
          >
            Click here to know more!
          </Text>
        </Card>
      </>
    );
  }

  //Function for GP
  function renderGP({ item }) {
    return (
      <>
        <Card>
          <Card.Content>
            <Title style={styles.title}>{item.general_prac_name}</Title>
            <Paragraph>
              Opening Hours: {item.openingHours}
              {"\n"}
              Address: {item.address}
              {"\n"}
              Tel: {item.tel}
              {"\n"}
            </Paragraph>
          </Card.Content>

          <Text
            style={styles.website}
            onPress={() => {
              Linking.openURL(item.website);
            }}
          >
            Click here to know more!
          </Text>
        </Card>
      </>
    );
  }

  //Function for Dental
  function renderDental({ item }) {
    return (
      <>
        <Card>
          <Card.Content>
            <Title style={styles.title}>{item.Dental}</Title>
            <Paragraph>
              Opening Hours:{"\n"}
              {item.WeekdayOperatingHours}
              {"\n"}
              {item.WeekendOperatingHours}
              {"\n"}
              Address: {item.Address}
              {"\n"}
              Tel: {item.Telephone}
              {"\n"}
            </Paragraph>
          </Card.Content>

          <Text
            style={styles.website}
            onPress={() => {
              Linking.openURL(item.Website);
            }}
          >
            Click here to know more!
          </Text>
        </Card>
      </>
    );
  }
  return (
    <View style={styles.container}>
      <>
        <Headline style={styles.headline}>Public Hospital</Headline>
        <FlatList
          style={{ width: "100%" }}
          data={pub_hos_info}
          keyExtractor={(item) => item.public_hospital_name}
          persistentScrollbar={true}
          renderItem={renderPublicHospital}
        />
        <Headline style={styles.headline}>Private Hospital</Headline>
        <FlatList
          style={{ width: "100%" }}
          data={pri_hos_info}
          keyExtractor={(item) => item.hospital_name}
          persistentScrollbar={true}
          renderItem={renderPrivateHospital}
        />
        <Headline style={styles.headline}>General Practitioner</Headline>
        <FlatList
          style={{ width: "100%" }}
          data={gp_info}
          keyExtractor={(item) => item.general_prac_name}
          persistentScrollbar={true}
          renderItem={renderGP}
        />
        <Headline style={styles.headline}>Dental</Headline>
        <FlatList
          style={{ width: "100%" }}
          data={dental_info}
          keyExtractor={(item) => item.Dental}
          persistentScrollbar={true}
          renderItem={renderDental}
        />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  website: {
    color: "#03b1fc",
    fontWeight: "bold",
    textAlign: "center",
  },
  headline: {
    fontSize: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
