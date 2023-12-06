import { React, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ReviewImagePick from "../components/ReviewImagePick";

const ReviewForm = ({ route }) => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);


  const handleTextChange = (text) => {
    setText(text);
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submit = (review) => {
    console.log;
  };
  const collectionPath = "pubReviews";
  const documentId = "백수씨심야식당";
  const [reviewNum, setReviewNum] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이용 정보</Text>
      <View style={styles.reservationListContainer}>
        <View style={styles.reservationList1}>
          <Text style={styles.reservationListTitle}>백수씨 심야식당</Text>
          <Text style={styles.reservationListLastTime}>19시간 전</Text>
        </View>
        <View style={styles.reservationList2}>
          <Text style={styles.text}>2023-09-20</Text>
          <Text style={styles.text}>19:00</Text>
        </View>
        <View style={styles.reservationList3}>
          <Text style={styles.text}>예약금</Text>
          <Text style={styles.text}>56000원</Text>
        </View>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={handleTextChange}
        value={text}
        placeholder="리뷰 내용을 작성해주세요"
      />
      <ReviewImagePick collectionPath={collectionPath} documentId={documentId} reviewNum={reviewNum}/>
      {/* <TouchableOpacity style={styles.imgButton} onPress={selectImage}>
        <Feather name="camera" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.comment}>*최대 4개까지 첨부 가능</Text>
      {image && (
        <Image source={{ uri: image }} style={styles.img} />
      )} */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {submit(text); setReviewNum(1);} } style={styles.submitButton}>
          <Text style={styles.buttonText}>리뷰 등록하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#393E47",
  },
  reservationListContainer: {
    backgroundColor: "#E0F7ED",
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 10,
    borderRadius: 10,
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
  text: {
    color: "#393E47",
  },
  input: {
    height: 100,
    borderWidth: 0.5,
    borderColor: "#393E47",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  comment:{
    color: "#7E8389",
  },
  imgButton: {
    width: 80,
    height: 80,
    borderWidth: 0.5,
    borderColor: "#393E47",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  img:{
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
    marginRight: 5,
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
});

export default ReviewForm;
