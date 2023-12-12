import { useNavigation } from "@react-navigation/native";
import { React, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

const Confirm = ({ route }) => {
  const resv = route.params;
  const navigation = useNavigation();

  const handleonPress = () => {
    navigation.navigate("내예약관리", { uid: resv.userId, type: resv.type });
  };

  const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  const getDayOfWeek = (date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  }

  const calculateDdate = (dateStr) => {
    let date = new Date(dateStr);
    date.setDate(date.getDate() - 3);
    return `${formatDate(date)} (${getDayOfWeek(date)})`;
  }


  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.confirmMessageContainer}>
          <Text style={styles.confirmMessage}>예약이 완료되었습니다.</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>예약정보</Text>
          <View style={styles.reservContainer}>
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
                <Text style={styles.infoValue}>{resv.numberOfPeople}명</Text>
              </View>
              <View>
                <Text style={styles.infoLabel}>요청사항</Text>
                <Text style={styles.input}>{resv.userRequest}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoLabel}>예약금</Text>
                <Text style={styles.barTitle}>{resv.deposit}</Text>
              </View>
            </View>
          </View>

          <View style={styles.datePriceInfoContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>예약자 정보</Text>
              <View style={styles.info}>
                <Text style={styles.infoLabel}>이름</Text>
                <Text style={styles.infoValue}>{resv.userName}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoLabel}>전화번호</Text>
                <Text style={styles.infoValue}>{resv.userPhonenum}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.reserveButton}
              onPress={handleonPress}
            >
              <Text style={styles.buttonText}>내 예약목록 확인하기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cancleInfo}>
          <Text style={styles.infoLabel}>취소 기한</Text>
          <Text style={styles.infoValue}>{calculateDdate(resv.reservDate)}</Text>
          {/* tmp */}
        </View>
        <Text style={styles.warning}>
          (취소 기한 이후 취소 시 취소 수수료가 부과됩니다.)
        </Text>
        <View style={styles.incontentBorderLine}></View>
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
  confirmMessageContainer: {
    paddingVertical: 20,
  },
  confirmMessage: {
    fontSize: 20,
    color: "#393E47",
    fontWeight: "300",
  },
  reservContainer: {
    width: "100%",
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    padding: 20,
    flexDirection: "column",
    borderWidth: 0.3,
    borderColor: "#393E47",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1AB277",
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  infoContainer: {
    width: "90%",
  },
  barTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#393E47",
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
    padding: 3,
    color: "#393E47",
    borderWidth: 0.5,
    borderColor: "#393E47",
  },

  incontentBorderLine: {
    width: "1",
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#D7DBDF",
  },
  datePriceInfoContainer: {},
  warning: {
    paddingBottom: 10,
    fontSize: 13,
    color: "#DD3737",
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#393E47",
  },
  userInfoContainer: {
    width: "50%",
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
  cancleInfo: {
    width: "70%",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Confirm;
