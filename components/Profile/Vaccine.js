import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import { Table, Row, Rows } from "react-native-table-component";

import firebase from "../../config";

export default function Vaccine({ navigation }) {
    const tableHead = ['Date', 'Vaccine', 'Remarks'];

    // Retrieve data from firebase
    const userUid = firebase.auth().currentUser.uid;

    const [vaccineData, setVaccineData] = useState({
        record: [],
    });

    
    const getVaccineData = async () => {
        const items = [];
        firebase
        .database()
        .ref("/Accounts/" + userUid + "/vPassport")
        .orderByKey()
        .on("value", snapshot => {
        snapshot.forEach((childSnapshot) => {
            items.push([
                childSnapshot.val().date,
                childSnapshot.val().vaccine,
                childSnapshot.val().remarks,
            ]);
            });
        });
            // console.log(items);
            setVaccineData({record:items});
      }
    
    useEffect(() => {
        getVaccineData();
    }, []);

    const tableData = vaccineData.record;

    return(
        <View style={styles.container}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                <Rows data={tableData} textStyle={styles.text}/>
            </Table>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },

    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
});