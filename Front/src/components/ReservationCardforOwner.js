import React, { useState } from "react";

import { TouchableOpacity, View, Text, StyleSheet, Modal } from "react-native";
import { colors } from "../config/globalStyles";
import ReservDetailModal from "./ReservDetailModal";

const ReservationCardforOwner = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  console.log(item);

  const startTime = item.reserveTime
    ? item.reserveTime.split(" - ")[0]
    : "17:00";

  const reservationDate = item.reservDate;

  /** 리뷰 작성 시간과 현재 시간의 차이를 계산하는 함수 */
  const getTimeDifference = (time) => {
    const now = new Date();
    const dateTime = new Date(`${reservationDate}T${startTime}:00`);
    const difference = Math.abs(now - dateTime); // 밀리초 단위 차이

    const minutes = Math.floor(difference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else if (days < 30) {
      return `${days}일 전`;
    } else {
      return `${months}달 전`;
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.reservationContainer} onPress={() => setModalVisible(true)}>
        <View style={styles.info}>
          <Text style={styles.semiTitle}>
            {item.userName} /{" "}
            <Text style={styles.warning}>{item.numberOfPeople}</Text>명
          </Text>
          <Text style={styles.warning}>{getTimeDifference(startTime)}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoLabel}>예약일: {item.reservDate}</Text>
          <Text style={styles.semiTitle}>{item.reserveTime}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoLabel}>예약금</Text>
          <Text style={styles.infoData}>{item.deposit}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoLabel}>연락처</Text>
          <Text style={styles.infoData}>{item.userPhonenum}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <ReservDetailModal resv={item} />
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 15,
  },
  semiTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
  },
  reservationContainer: {
    backgroundColor: colors.lightGreen,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  info: {
    minHeight: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: colors.black,
  },
  warning: {
    color: colors.red,
    fontSize: 18,
    fontWeight: "bold",
  },
  infoLabel: {
    color: colors.grey,
  },
  infoData: {
    color: colors.grey,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  reserveButton: {
    width: "100%",
    height: 50,
    marginVertical: 10,
    backgroundColor: "#1AB277",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    height: "100%",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#ffffff",
  },
});

export default ReservationCardforOwner;
