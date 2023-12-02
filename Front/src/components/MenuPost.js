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

const RestaurantMenuPost = () => {
  const [menuList, setMenuList] = useState([]); // 메뉴 리스트
  const [modalVisible, setModalVisible] = useState(false); // 모달창 보이기/숨기기
  const [newMenu, setNewMenu] = useState({
    image: "",
    description: "",
  }); // 새로운 메뉴 정보

  // 모달창에서 확인 버튼을 눌렀을 때 호출되는 함수
  const handleAddMenu = () => {
    setMenuList([...menuList, newMenu]); // 기존 메뉴 리스트에 새로운 메뉴 추가
    setNewMenu({ image: "", description: "" }); // 새로운 메뉴 정보 초기화
    setModalVisible(false); // 모달창 숨기기
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* 메뉴 리스트 표시 */}
        {menuList.map((menu, index) => (
          <View key={index} style={styles.menuContainer}>
            <Image source={{ uri: menu.image }} style={styles.menuImage} />
            <Text style={styles.menuDescription}>{menu.description}</Text>
          </View>
        ))}

        {/* 메뉴 추가 버튼 */}
        <Pressable
          onPress={() => setModalVisible(true)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#DDDDDD" : "#E0E0E0",
              margin: 10,
              padding: 10,
              alignItems: "center",
            },
          ]}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>메뉴 추가</Text>
        </Pressable>

        {/* 메뉴 추가 모달창 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* 이미지 입력란 */}
              <TextInput
                placeholder="이미지 URL 입력"
                style={styles.input}
                value={newMenu.image}
                onChangeText={(text) => setNewMenu({ ...newMenu, image: text })}
              />

              {/* 설명 입력란 */}
              <TextInput
                placeholder="메뉴 설명 입력"
                style={styles.input}
                value={newMenu.description}
                onChangeText={(text) =>
                  setNewMenu({ ...newMenu, description: text })
                }
              />

              {/* 확인 버튼 */}
              <Button title="확인" onPress={handleAddMenu} />
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
    padding: 10,
    backgroundColor: "red",
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  menuImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  menuDescription: {
    fontSize: 16,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default RestaurantMenuPost;
