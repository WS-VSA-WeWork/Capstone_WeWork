import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

//CLOVA greeneye import 파트
import axios from "axios";

//firebase import 파트
import App from "../../firebaseConfig.js";
// import { getFirestore, getDoc, doc, updateDoc} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import { pushPubImages } from "../reducers/pubReducer.js";

const ImagePick = (documentId) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUri, setImageUri] = useState([]);

  const dispatch = useDispatch();

  {
    /* 001. 이미지 url 불러와서 화면 표시 */
  }
  // 디바이스의 카메라 및 사진 라이브러리에 액세스 권한 요청
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("미디어 라이브러리 액세스 권한이 거부되었습니다!");
      }
    })();
  }, []);

  // 버튼을 누르면 이미지 피커가 열립니다.
  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        multiple: true,
      });

      if (!result.canceled) {
        console.log(result.assets[0].uri);
        setSelectedImages((prevSelectedImages) => [
          ...prevSelectedImages,
          result.assets[0].uri,
        ]);
        console.log("선택된 이미지 갯수:" + selectedImages.length);
      }
    } catch (error) {
      console.error("이미지 선택 중 오류 발생", error);
    }
  };
  // 이미지 수정하기
  const changeImage = async (key) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        multiple: true,
      });

      if (!result.canceled) {
        console.log(result.assets[0].uri);
        setSelectedImages((prevSelectedImages) => {
          const newSelectedImages = [...prevSelectedImages];
          newSelectedImages[key] = result.assets[0].uri;
          return newSelectedImages;
        });
      }
    } catch (error) {
      console.error("이미지 선택 중 오류 발생", error);
    }
    console.log("선택된 이미지 갯수:" + selectedImages.length);
  };

  // 이미지 삭제

  const deleteImage = (key) => {
    setSelectedImages((prevSelectedImages) => {
      // 선택된 이미지 배열에서 특정 인덱스의 원소를 제외한 새로운 배열 생성
      const newSelectedImages = prevSelectedImages.filter((_, i) => i !== key);

      return newSelectedImages;
    });
  };

  {
    /* 002. storage 이미지 url 업로드 */
  }
  // firebase storage 파트
  const storage = getStorage(App);

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(
      storage,
      documentId.documentId + "/" + new Date().getTime()
    ); // 여기서 생성한 디렉토리 이름 'Temp'
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ....
        const progress =
          Math.random(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("업로드 진행중 :", progress);
      },
      (error) => {
        // Error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          console.log("ducumentID1: ", documentId);
          setImageUri((prevImageUris) => [...prevImageUris, downloadURL]);
        });
      }
    );
  }

  const uploadImageToFirebase = async () => {
    await Promise.all(
      selectedImages.map((uri) => {
        uploadImage(uri, "image/jpeg");
      })
    ).then(() => {
      console.log("ducumentID2: ", documentId);
      console.log(imageUri);
      dispatch(pushPubImages({ pubName: documentId.documentId, imageUris: imageUri }));
    });
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.blockTitleContainer}>
          <Text style={styles.phoneTitle}>대표 사진 등록하기</Text>
          <Pressable
            onPress={() => [pickImages()]}
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
              <Text style={{ color: "blue", fontWeight: "bold" }}>추가</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.container}>
          {/* 선택된 이미지 표시 (있는 경우) */}
          {selectedImages ? (
            <View style={styles.phoneContentContainer}>
              <ScrollView horizontal>
                {selectedImages.map((uri, index) => (
                  <View key={index}>
                    <TouchableOpacity
                      style={styles.imageSection}
                      key={index}
                      onPressIn={() => changeImage(index)}
                    >
                      <Image
                        key={index}
                        source={{ uri }}
                        style={styles.image}
                      />
                    </TouchableOpacity>
                    <Ionicons
                      name="close-circle-sharp"
                      style={styles.closeCircle}
                      size={15}
                      onPress={() => deleteImage(index)}
                    />
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.syncIcon}
                onPressIn={uploadImageToFirebase}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 9,
                  }}
                >
                  <Feather name="upload-cloud" size={24} color="black" />
                  <Text>대표사진 업로드 하기</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Pressable
                style={{
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100",
                  borderColor: "#E5E5E5",
                  borderWidth: 3,
                  marginVertical: 10,
                  borderRadius: 10,
                  borderStyle: "dashed",
                  paddingHorizontal: 50,
                  paddingVertical: 30,
                }}
                onPress={() => [pickImages(), filteringImage()]}
              >
                <Feather name="plus" size={24} color="#B9B9B9" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  phoneTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 0,
  },
  blockTitleContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderTopColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderTopColor: "#E5E5E5",
    borderTopWidth: 1,
  },
  container: {
    flex: 1,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  phoneContentContainer: {
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  myInfoContentButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  syncIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  closeCircle: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  imageSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default ImagePick;
