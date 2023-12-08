import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import ImagePick from "./ImagePick";
//firebase import 파트
import App from "../../firebaseConfig.js";
import { getFirestore, getDoc, doc, updateDoc} from "firebase/firestore";
import  { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

const RestaurantBasic = () => {
  const navigation = useNavigation();

  const [phone, onChangePhone] = useState("");
  const phonehandlePress = () => {
    onChangePhone((currentText) => currentText);
    console.log(phone);
  };
  const [restaurantInfo, onChangeRestaurantInfo] = useState("");
  const restaurantInfohandlePress = () => {
    onChangeRestaurantInfo((currentText) => currentText);
    console.log(restaurantInfo);
  };
  const collectionPath = "pubs"; // 파이어스토어 컬렉션 이름
  const documentId = "Temp"; // 파이어스토어 문서 이름

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


  
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.blockContainer}>
          <View style={styles.blockTitleContainer}>
            <Text style={styles.phoneTitle}>가게 전화 번호</Text>
            <Pressable
              onPress={phonehandlePress}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#E0E0E0" : "#FFFFFF",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 50,
                  height: 30,
                },
              ]}
            >
              <View style={styles.myInfoContentButton}>
                <SimpleLineIcons name="pencil" size={15} color="blue" />
                <Text style={{ color: "blue", fontWeight: "bold" }}>변경</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.phoneContentContainer}>
            <Text style={styles.phoneContent}>대표번호</Text>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                onChangeText={(phone) => onChangePhone(phone)}
                value={phone}
                maxLength={11}
                style={styles.phoneContent}
                placeholder="전화번호를 입력해주세요"
              ></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.blockContainer}>
          <View style={styles.blockTitleContainer}>
            <Text style={styles.phoneTitle}>가게 소개</Text>
            <Pressable
              onPress={(info) => restaurantInfohandlePress}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#E0E0E0" : "#FFFFFF",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 50,
                  height: 30,
                },
              ]}
            >
              <View style={styles.myInfoContentButton}>
                <SimpleLineIcons name="pencil" size={15} color="blue" />
                <Text style={{ color: "blue", fontWeight: "bold" }}>변경</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.phoneContentContainer}>
            <TextInput
              onChangeText={(info) => onChangeRestaurantInfo(info)}
              value={restaurantInfo}
              maxLength={100}
              style={styles.phoneContent}
              multiline={true}
              placeholder="가게 소개를 입력해주세요 ."
            ></TextInput>
          </View>
        </View>
        <View style={styles.blockContainer}>
          <ImagePick documentId={documentId} /> 
        </View>
        
        {/*
        <View style={styles.blockContainer}>
          <View style={styles.blockTitleContainer}>
            <Text style={styles.phoneTitle}>대표 사진 등록하기</Text>
            <Pressable
              onPress={() => _handlePhotoChange()}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#E0E0E0" : "#FFFFFF",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 50,
                  height: 30,
                },
              ]}
            >
              <View style={styles.myInfoContentButton}>
                <SimpleLineIcons name="pencil" size={15} color="blue" />
                <Text style={{ color: "blue", fontWeight: "bold" }}>변경</Text>
              </View>
            </Pressable>
          </View>
          
          가게 등록용 이미지 테스트 
          {photo ? (
            <View style={styles.phoneContentContainer}>
              <SetImage url={photo} onChangePhoto={setPhoto} />
            </View>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Pressable
                style={{
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 100,
                  borderColor: "#E5E5E5",
                  borderWidth: 3,
                  marginVertical: 10,
                  borderRadius: 10,
                  borderStyle: "dashed",
                  paddingHorizontal: 50,
                  paddingVertical: 30,
                }}
                onPress={() => _handlePhotoChange()}
              >
                <Feather name="plus" size={24} color="#B9B9B9" />
              </Pressable>
            </View>
          )} 
        </View> */}
        <View style={styles.buttonContainer}>   
          <TouchableOpacity style={styles.button} onPress={() => [updateImageUrl()]} >
            <Text style={styles.buttonText}>수정</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginTop: 10,
  },
  blockContainer: {
    marginVertical: 10,
  },
  phoneTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  blockTitleContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderTopColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  phoneContentContainer: {
    gap: 10,
    borderTopColor: "#E5E5E5",
    borderTopWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  phoneContent: {
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
  },
  myInfoContentButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  photoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: '#1AB277',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: "85%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RestaurantBasic;
