import { useNavigation } from "@react-navigation/native";
import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { pushReservationData } from "../reducers/reservationReducer";
import { updateTimetable } from "../reducers/timetableReducer";

const Order = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const resv = route.params.reservationDetails;
  const userInfo = route.params.userInfo;
  console.log("userInfoddd", userInfo);
  const [userReq, setUserReq] = useState("");
  const [cutOffDate, setCutOffDate] = useState("2021.12.08(금)"); //tmp
  const [userId, setUserId] = useState(userInfo.uid);

  const onChangeText = (text) => {
    setUserReq(text);
  };

  const navigateToConfirm = () => {
    const reservationInfo = {
      pubName: resv.pubName,
      reservDate: resv.reservDate,
      numberOfPeople: resv.people,
      reserveTime: resv.reserveTime,
      userRequest: userReq,
      cutOffDate: cutOffDate,
      userId: userInfo.uid,
      type: userInfo.type,
      userName: userInfo.name,
      userPhonenum: userInfo.phoneNum,
      deposit: 1000 * resv.people, //tmp
      status: "예약완료", //tmp
    };

    // 예약정보 이용자, 사장님 예약 DB에 저장
    dispatch(
      pushReservationData({
        pubName: resv.pubName,
        userId: userId,
        data: reservationInfo,
        date: resv.reservDate,
      })
    );

    // timetable 예약완료 된 시간에 대한 update
    dispatch(
      updateTimetable({
        pubName: resv.pubName,
        date: resv.reservDate,
        idx: resv.timeIdx,
      })
    );

    navigation.navigate("예약완료", reservationInfo);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>예약정보</Text>
          <View style={styles.reservContainer}>
            <Image
              source={{ uri: resv.pubImage }}
              style={styles.image}
              resizeMode="cover"
            ></Image>
            <View style={styles.infoContainer}>
              <View style={styles.info}>
                <Text style={styles.barTitle}>{resv.pubName}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoLabel}>예약 일시</Text>
                <Text style={styles.infoValue}>{resv.reservDate}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoLabel}>예약 시간</Text>
                <Text style={styles.infoValue}>{resv.reserveTime}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoLabel}>인원수</Text>
                <Text style={styles.infoValue}>{resv.people}명</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.infoLabel}>요청사항</Text>
            <TextInput
              style={styles.input}
              onChangeText={(e) => onChangeText(e)}
              placeholder="요청사항을 입력해주세요."
            />
          </View>

          <View style={styles.datePriceInfoContainer}>
            <View style={styles.info}>
              <Text style={styles.infoLabel}>취소 기한</Text>
              <Text style={styles.infoValue}>2023.12.08(금)</Text>
              {/*tmp*/}
            </View>
            <Text style={styles.warning}>
              (취소 기한 이후 취소 시 취소 수수료가 부과됩니다.)
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>예약금</Text>
              <Text style={styles.infoValue}>
                {`1,000 x ${resv.people} = `}
                <Text style={styles.barTitle}>
                  {`${1000 * resv.people}원
                `}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.outcontentBorderLine}></View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>예약자 정보</Text>
          <View style={styles.userInfoContainer}>
            <View style={styles.info}>
              <Text style={styles.infoLabel}>이름</Text>
              <Text style={styles.infoValue}>{userInfo.name}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoLabel}>전화번호</Text>
              <Text style={styles.infoValue}>{userInfo.phoneNum}</Text>
            </View>
          </View>
        </View>

        <View style={styles.outcontentBorderLine}></View>
        <View style={styles.titleContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.title}>최종 결제금액</Text>
            <Text style={styles.barTitle}>
              {`${1000 * resv.people}원
                `}
            </Text>
          </View>
          <Text style={styles.details}>
            본인은 식당 취소 규정 내용을 확인하였으며, 결제 진행에 동의합니다.
          </Text>
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={navigateToConfirm}
          >
            <Text style={styles.buttonText}>동의하고 결제하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    paddingBottom: 70,
  },
  reservContainer: {
    width: "100%",
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#393E47",
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  infoContainer: {
    width: "60%",
  },
  barTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1AB277",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  infoLabel: {
    fontSize: 15,
    color: "#6F797F",
  },
  infoValue: {
    color: "#393E47",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#6F797F",
    color: "#393E47",
  },

  outcontentBorderLine: {
    width: "100%",
    borderBottomWidth: 8,
    borderColor: "#E6EBEF",
  },
  datePriceInfoContainer: {},
  warning: {
    fontSize: 13,
    color: "#DD3737",
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#393E47",
  },
  userInfoContainer: {
    width: "100%",
    paddingTop: 10,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  details: {
    paddingVertical: 10,
    color: "#7E8389",
  },
  reserveButton: {
    width: "100%",
    height: 50,
    marginVertical: 10,
    backgroundColor: "#1AB277",
    borderRadius: 8,
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

export default Order;
