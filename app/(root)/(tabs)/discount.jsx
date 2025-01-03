import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const { width } = Dimensions.get("window");

const App = () => {
  const [discounts, setDiscounts] = useState([
    { id: "674c022911305749695483c0", code: "hiitheir", amount: 2 },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const handleManage = (discount) => {
    setCurrentDiscount(discount);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (currentDiscount) {
      setDiscounts((prevDiscounts) =>
        prevDiscounts.map((discount) =>
          discount.id === currentDiscount.id
            ? { ...discount, code: newCode, amount: parseFloat(newAmount) }
            : discount
        )
      );
      setModalVisible(false);
      setCurrentDiscount(null);
    }
  };

  const handleAddDiscount = () => {
    const newDiscount = {
      id: Math.random().toString(36).substr(2, 16), // Generate a random ID
      code: newCode,
      amount: parseFloat(newAmount),
    };
    setDiscounts((prevDiscounts) => [...prevDiscounts, newDiscount]);
    setAddModalVisible(false);
    setNewCode("");
    setNewAmount("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { width: width * 0.4 }]}>{item.id}</Text>
      <Text style={[styles.cell, { width: width * 0.2 }]}>{item.code}</Text>
      <Text style={[styles.cell, { width: width * 0.25 }]}>{item.amount}</Text>
      <TouchableOpacity
        style={[styles.cell, { width: width * 0.25 }]}
        onPress={() => handleManage(item)}
      >
        <Text style={styles.manageButton}>Manage</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Discount</Text>
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, { width: width * 0.4 }]}>Id</Text>
            <Text style={[styles.headerCell, { width: width * 0.2 }]}>
              Code
            </Text>
            <Text style={[styles.headerCell, { width: width * 0.25 }]}>
              Amount
            </Text>
            <Text style={[styles.headerCell, { width: width * 0.25 }]}>
              Action
            </Text>
          </View>

          {/* Table Rows */}
          <FlatList
            data={discounts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.table}
          />
        </View>
      </ScrollView>

      {/* Manage Discount Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Manage Discount</Text>
            {currentDiscount && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Code"
                  value={newCode || currentDiscount.code}
                  onChangeText={setNewCode}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Amount"
                  keyboardType="numeric"
                  value={newAmount || currentDiscount.amount.toString()}
                  onChangeText={setNewAmount}
                />
                <TouchableOpacity
                  onPress={handleSave}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </>
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

      {/* Add Discount Modal */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Discount</Text>
            <TextInput
              style={styles.input}
              placeholder="Code"
              value={newCode}
              onChangeText={(newCode) => setNewCode(newCode)}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={newAmount}
              onChangeText={(newAmount) => setNewAmount(newAmount)}
            />
            <TouchableOpacity
              onPress={handleAddDiscount}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAddModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Discount Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
  },
  closeButtonText: {
    color: "#007BFF",
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 86,
    right: 16,
    backgroundColor: "#007BFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default App;
