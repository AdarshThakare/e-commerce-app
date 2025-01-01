import {
  Text,
  View,
  StyleSheet,
  Switch,
  SafeAreaView,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState } from "react";

const CategoryItem = ({ value, heading }) => {
  return (
    <View style={styles.row}>
      {/* Heading */}
      <Text style={styles.heading}>{heading}</Text>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              backgroundColor: "#009989",
              width: `${value}%`, // Adjust width based on the value
            },
          ]}
        />
      </View>

      {/* Value Percentage */}
      <Text style={styles.value}>{value}%</Text>
    </View>
  );
};

const CategoryTable = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text className="pt-2 pb-6 text-3xl font-bold ">INVENTORY</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CategoryItem value={item.value} heading={item.heading} />
        )}
      />
    </View>
  );
};

//this can be turned into record
export default function InventoryList() {
  const data = [
    { heading: "Chat", value: 70 }, // Green
    { heading: "Juice", value: 50 }, // Blue
    { heading: "Shwarma", value: 30 }, // Orange
    { heading: "Chutney", value: 90 }, // Red
    { heading: "Dahi", value: 67 }, // Green
    { heading: "Pav Bhaji", value: 52 }, // Blue
    { heading: "Sandwich", value: 11 }, // Orange
    { heading: "Cold Drinks", value: 78 }, // Red
  ];

  return (
    <View style={styles.appContainer}>
      <CategoryTable data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  heading: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  progressBarContainer: {
    flex: 2,
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  progressBar: {
    height: "100%",
    borderRadius: 5,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  appContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
});
