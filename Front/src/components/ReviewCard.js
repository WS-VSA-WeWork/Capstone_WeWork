import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import simya from "../../assets/심야식당.jpeg";

const ReviewCard = () => {
  return (
    <View style={styles.Card}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={simya} style={styles.img} resizeMode="contain" />
          <View style={styles.textContent}>
            <Text style={styles.name}>김영희</Text>
            <Text style={styles.rating}>5.0</Text>
          </View>
        </View>
        <Text style={styles.timeStamp}>19시간 전</Text>
      </View>
      <Text style={styles.content}>너무 맛있었어요~!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Card: {
    borderWidth: 1,
    borderColor: "#6E757B",
    borderRadius: 10,
    padding: 13,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfo:{
    flexDirection: "row",
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  textContent:{
    flexDirection: "column",
    justifyContent: "space-around",
  },
  name: {
    color: "#393E47",
    fontWeight: "bold",
    fontSize: 15,
  },
  rating: {
    color: "#6E757B",
    fontSize: 13
  },
  timeStamp: {
    color: "#6E757B",
    fontWeight: "bold",
  },
  content: {
    color: "#7E8389",
    marginTop: 10,
  },
});

export default ReviewCard;
