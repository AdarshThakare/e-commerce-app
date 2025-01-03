import React, { useState, useEffect } from "react";
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

const url = "https://primebay-backend.onrender.com/api/v1/order/app/all";

import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const { width } = Dimensions.get("window");

const Spacer = ({ height = 10 }) => <View style={{ height }} />;

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orders, setOrders] = useState([]);
  const [food, setFood] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setOrders(data.orders);
        const groupedOrderItems = data.orders.map((order) => order.orderItems);
        setFood(groupedOrderItems);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // const orders = [
  //   {
  //     id: "1",
  //     name: "Anumeha Patoria",
  //     status: "Delivered",
  //     items: ["Paneer Cheese Franky: 1", "Modi Franky: 1"],
  //     total: 97,
  //   },
  //   {
  //     id: "2",
  //     name: "Fantastic Four",
  //     status: "Delivered",
  //     items: ["Paneer Cheese Franky: 2"],
  //     total: 82,
  //   },
  //   {
  //     id: "3",
  //     name: "Mr SJ",
  //     status: "Delivered",
  //     items: ["Modi Franky: 3"],
  //     total: 153,
  //   },
  //   {
  //     id: "4",
  //     name: "Dishant Yadav",
  //     status: "Delivered",
  //     items: ["Paneer Cheese Franky: 1", "Modi Franky: 1"],
  //     total: 97,
  //   },
  //   {
  //     id: "5",
  //     name: "Prajyot Tayde",
  //     status: "Delivered",
  //     items: ["Modi Franky: 2"],
  //     total: 102,
  //   },
  //   {
  //     id: "6",
  //     name: "Aditya Raj",
  //     status: "Delivered",
  //     items: ["Paneer Cheese Franky: 3"],
  //     total: 123,
  //   },
  // ];

  const handleManage = (orders) => {
    setSelectedOrder(orders);
    console.log(orders);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { width: width * 0.4 }]}>
        {item.user.name}
      </Text>
      <Text style={[styles.cell, { width: width * 0.3, color: "black" }]}>
        {item.status}
      </Text>
      <TouchableOpacity
        style={[styles.cell, { width: width * 0.3 }]}
        onPress={() => handleManage(item)}
      >
        <Text style={styles.manageButton}>Manage</Text>
      </TouchableOpacity>
    </View>
  );

  const html = `<html>
  <body>
  <h2 style="text-align : center">H2-CANTEEN</h2>
  <p style="text-align: center">------------------------------------------------</p>
  <p style="text-align : center">ORDER NAME: ${selectedOrder?.user.name}</p>
  <p style="text-align : center">PHONE NUMBER: ${
    selectedOrder?.shippingInfo.phone
  }</p>
  <p style="text-align : center">LOCATION: ${
    selectedOrder?.shippingInfo.city
  }, ${selectedOrder?.shippingInfo.state} - ${
    selectedOrder?.shippingInfo.pinCode
  }</p>
  <br>
  <p style="text-align : center">---==<< ITEMS ORDERED >>==---</p>
        ${selectedOrder?.orderItems
          .map(
            (item) =>
              `<p style="text-align : center">- ${item.name} x ${item.quantity} = ₹${item.price}</p>`
          )
          .join("")}
  <p style="text-align : center"Sub Total : ₹${selectedOrder?.subTotal}</p>
  <br>
  <p style="text-align : center">SHIPPING CHARGES: ${
    selectedOrder?.shippingCharges
  }</p>
  <p style="text-align : center">TAX AMOUNT: ${selectedOrder?.tax}</p>
  <p style="text-align : center">DISCOUNT: ${selectedOrder?.discount}</p>
  <br>
  <p style="text-align : center ; font-weight : bold">TOTAL : ${
    selectedOrder?.total
  }</p>
  <p style="text-align : center ; font-weight : bold">STATUS: ${
    selectedOrder?.status
  }</p>
  </body>
  </html>`;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html,
      base64: false,
      filename: "order.pdf",
    });
    await shareAsync(file.uri);
  };
  return (
    <View className="w-full h-full bg-white justify-center items-center px-4">
      <Text style={styles.heading}>Orders</Text>
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, { width: width * 0.4 }]}>
              Name
            </Text>
            <Text style={[styles.headerCell, { width: width * 0.3 }]}>
              Status
            </Text>
            <Text style={[styles.headerCell, { width: width * 0.3 }]}>
              Action
            </Text>
          </View>

          {/* Table Rows */}
          <FlatList
            data={orders}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.table}
          />
          <Spacer height={60} />
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
            <Text style={styles.modalTitle}>ORDER INFO</Text>
            {selectedOrder && (
              <View>
                <Text style={styles.modalText}>
                  Name: {selectedOrder.user.name}
                </Text>
                <Text style={styles.modalText}>
                  Phone Number : {selectedOrder.shippingInfo.phone}
                </Text>
                <Text></Text>
                <Text style={styles.modalText}>Items Ordered :</Text>
                {selectedOrder.orderItems.map((item, index) => (
                  <Text key={index} style={styles.modalText}>
                    - {item.name} x {item.quantity} = ₹{item.price}
                  </Text>
                ))}
                <Text style={styles.modalText}>
                  Sub Total : ₹{selectedOrder.subTotal}
                </Text>
                <Text style={styles.modalText}>
                  Shipping Charges : ₹{selectedOrder.shippingCharges}
                </Text>
                <Text style={styles.modalText}>Tax : ₹{selectedOrder.tax}</Text>
                <Text style={styles.modalText}>
                  Discount : ₹{selectedOrder.discount}
                </Text>
                <Text></Text>
                <Text style={styles.totalText}>
                  Total : ₹{selectedOrder.total}
                </Text>
                <Text style={styles.totalText}>
                  Status: {selectedOrder.status}
                </Text>
              </View>
            )}
            <View className="flex flex-row justify-center gap-5">
              <TouchableOpacity
                onPress={generatePdf}
                style={styles.printButton}
              >
                <Text style={styles.closeButtonText}>PRINT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>CLOSE</Text>
              </TouchableOpacity>
            </View>
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
    marginLeft: 12,
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
    width: "92%",
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
    fontWeight: 900,
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#ff0000",
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 4,
  },
  printButton: {
    marginTop: 16,
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 4,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default App;
