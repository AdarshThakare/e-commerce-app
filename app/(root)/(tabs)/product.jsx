import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";

const url = "https://primebay-backend.onrender.com/api/v1/product/latest";
const Spacer = ({ height = 10 }) => <View style={{ height }} />;

const ProductTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  const [products, setProducts] = useState([]);
  const [photos, setPhotos] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products);
        const photoUrls = products.map((products) => products.photos[0]?.url);
        setPhotos(photoUrls);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, [photos]);
  // const [products, setProducts] = useState([
  //   {
  //     id: "1",
  //     name: "Chicken Shawarma",
  //     description: "Delicious chicken shawarma",
  //     price: 55,
  //     stock: 998,
  //     category: "Shawarma",
  //     photo: "https://example.com/chicken.jpg",
  //   },
  //   {
  //     id: "2",
  //     name: "Paneer Shawarma",
  //     description: "Tasty paneer shawarma",
  //     price: 55,
  //     stock: 998,
  //     category: "Shawarma",
  //     photo: "https://example.com/paneer.jpg",
  //   },
  //   {
  //     id: "3",
  //     name: "Kurkure Chat",
  //     description: "Spicy Kurkure Chat",
  //     price: 35,
  //     stock: 999,
  //     category: "Chat",
  //     photo: "https://example.com/kurkure.jpg",
  //   },
  //   {
  //     id: "4",
  //     name: "Lays Chat",
  //     description: "Crispy Lays Chat",
  //     price: 35,
  //     stock: 999,
  //     category: "Chat",
  //     photo: "https://example.com/lays.jpg",
  //   },
  // ]);
  const [editedProduct, setEditedProduct] = useState({});

  const openModal = (product, index) => {
    setSelectedProductIndex(index);
    setEditedProduct({ ...product });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProductIndex(null);
    setEditedProduct({});
  };

  const saveChanges = () => {
    const updatedProducts = [...products];
    updatedProducts[selectedProductIndex] = editedProduct;
    setProducts(updatedProducts);
    closeModal();
  };

  const handleInputChange = (field, value) => {
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
  };

  const renderProductItem = ({ item, index }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Image
          source={{ uri: photos[index] }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.cell, styles.text]}>{item.name}</Text>
      <TouchableOpacity
        className="ms-3 mr-1 my-8"
        style={[styles.cell, styles.manageButton]}
        onPress={() => openModal(item, index)}
      >
        <Text style={styles.buttonText}>Manage</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.headerCell, styles.headerText]}>Photo</Text>
      <Text style={[styles.headerCell, styles.headerText]}>Name </Text>
      <Text style={[styles.headerCell, styles.headerText]}>Action</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.tableHeader}>PRODUCTS</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderProductItem}
        ListHeaderComponent={renderHeader}
      />

      {selectedProductIndex !== null && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Manage Product</Text>
              {Object.keys(editedProduct).map((key) => {
                if (
                  key === "name" ||
                  key === "description" ||
                  key === "price" ||
                  key === "stock" ||
                  key === "category" ||
                  key === "photos.url"
                ) {
                  return (
                    <View key={key} style={styles.inputRow}>
                      <Text style={styles.inputLabel}>{key}</Text>
                      <TextInput
                        style={styles.input}
                        value={String(editedProduct[key])}
                        onChangeText={(value) => handleInputChange(key, value)}
                      />
                    </View>
                  );
                }
              })}
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Photo URL:</Text>
                <TextInput
                  style={styles.input}
                  value={editedProduct.photo}
                  onChangeText={(value) => handleInputChange("photo", value)}
                />
              </View>
              <Button title="Save" onPress={saveChanges} />
              <View className="py-2"></View>
              <Button title="Close" color="red" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
      <Spacer height={60} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  tableHeader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
  },
  image: {
    width: 80, // Increased width
    height: 80, // Increased height
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
  manageButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: "90%",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputLabel: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "right",
    marginRight: 10,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginVertical: 3,
  },
});

export default ProductTable;
