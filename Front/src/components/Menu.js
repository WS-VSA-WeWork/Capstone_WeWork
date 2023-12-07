import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import simya from "../../assets/심야식당.jpeg";

const Menu = ({ menu }) => {
  return (
    <View style={styles.menu}>
      <Image
        style={styles.menuImg}
        source={{ uri: menu.menuImg }}
        resizeMode="cover"
      ></Image>
      <View style={styles.menuText}>
        <Text style={styles.menuName}>{menu.menuName}</Text>
        <Text style={styles.menuDesc}>{menu.menuDescription}</Text>
        <Text style={styles.menuPrice}>
          {menu.menuPrice.toLocaleString()}원
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#D7DBDF",
  },
  menuText: {
    width: "70%",
    flexDirection: "column",
  },
  menuName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#393E47",
  },
  menuDesc: {
    color: "#7E8389",
  },
  menuPrice: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10,
  },
  menuImg: {
    width: 80,
    height: 80,
    marginLeft: 10,
    borderRadius: 10,
  },
});
export default Menu;
