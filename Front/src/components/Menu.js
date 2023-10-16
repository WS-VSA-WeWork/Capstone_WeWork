import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import simya from "../../assets/심야식당.jpeg";

const Menu = ({menu}) => {
  return (
    <View style={styles.menu}>
      <View style={styles.menuText}>
        <Text style={styles.menuName}>육전</Text>
        <Text style={styles.menuDesc}>
          얇게 썬 쇠고기를 달걀 반죽에 담그고 튀긴 한국식 하와이 요리입니다.
        </Text>
        <Text style={styles.menuPrice}>15000원</Text>
      </View>
      <Image style={styles.menuImg} source={simya} resizeMode="cover"></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#dddddd",
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  menuText: {
    maxWidth: "70%",
    flexDirection: "column",
  },
  menuName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuDesc: {},
  menuPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  menuImg: {
    width: 80,
    height: 80,
  },
});
export default Menu;
