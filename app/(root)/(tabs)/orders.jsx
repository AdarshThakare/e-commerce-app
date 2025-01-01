import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";

const { width } = Dimensions.get("window");

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: "1",
      avatar: "https://via.placeholder.com/50",
      name: "Anumeha Patoria",
      status: "Delivered",
      items: ["Paneer Cheese Franky: 1", "Modi Franky: 1"],
      total: 97,
    },
    {
      id: "2",
      avatar: "https://via.placeholder.com/50",
      name: "Fantastic Four",
      status: "Delivered",
      items: ["Paneer Cheese Franky: 2"],
      total: 82,
    },
    {
      id: "3",
      avatar: "https://via.placeholder.com/50",
      name: "Mr SJ",
      status: "Delivered",
      items: ["Modi Franky: 3"],
      total: 153,
    },
    {
      id: "4",
      avatar: "https://via.placeholder.com/50",
      name: "Dishant Yadav",
      status: "Delivered",
      items: ["Paneer Cheese Franky: 1", "Modi Franky: 1"],
      total: 97,
    },
    {
      id: "5",
      avatar: "https://via.placeholder.com/50",
      name: "Prajyot Tayde",
      status: "Delivered",
      items: ["Modi Franky: 2"],
      total: 102,
    },
    {
      id: "6",
      avatar: "https://via.placeholder.com/50",
      name: "Aditya Raj",
      status: "Delivered",
      items: ["Paneer Cheese Franky: 3"],
      total: 123,
    },
  ];

  const handleManage = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={[styles.cell, { width: width * 0.3 }]}>{item.name}</Text>
      <Text style={[styles.cell, { width: width * 0.27, color: "black" }]}>
        {item.status}
      </Text>
      <TouchableOpacity
        style={[styles.cell, { width: width * 0.23 }]}
        onPress={() => handleManage(item)}
      >
        <Text style={styles.manageButton}>Manage</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="w-full h-full bg-white justify-center items-center">
      <Text style={styles.heading}>Orders</Text>
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, { width: 50 }]}>Avatar</Text>
            <Text style={[styles.headerCell, { width: width * 0.3 }]}>
              Name
            </Text>
            <Text style={[styles.headerCell, { width: width * 0.27 }]}>
              Status
            </Text>
            <Text style={[styles.headerCell, { width: width * 0.23 }]}>
              Action
            </Text>
          </View>

          {/* Table Rows */}
          <FlatList
            data={orders}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.table}
          />
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Order Info</Text>
            {selectedOrder && (
              <View>
                <Text style={styles.modalText}>Name: {selectedOrder.name}</Text>
                <Text style={styles.modalText}>
                  Status: {selectedOrder.status}
                </Text>
                <Text style={styles.modalText}>
                  Total: ₹{selectedOrder.total}
                </Text>
                <Text style={styles.modalText}>Items:</Text>
                {selectedOrder.items.map((item, index) => (
                  <Text key={index} style={styles.modalText}>
                    - {item}
                  </Text>
                ))}
              </View>
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  table: {
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  headerCell: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 8,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  cell: {
    fontSize: 16,
    paddingHorizontal: 8,
    textAlign: "center",
  },
  manageButton: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default App;
