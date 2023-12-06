import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fetchUserReservationData } from "../reducers/userReservationReducer";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import Reservations from "../components/Reservations";
import { fetchReservData } from "../reducers/reserveReducer";

const MyReservation = () => {
  const [haveReservation, setHaveReservation] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reservationData = useSelector((state) => state.reservation.data);
  console.log("reserveData: ", reservationData);
  const status = useSelector((state) => state.userreservation.status);
  const error = useSelector((state) => state.userreservation.error);

  useEffect(() => {
    const uid = "dGIYidylZq0wfmi6WkKB"; // 임시로 넣어놓은 uid
    dispatch(fetchReservData("백수씨심야식당"));
  }, []);

  useEffect(() => {
    if (reservationData) {
      setHaveReservation(true);
    }
  }, [reservationData]);

  //데이터 로딩 실패 시
  if (status === "failed") {
    return <Text>Error loading data: {error}</Text>;
  }

  const renderItem = ({ item }) => {
    <Reservations data={item} />;
  };

  return (
    <ScrollView style={styles.scrollView}>
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

          <View style={styles.reservationListContainer}>
            <Reservations data={reservationData} isOwner={false} />
          </View>

          {/* <View style={styles.reservationListContainer}>
              <View style={styles.reservationList1}>
                <Text style={styles.reservationListTitle}>
                  {reservationData["2311131200tnfus9"]["pubName"]}{" "} */}
          {/* 예약 DB에서 가져온 술집이름(임시) */}

          {/* </Text>
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
            </View> */}

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
          <TouchableOpacity
            style={styles.reservationListContainer}
            onPress={() => {
              navigation.navigate("리뷰작성", {});
            }}
          >
            <Reservations data={reservationData} />

            {/* <View style={styles.reservationList1}>
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
            </View> */}
          </TouchableOpacity>

          <Button
            title="지금 예약하러가기"
            color={"black"}
            onPress={() => setHaveReservation(false)}
          />
          <Pressable
            onPress={() => navigation.navigate("예약메인")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              gap: 10,
            }}
          >
            <AntDesign name="home" size={24} color="black" />
            <Text>예약 홈으로 돌아가기</Text>
          </Pressable>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
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
