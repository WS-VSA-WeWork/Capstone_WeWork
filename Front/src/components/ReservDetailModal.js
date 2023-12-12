import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../config/globalStyles";

const ReservDetailModal = ({ resv }) => {

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
    <View style={styles.titleContainer}>
      <Text style={styles.title}>예약정보</Text>
      <View style={styles.reservContainer}>
        {/* <Image
            source={{ uri: resv.pubImage }}
            style={styles.image}
            resizeMode="cover"
          ></Image> */}
        {/* <View style={styles.image}></View> */}
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.infoLabel}>예약번호</Text>
            <Text style={styles.infoValue}>{resv.reservationId}</Text>
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

          <View style={styles.info}>
            <Text style={styles.infoLabel}>예약자명</Text>
            <Text style={styles.infoValue}>{resv.userName}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoLabel}>연락처</Text>
            <Text style={styles.infoValue}>{resv.userPhonenum}</Text>
          </View>
        </View>
      </View>

      <View style={styles.incontentBorderLine}></View>

      <View>
        <Text style={styles.infoLabel}>요청사항</Text>
        <Text style={styles.input}>
          {resv.userRequest ? resv.userRequest : "요청사항 없음"}
        </Text>
      </View>

      <View style={styles.datePriceInfoContainer}>
        <View style={styles.info}>
          <Text style={styles.infoLabel}>취소 기한</Text>
          <Text style={styles.infoValue}>{calculateDdate(resv.reservDate)}</Text>
        </View>
        <Text style={styles.warning}>
          (취소 기한 이후 취소 시 취소 수수료가 부과됩니다.)
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>예약금</Text>
          <Text style={styles.infoValue}>
            <Text style={styles.barTitle}>{resv.deposit}원</Text>
          </Text>
        </View>
      </View>
    </View>
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
    width: "100%",
  },
  incontentBorderLine: {
    width: "1",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#D7DBDF",
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
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 5,
    color: colors.black,
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
});

export default ReservDetailModal;
