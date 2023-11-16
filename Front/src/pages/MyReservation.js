import { View, Text, StyleSheet, Modal, Button, Pressable } from "react-native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const MyReservation = () => {
  const [haveReservation, setHaveReservation] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      {haveReservation ? (
        <View style={styles.myreservationContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              paddingHorizontal: 30,
            }}
          >
            나의 예약일정
          </Text>
          <Pressable onPress={() => setModalVisible(true)}>
            <View style={styles.reservationListContainer}>
              <View style={styles.reservationList1}>
                <Text style={styles.reservationListTitle}>백수씨 심야식당</Text>
                <Text style={styles.reservationListLastTime}>19시간 전</Text>
              </View>
              <View style={styles.reservationList2}>
                <Text>2023-09-20</Text>
                <Text>19:00</Text>
              </View>
              <View style={styles.reservationList3}>
                <Text>예약금</Text>
                <Text>56000원</Text>
              </View>
            </View>
          </Pressable>

          <View style={styles.reservationPast}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 30,
                paddingRight: 10,
                textAlign: "center",
              }}
            >
              나의 대관 내역
            </Text>
            <Text style={styles.reservationPastNum}>5</Text>
          </View>
          <View style={styles.reservationListContainer}>
            <View style={styles.reservationList1}>
              <Text style={styles.reservationListTitle}>백수씨 심야식당</Text>
              <Text style={styles.reservationListLastTime}>19시간 전</Text>
            </View>
            <View style={styles.reservationList2}>
              <Text>2023-09-20</Text>
              <Text>19:00</Text>
            </View>
            <View style={styles.reservationList3}>
              <Text>예약금</Text>
              <Text>56000원</Text>
            </View>
          </View>

          <Button
            title="지금 예약하러가기"
            color={"black"}
            onPress={() => setHaveReservation(false)}
          />
        </View>
      ) : (
        <View style={styles.myreservationContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginHorizontal: 30,
            }}
          >
            나의 예약일정
          </Text>
          <View style={styles.myreservation}>
            <FontAwesome name="calendar-plus-o" size={50} color="white" />
            <View style={styles.myreservationTextContainer}>
              <Text style={styles.myreservationText}>
                예약된 대관일정이 없어요.
              </Text>
              <Text style={styles.myreservationText}>
                예약을 진행해주세요 !
              </Text>
            </View>
            <View style={styles.myreservationButton}>
              <Button
                title="지금 예약하러가기"
                color={"black"}
                onPress={() => setHaveReservation(true)}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  myreservationContainer: {
    marginVertical: 30,
  },
  myreservation: {
    justifyContent: "center",
    alignItems: "center",
    paddubgHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: "#1F7457",
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 50,
    borderRadius: 10,
    gap: 17,
  },
  myreservationTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  myreservationText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  myreservationButton: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  reservationListContainer: {
    backgroundColor: "#E0F7ED",
    marginHorizontal: 30,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 10,
  },
  reservationListTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },

  reservationListLastTime: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
  reservationList1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reservationList2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reservationList3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reservationPast: {
    flexDirection: "row",
    gap: 5,
    marginTop: 40,
    marginTop: 30,
    alignItems: "center",
  },
  reservationPastNum: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#109B1E",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#F1F2F6",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: "black",
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
    backgroundColor: "#F9FAFC",
    borderColor: "#F9FAFC",
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

export default MyReservation;
