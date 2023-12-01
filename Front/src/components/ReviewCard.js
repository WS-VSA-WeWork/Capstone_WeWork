import { React, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import simya from "../../assets/심야식당.jpeg";
import shrimp from "../../assets/shrimp.jpg";
import salmon from "../../assets/salmon.jpg";

const ReviewCard = ({ item, isOwner }) => {
  const [reply, setReply] = useState("");
  const [submittedReply, setSubmittedReply] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReplyChange = (text) => {
    setReply(text);
  };

  const submitReply = () => {
    setSubmittedReply(reply);
    setReply("");
    setShowReplyInput(false);
  };

  return (
    <View style={styles.Card}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={simya} style={styles.img} resizeMode="contain" />
          <View style={styles.textContent}>
            <Text style={styles.name}>{item.customerNickname}</Text>
            <Text style={styles.rating}><AntDesign name="star" size={18} color="#1AB277" />{item.reviewRating}</Text>
          </View>
        </View>
        <Text style={styles.timeStamp}>{item.uploadDate}* 19시간 전</Text>
      </View>

      <View style={styles.imgContent}>
        <Image source={item.reviewImg} style={styles.reviewImg} resizeMode="cover" />
        {/* <Image source={salmon} style={styles.reviewImg} resizeMode="cover" /> */}
      </View>
      <Text style={styles.content}>{item.reviewContent}</Text>

      {isOwner && !submittedReply && (
        <TouchableOpacity onPress={() => setShowReplyInput(true)}>
          <Text style={styles.highlight}>답글 달기</Text>
        </TouchableOpacity>
      )}

      {showReplyInput && (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={handleReplyChange}
            value={reply}
            placeholder="답글을 입력하세요"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={submitReply} style={styles.submitButton}>
              <Text style={styles.buttonText}>답글 등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {submittedReply && (
        <>
          <View style={styles.pageLine}></View>
          <Text style={styles.highlight}>{submittedReply}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Card: {
    borderWidth: 1,
    borderColor: "#6E757B",
    borderRadius: 10,
    padding: 13,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  textContent: {
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
    fontSize: 13,
  },
  imgContent: {
    flexDirection: "row",
  },
  reviewImg: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginRight: 10,
  },
  timeStamp: {
    color: "#6E757B",
    fontWeight: "bold",
  },
  content: {
    color: "#7E8389",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#6E757B",
    borderRadius: 5,
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  submitButton: {
    width: "100%",
    height: 50,
    marginVertical: 5,
    backgroundColor: "#1AB277",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
  pageLine: {
    borderColor: "#pageLine",
    borderTopWidth: 0.5,
    margin: 5,
  },
  highlight: {
    color: "#1AB277",
    fontWeight: "bold",
  },
});

export default ReviewCard;
