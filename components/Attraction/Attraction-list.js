import React from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

//you can import any name
import attraction_info from "../../major_attractions_info_en.json";

export default function AttractionList({ navigation }) {
  function renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Details", { ...item });
          }}
        >
          <Text style={styles.itemTextStyle}>{item.Attraction}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.listStyle}>
        <FlatList
          style={{ width: "100%" }}
          data={attraction_info}
          keyExtractor={(item) => item.Attraction}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  listStyle: {
    margin: 10,
  },

  itemContainer: {
    backgroundColor: "#B4D9EE",
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },

  itemTextStyle: {
    fontSize: 18,
    color: "#353535",
  },
});
