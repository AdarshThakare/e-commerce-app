import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  ScrollView,
} from "react-native";

import icons from "../../../constants/icons";

const App = () => {
  const [customers, setCustomers] = useState([
    {
      id: "1",
      avatar: "https://via.placeholder.com/50",
      name: "Prajyot Tayde",
      gender: "male",
      email: "taydeprajyot@gmail.com",
      role: "admin",
    },
    {
      id: "2",
      avatar: "https://via.placeholder.com/50",
      name: "Prajyot Tayde",
      gender: "male",
      email: "pmtbmt@gmail.com",
      role: "admin",
    },
    {
      id: "3",
      avatar: "https://via.placeholder.com/50",
      name: "Dishant Yadav",
      gender: "male",
      email: "dishantrao11@gmail.com",
      role: "admin",
    },
    {
      id: "4",
      avatar: "https://via.placeholder.com/50",
      name: "Dishant Yadav",
      gender: "female",
      email: "dishantrao11.ecell@gmail.com",
      role: "user",
    },
    {
      id: "5",
      avatar: "https://via.placeholder.com/50",
      name: "Dishant Yadav",
      gender: "male",
      email: "dishantrao11.work@gmail.com",
      role: "user",
    },
    {
      id: "6",
      avatar: "https://via.placeholder.com/50",
      name: "Dishant Yadav",
      gender: "female",
      email: "dishantrao11.code@gmail.com",
      role: "user",
    },
  ]);

  const deleteCustomer = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setCustomers(customers.filter((customer) => customer.id !== id));
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderRow = ({ item }) => (
    <View style={styles.tableRow}>
      <View style={[styles.cell, styles.avatarCell]}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      </View>
      <Text style={[styles.cell, styles.textCell]}>{item.name}</Text>
      <Text style={[styles.cell, styles.textCell]}>{item.gender}</Text>
      <Text style={[styles.cell, styles.emailCell]}>{item.email}</Text>
      <Text style={[styles.cell, styles.textCell]}>{item.role}</Text>
      <TouchableOpacity
        style={[styles.cell, styles.actionCell]}
        onPress={() => deleteCustomer(item.id)}
      >
        <Image source={icons.deleteIcon} className="size-8" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.avatarCell]}>Avatar</Text>
            <Text style={[styles.headerCell, styles.textCell]}>Name</Text>
            <Text style={[styles.headerCell, styles.textCell]}>Gender</Text>
            <Text style={[styles.headerCell, styles.emailCell]}>Email</Text>
            <Text style={[styles.headerCell, styles.textCell]}>Role</Text>
            <Text style={[styles.headerCell, styles.actionCell]}>Action</Text>
          </View>
          {/* Table Rows */}
          <FlatList
            data={customers}
            renderItem={renderRow}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "white",
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },
  cell: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  avatarCell: {
    width: 70,
  },
  textCell: {
    width: 100,
  },
  emailCell: {
    width: 200,
  },
  actionCell: {
    width: 60,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  deleteText: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default App;
