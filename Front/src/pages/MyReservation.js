import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import Reservations from "../components/Reservations";
import { fetchReservationDataByUserId } from "../reducers/reservationReducer";
import ReservationCardforUser from "../components/ReservationCardforUser";

const MyReservation = ({ route }) => {
  const [haveReservation, setHaveReservation] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [typing, setTyping] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const uid = route.params.uid;
  const type = route.params.type;
  const reservationData = useSelector((state) => state.reservation.data);
  const status = useSelector((state) => state.reservation.status);
  const error = useSelector((state) => state.reservation.error);
  const [value, onChangeText] = useState("환불 사유를 입력해주세요");
  const [user, setUser] = useState({});

  useEffect(() => {
    dispatch(fetchReservationDataByUserId({ userId: uid }));
    setUser({ uid: uid, type: type });
  }, [uid]);

  useEffect(() => {
    if (reservationData.length > 0) {
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

          {/* 이용전 예약건 */}
          <TouchableOpacity onPress={() => navigation.navigate("환불")}>
            <View style={styles.reservationListContainer}>
              <ReservationCardforUser item={reservationData[0]} notFinished={true}/>
              {/* <View style={styles.reservationList1}>
                <Text style={styles.reservationListTitle}>
                  {reservationData[0].pubName}{" "}
                </Text>
              </View>
              <View style={styles.reservationList2}>
                <Text>{reservationData[0].reservDate}</Text>
                <Text>{reservationData[0].reserveTime}</Text>
              </View>
              <View style={styles.reservationList3}>
                <Text>예약금</Text>
                <Text>{reservationData[0].deposit}원</Text>
              </View> */}
            </View>
          </TouchableOpacity>

          <View style={styles.outcontentBorderLine}></View>

          {/* 전체 대관 내역 */}
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
            <Text style={styles.reservationPastNum}>
              {reservationData.length}
            </Text>
          </View>

          <View style={styles.reservationListContainer}>
            <Reservations data={reservationData} isOwner={false} />
          </View>

          <Pressable
            onPress={() => navigation.navigate("예약메인", { user })}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              marginBottom: 30,
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
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    // marginVertical: 10,
    marginBottom: 10,
    paddingVertical: 10,
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
  outcontentBorderLine: {
    width: "100%",
    borderBottomWidth: 8,
    borderColor: "#E6EBEF",
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
