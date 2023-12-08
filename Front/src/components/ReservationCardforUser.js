import { useNavigation } from "@react-navigation/native";
import React from "react";

import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { colors } from "../config/globalStyles";

const ReservationCardforUser = ({ item }) => {
  const navigation = useNavigation();
  console.log(item);
  const startTime = item.reserveTime
    ? item.reserveTime.split(" - ")[0]
    : "17:00";

  const reservationDate = item.reservDate;

  /** 리뷰 작성 시간과 현재 시간의 차이를 계산하는 함수 */
  const getTimeDifference = (time) => {
    const now = new Date();
    const dateTime = new Date(`${reservationDate}T${startTime}:00`);
    const difference = now - dateTime; // 밀리초 단위 차이

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
    <TouchableOpacity
      style={styles.reservationContainer}
      onPress={() => {
        navigation.navigate("리뷰작성", {});
      }}
    >
      <View style={styles.info}>
        <Text style={styles.semiTitle}>
          {item.pubName} /{" "}
          <Text style={styles.warning}>{item.numberOfPeople}</Text>명
        </Text>
        <Text style={styles.warning}>{getTimeDifference(startTime)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoLabel}>예약일: {item.reservDate}</Text>
        <Text style={styles.semiTitle}>{item.reserveTime}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoLabel}>연락처</Text>
        <Text style={styles.infoData}>{item.userPhonenum}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoLabel}>예약금</Text>
        <Text style={styles.infoData}>{item.deposit}</Text>
      </View>
    </TouchableOpacity>
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
});

export default ReservationCardforUser;
