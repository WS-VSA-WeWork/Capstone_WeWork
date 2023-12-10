import React, { Component, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
  TextInput,
  Animated,
  Pressable,
  Modal,
  Keyboard,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import ReservationCard from "../components/ReservationCard";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPubsData } from "../reducers/pubReducer";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Reservations from "../components/Reservations";
import { fetchReservationDataByUserId } from "../reducers/reservationReducer";
import { colors } from "../config/globalStyles";

const Refund = () => {
  const [value, onChangeText] = useState("환불 사유를 입력해주세요");
  const [typing, setTyping] = useState(false);
  const navigation = useNavigation();
  useEffect(() => console.log(value), [value]);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.modalTitleContainer}>
          <Text style={styles.modalTitle}>식당 정보</Text>
        </View>
        <View style={styles.modalRestaurantTop}>
          <Text style={styles.modalRestaurantName}>백수씨 심야식당</Text>
          <Text style={styles.modalRestaurantTime}>19시간 전</Text>
        </View>
        <View style={styles.modalRestaurantMiddle}>
          <Text style={styles.modalRestaurantDate}>2023-09-20</Text>
          <Text style={styles.modalRestaurantTime}>19:00</Text>
        </View>
        <View style={styles.modalRestaurantBottom}>
          <Text style={styles.modalRestaurantMoney}>예약금</Text>
          <Text style={styles.modalRestaurantMoney}>56000원</Text>
        </View>
        <TextInput
          style={styles.want}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          placeholder="환불사유를 입력해주세요"
          multiline
          numberOfLines={5}
          maxLength={40}
          onPressIn={() => setTyping(true)}
        ></TextInput>
        <TouchableOpacity
          color={"white"}
          onPress={() => navigation.goBack()}
          style={styles.wantButton}
        >
          <Text style={{ color: "#ffffff", fontWeight: "700" }}>
            환불 요청{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.2)",
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopWidth: 1,
  },
  modalTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: "bold",
  },
  modalRestaurantTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  modalRestaurantName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  modalRestaurantTime: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
  modalRestaurantMiddle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  modalRestaurantDate: {
    fontSize: 15,
    fontWeight: "bold",
  },
  modalRestaurantTime: {
    fontSize: 15,
    fontWeight: "bold",
  },
  modalRestaurantBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  modalRestaurantMoney: {
    marginTop: 3,
    fontSize: 17,
    fontWeight: "bold",
  },
  want: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    height: 150,
    margin: 12,
    width: 340,
    borderWidth: 1,
    backgroundColor: "#F1F2F6",
    borderColor: colors.borderGrey,
    borderRadius: 10,
  },
  wantButton: {
    color: "white",
    backgroundColor: "#1AB277",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 20,
    margintop: 20,
    height: 50,
    width: 320,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Refund;
