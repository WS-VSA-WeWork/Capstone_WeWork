import { React, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import simya from "../../assets/심야식당.jpeg";
import shrimp from "../../assets/shrimp.jpg";

const ReviewCard = () => {
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
            <Text style={styles.name}>김영희</Text>
            <Text style={styles.rating}>5.0</Text>
          </View>
        </View>
        <Text style={styles.timeStamp}>19시간 전</Text>
      </View>

      <Image source={shrimp} style={styles.reviewImg} resizeMode="cover" />
      <Text style={styles.content}>너무 맛있었어요~!</Text>

      {!submittedReply && (
        <TouchableOpacity onPress={() => setShowReplyInput(true)}>
          <Text>답글 달기</Text>
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
          <View style={styles.submitButton}>
          <TouchableOpacity onPress={submitReply}>
            <Text>확인</Text>
          </TouchableOpacity>
          </View>
        </View>
      )}

      {submittedReply && (
        <>
          <View style={styles.pageLine}></View>
          <Text style={styles.replyText}>{submittedReply}</Text>
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
  reviewImg: {
    width: 150,
    height: 150,
    marginTop: 10,
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
  submitButton:{
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  pageLine:{
    borderColor: "#pageLine",
    borderTopWidth: 0.5,
    margin: 5,
  },
  replyText:{
    color: "#393E47",
  },
});

export default ReviewCard;
