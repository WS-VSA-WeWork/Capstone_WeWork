import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import Reservations from "../components/Reservations";
import { fetchReservationDataByPubName } from "../reducers/reservationReducer";

const CEOMyReservation = () => {
  const [haveReservation, setHaveReservation] = useState(true);
  const dispatch = useDispatch();

  const reservationData = useSelector((state) => state.reservation.data);

  useEffect(() => {
    // 컴포넌트가 마운트 될 때 예약 데이터를 불러옴
    dispatch(fetchReservationDataByPubName({ pubName: "백수씨심야식당" })); // bar.name은 현재 선택된 펍의 이름
  }, [dispatch, "백수씨심야식당"]);

  return (
    <View>
      {haveReservation ? (
        <View style={styles.myreservationContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              paddingHorizontal: 30,
              marginBottom: 5,
            }}
          >
            예약된 대관 일정
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              paddingHorizontal: 30,
            }}
          >
            오늘은 총 {reservationData.length}개의 예약이 있어요.
          </Text>

          <ScrollView style={styles.ScrollViewContainer}>
            <View style={styles.seperateDate}>
              <Text style={styles.seperateDateContent}>2023-12-5</Text>
            </View>
            <View style={styles.reservationListContainer}>
              <Reservations data={reservationData} />
            </View>

            <View style={styles.seperateDate}>
              <Text style={styles.seperateDateContent}>2023-12-6</Text>
            </View>
            <View style={styles.reservationListContainer}>
              <Reservations data={reservationData} />
            </View>
            {/* <View style={styles.reservationListContainer}>
              <View style={styles.reservationList1}>
                <Text style={styles.reservationListTitle}>
                  안도영(#2324) / 23명
                </Text>
                <Text style={styles.reservationListLastTime}>19시간 전</Text>
              </View>
              <View style={styles.reservationList2}>
                <Text>2023-12-6</Text>
                <Text>19:00 - 21:00</Text>
              </View>
              <View style={styles.reservationList3}>
                <Text>예약금</Text>
                <Text>56000원</Text>
              </View>
            </View>

            <View style={styles.reservationListContainer}>
              <View style={styles.reservationList1}>
                <Text style={styles.reservationListTitle}>
                  김동완(#2324) / 23명
                </Text>
                <Text style={styles.reservationListLastTime}>19시간 전</Text>
              </View>
              <View style={styles.reservationList2}>
                <Text>2023-12-6</Text>
                <Text>22:30 - 23:30</Text>
              </View>
              <View style={styles.reservationList3}>
                <Text>예약금</Text>
                <Text>56000원</Text>
              </View>
            </View> */}
          </ScrollView>

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
                대관일정이 발생하면 알려드릴게요 !
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
  ScrollViewContainer: {
    height: "85%",
    marginVertical: 20,
    backgroundColor: "#ffffff",
  },
  myreservationContainer: {
    paddingVertical: 30,
    backgroundColor: "#ffffff",
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
    // backgroundColor: "#E0F7ED",
    marginHorizontal: 30,
    marginVertical: 10,
    // paddingVertical: 20,
    // paddingHorizontal: 20,
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
  seperateDate: {
    // backgroundColor: "grey",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "grey",
    borderTopWidth: 1,
    paddingTop: 20,
    marginTop: 20,
  },
  seperateDateContent: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CEOMyReservation;
