import { React, useState, useEffect } from "react";
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

//firebase import 파트
import App from "../../firebaseConfig.js";
import { getFirestore, getDoc, doc, updateDoc, setDoc} from "firebase/firestore";
import  { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

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
  const documentId = "Temp";
  const [reviewNum, setReviewNum] = useState(1);

  // storage 이미지 다운로드 파트
  const storage = getStorage(App);
  const [downloadImageUrls, setDownloadImageUrls] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const getImagesInDirectory = async () => {
      try {
        const imagesRef = ref(storage, documentId);
        const imageList = await listAll(imagesRef);

        // 각각 이미지들을 url을 다운로드
        const urls = await Promise.all(
          imageList.items.map(async (imageRef) => {
            return getDownloadURL(imageRef);
          })
        );

        // useState를 사용하여 이미지 URL 배열을 저장.
        setDownloadImageUrls(urls);
      } catch (error) {
        console.error("에러: 이미지 URLs 다운로드 실패:", error);
      }
    };

    getImagesInDirectory();
    console.log("다운로드 된 이미지 갯수: " + downloadImageUrls.length)
  }, [storage, refresh]);

  { /* 003. firestore 이미지 url 저장 */}
  const db = getFirestore(App);
  
  const updateImageUrl = async () => {
    try {
      const pubDocRef = doc(db, collectionPath, documentId);
      const pubDocSnapshot = await getDoc(pubDocRef);
      setRefresh(refresh + 1);
      if (pubDocSnapshot.exists()) {
        const currentReviewImg = pubDocSnapshot.data().reviewImg || [];

        // 이미지 URL 배열을 Firestore 필드로 업데이트합니다.
        const updatedImages = Array.from(new Set([...currentReviewImg, ...downloadImageUrls]));

        const updateData = {
          reviewImg: updatedImages,
        };

        // pubImages 필드를 업데이트합니다.
        await updateDoc(pubDocRef, updateData);
        console.log("업데이트 완료");
      } else {
        const newPubDocRef = doc(db, collectionPath, documentId);
        await setDoc(newPubDocRef, { reviewImg: downloadImageUrls });
        console.log("새로운 문서 생성 및 업데이트 완료.");
      }
    } catch (error) {
      console.error('업데이트 실패', error);
    }
  };

  // url 업로드 파트 끝 


  return (
    <View style={styles.container}>
      <ScrollView>
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
        <View style={styles.reviewImgContainer}>
          <ReviewImagePick documentId={documentId} reviewNum={reviewNum}/>  
        </View>
        {/* <TouchableOpacity style={styles.imgButton} onPress={selectImage}>
          <Feather name="camera" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.comment}>*최대 4개까지 첨부 가능</Text>
        {image && (
          <Image source={{ uri: image }} style={styles.img} />
        )} */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => [submit(text), setReviewNum(1), updateImageUrl() ]} style={styles.submitButton}>
            <Text style={styles.buttonText}>리뷰 등록하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  reviewImgContainer: {
    marginVertical: 5,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ReviewForm;
