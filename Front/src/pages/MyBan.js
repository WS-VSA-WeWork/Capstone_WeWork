import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
const MyBan = () => {
  const [banList, setBanList] = useState([]);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleRestaurant}>식당명</Text>
        <Text style={styles.titleDate}>위약 기간</Text>
      </View>
      {banList.length === 0 ? (
        <View style={styles.noListContainer}>
          <Text style={styles.noList}>위약 내역이 없습니다.</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.restaurantName}>{banList[0].restaurantName}</Text>
          <Text style={styles.banDetail}>{banList[0].banDetail}</Text>
        </View>
      )}
      <View style={styles.lastContainer}>
        <AntDesign name="exclamationcircle" size={18} color="black" />
        <Text>
          위약 기간에는 예약이 불가하며, 자세한 내용은 고객센터에 문의 바랍니다.
        </Text>
      </View>
      {/* <Button
        title="위약 내역 생성"
        onPress={() =>
          setBanList([
            {
              id: 1,
              restaurantName: "백수씨 심야식당",
              banDetail: "7일",
            },
          ])
        }
      ></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    flexDirection: "row",
    gap: 100,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 13,
  },
  titleRestaurant: {
    fontWeight: "300",
    fontSize: 17,
  },
  titleDate: {
    fontWeight: "300",
    fontSize: 17,
  },
  noListContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  noList: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 15,
    fontWeight: "500",
  },

  content: {
    flexDirection: "row",
    gap: 60,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  restaurantName: {
    fontSize: 15,
  },
  banDetail: {
    fontSize: 15,
    color: "red",
    fontWeight: "bold",
  },
  lastContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    paddingRight: 20,
  },
});

export default MyBan;
