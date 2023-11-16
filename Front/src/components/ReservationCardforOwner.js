import React from "react";

import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const ReservationCardforOwner = () => {
  return (
    <TouchableOpacity style={styles.reservationContainer}>
      <View style={styles.info}>
        <Text style={styles.semiTitle}>18:00 ~ 19:30</Text>
        <Text style={styles.warning}>19시간 전</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoLabel}>인원수</Text>
        <Text sytle={styles.infoData}>
          <Text style={styles.warning}>20</Text>명
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoLabel}>예약자명</Text>
        <Text sytle={styles.infoData}>홍길동</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoLabel}>연락처</Text>
        <Text sytle={styles.infoData}>010-1234-2345</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#393E47",
    marginBottom: 15,
  },
  semiTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#393E47",
  },
  reservationContainer: {
    backgroundColor: "#E0F7ED",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#393E47",
  },
  warning: {
    color: "#DD3737",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoLabel: {},
  infoData: {},
});

export default ReservationCardforOwner;
