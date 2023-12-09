import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

//firebase import 파트
import App from "../../firebaseConfig.js";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const ImagePick = ({ collectionPath, documentId }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  // 001. 이미지 url 불러와서 화면 표시
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
        aspect: [4, 4],
        quality: 1,
        multiple: true,
      });

      if (!result.canceled) {
        console.log(result.assets[0]);
        setSelectedImages((prevSelectedImages) => [
          ...prevSelectedImages,
          result.assets[0].uri,
        ]);
        console.log(selectedImages);
      }
    } catch (error) {
      console.error("이미지 선택 중 오류 발생", error);
    }
  };

  {
    /* 002. storage 이미지 url 업로드 */
  }
  // firebase storage 파트
  const storage = getStorage(App);
  const [imageUrls, setImageUrls] = useState([]);

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, documentId + "/" + new Date().getTime()); // 여기서 생성한 디렉토리 이름 'Temp'
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
          setImageUrls((prevImageUrls) => [...prevImageUrls, downloadURL]);
        });
      }
    );
  }

  const uploadImageToFirebase = async () => {
    selectedImages.map((uri) => {
      uploadImage(uri, "image/jpeg");
    });
  };
  console.log("imageUrls 잘 저장 되었냐 :" + imageUrls.length);

  {
    /* 003. firestore 이미지 url 저장 */
  }
  const db = getFirestore(App);
  const collectionPathInComponent = collectionPath;
  const documentIdInComponent = documentId; // 위에 생성한 디렉토리 이름 'Temp'

  useEffect(() => {
    const updateImageUrl = async () => {
      try {
        const pubDocRef = doc(
          db,
          collectionPathInComponent,
          documentIdInComponent
        );
        const pubDocSnapshot = await getDoc(pubDocRef);

        if (pubDocSnapshot.exists()) {
          const currentPubImages = pubDocSnapshot.data().pubImages || [];

          // 이미지 URL 배열을 Firestore 필드로 업데이트합니다.
          const updatedImages = Array.from(
            new Set([...currentPubImages, ...imageUrls])
          );

          const updateData = {
            pubImages: updatedImages,
          };

          // pubImages 필드를 업데이트합니다.
          await updateDoc(pubDocRef, updateData);
          console.log("업데이트 완료");
        } else {
          console.error("문서가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error("업데이트 실패", error);
      }
    };

    updateImageUrl();
  }, [db, imageUrls]);
  // [참고용: 마지막에 [db, imageUrls] 때문에 많은 렌더링이 발생했었음]
  // url 업로드 파트 끝

  {
    /* 005. CLOVA greeneye 파트
  const filteringImage = async () => {
    const greeneyeEndpoint = "https://clovagreeneye.apigw.ntruss.com/custom/v1/96/de9025ac060faf49dd43d45f6ad4683a43c33cc35b3f299b0e01f1ffebe98565/predict";
    const greeneyeResponse = await axios.post(greeneyeEndpoint, {
        images: selectedImage[0],
    },
    {
      headers: {
        Authorization: "Bearer VVdSRmxKTUd0SFpTU2RCR0tKSGhxQkFhT0h4Z0pja0E=",
      },
    });

    if (greeneyeResponse.data.is_harmful) {
      console.log(greeneyeResponse.data);
    }
    else{
      console.log("이미지가 유해하지 않습니다.");
    }
  };
*/
  }

  return (
    <View style={styles.container}>
      {/* 선택된 이미지 표시 (있는 경우) */}
      <ScrollView horizontal>
        {selectedImages.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>

      {/* 이미지 피커 열기 버튼 */}
      <TouchableOpacity style={styles.button} onPress={pickImages}>
        <Text style={styles.buttonText}>이미지 선택</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={uploadImageToFirebase}>
        <Text style={styles.buttonText}>이미지 업로드</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default ImagePick;
