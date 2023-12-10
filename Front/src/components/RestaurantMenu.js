import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  Image,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const RestaurantMenuPost = () => {
  const [menuList, setMenuList] = useState([]); // 메뉴 리스트
  const [modalVisible, setModalVisible] = useState(false); // 모달창 보이기/숨기기
  const [photo, setPhoto] = useState(undefined);
  const [newMenu, setNewMenu] = useState({
    image: "",
    description: "",
    price: "", // Added price field
  }); // 새로운 메뉴 정보

  const _handlePhotoChange = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        console.log(result.uri);
        setPhoto(result.uri);
        setNewMenu({
          ...newMenu,
          image: result.uri,
        });
      }
    } catch (error) {
      console.error("Error selecting photo:", error);
    }
  };

  const handleAddMenu = () => {
    if (photo && newMenu.price) {
      const newMenuObject = { ...newMenu, image: photo };

      setMenuList((prevMenuList) => [...prevMenuList, newMenuObject]);
      setNewMenu({ image: "", description: "", price: "" });
      setModalVisible(false);
      setPhoto(undefined);
    } else {
      alert("Please select a photo and enter a price before adding the menu.");
    }
  };

  const handleDeleteMenu = (index) => {
    const updatedMenuList = [...menuList];
    updatedMenuList.splice(index, 1);
    setMenuList(updatedMenuList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuPlusButtonContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 15 }}>내 가게</Text>
          <MaterialIcons name="arrow-forward-ios" size={15} color="black" />
        </View>

        <Pressable
          onPress={() => setModalVisible(true)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#DDDDDD" : "#E0E0E0",
              margin: 10,
              padding: 10,
              width: 100,
              alignItems: "center",
            },
          ]}
        >
          <Text style={styles.menuPlus}>메뉴 추가</Text>
        </Pressable>
      </View>

      <ScrollView>
        {menuList.map((menu, index) => (
          <View key={index} style={styles.menuContainer}>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Image
                source={{ uri: menu.image }}
                style={{ width: 80, height: 80, borderRadius: 10 }}
              />
              <View style={styles.nameAndPrice}>
                <Text
                  style={styles.menuDescription}
                >{`  ${menu.description}`}</Text>
                <Text style={styles.menuPrice}>{`${menu.price}원`}</Text>
              </View>
            </View>

            <Pressable
              onPress={() => handleDeleteMenu(index)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#DDDDDD" : "#E0E0E0",
                  padding: 10,
                  marginLeft: 10,
                },
              ]}
            >
              <Text style={{ color: "red", fontWeight: "bold" }}>삭제</Text>
            </Pressable>
          </View>
        ))}

        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
          style={styles.modalStyle}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>메뉴 등록하기</Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <AntDesign name="close" size={24} color="black" />
                </Pressable>
              </View>

              <Pressable
                onPress={() => _handlePhotoChange()}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#FFFFFF" : "#FFFFFF",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 15,
                  },
                ]}
              >
                {/* <View style={styles.myInfoContentButton}>
                  <Feather name="plus" size={24} color="#B9B9B9" />
                  <Text style={{ color: "#B9B9B9" }}>눌러서 사진 추가하기</Text>
                </View>
                {photo && (
                  <Image
                    source={{ uri: photo }}
                    style={{ width: 100, height: 100 }}
                  />
                )} */}
                {photo ? (
                  <Image
                    source={{ uri: photo }}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                ) : (
                  <View style={styles.myInfoContentButton}>
                    <Feather name="plus" size={24} color="#B9B9B9" />
                    <Text style={{ color: "#B9B9B9" }}>
                      눌러서 사진 추가하기
                    </Text>
                  </View>
                )}
              </Pressable>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Text>메뉴 이름 : </Text>
                <TextInput
                  placeholder="메뉴 설명 입력"
                  style={styles.input}
                  value={newMenu.description}
                  onChangeText={(text) =>
                    setNewMenu({ ...newMenu, description: text })
                  }
                />
              </View>

              {/* Added input for price */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Text>가격 : </Text>
                <TextInput
                  placeholder="가격 입력"
                  style={styles.input}
                  value={newMenu.price}
                  onChangeText={(text) =>
                    setNewMenu({ ...newMenu, price: text })
                  }
                  keyboardType="numeric"
                />
              </View>

              <Pressable
                onPress={handleAddMenu}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#B9B9B9" : "#FFFFFF",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 15,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Feather name="plus-square" size={24} color="black" />
                  <Text>메뉴 추가하기</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 15,
    width: "100%",
    justifyContent: "space-between",
    borderBlockColor: "#E5E5E5",
    borderBottomWidth: 1.5,
    paddingVertical: 10,
  },
  menuImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  menuDescription: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    height: 350,
    width: 300,
  },
  input: {
    height: 30,
    width: 100,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  myInfoContentButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    borderColor: "#E5E5E5",
    borderWidth: 3,
    marginVertical: 10,
    borderRadius: 10,
    borderStyle: "dashed",
    paddingHorizontal: 50,
    paddingVertical: 30,
  },
  // menu
  menuPlus: {
    fontSize: 16,
    fontWeight: "bold",
  },
  menuPlusButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBlockColor: "#E5E5E5",
    borderBottomWidth: 1.5,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  menuPlusButtonContainer2: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 15,
  },
  nameAndPrice: {
    paddingVertical: 10,
  },
});

export default RestaurantMenuPost;
