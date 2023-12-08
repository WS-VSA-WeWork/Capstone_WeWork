import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";

//CLOVA greeneye import 파트
import axios from "axios";

//firebase import 파트
import App from "../../firebaseConfig.js";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const ReviewImagePick = ({documentId, reviewNum}) => {

  const [reviewSelectedImages, setReviewSelectedImages] = useState([]);

  { /* 001. 이미지 url 불러와서 화면 표시 */}
  // 디바이스의 카메라 및 사진 라이브러리에 액세스 권한 요청
  useEffect(() => {
      (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
          console.error('미디어 라이브러리 액세스 권한이 거부되었습니다!');
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
				setReviewSelectedImages(prevReviewSelectedImages => [...prevReviewSelectedImages,result.assets[0].uri]);
				console.log(reviewSelectedImages);
		}
		} catch (error) { 
		console.error('이미지 선택 중 오류 발생', error);
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
					setReviewSelectedImages(prevReviewSelectedImages => {
						const newSelectedImages = [...prevReviewSelectedImages];
						newSelectedImages[key] = result.assets[0].uri;
						return newSelectedImages;
					});
				}
				} catch (error) { 
				console.error('이미지 선택 중 오류 발생', error);
				}
				console.log("선택된 이미지 갯수:" + reviewSelectedImages.length);
	};
    
	// 이미지 삭제

	const deleteImage = (key) => {
		setReviewSelectedImages(prevReviewSelectedImages => {
			// 선택된 이미지 배열에서 특정 인덱스의 원소를 제외한 새로운 배열 생성
		const newSelectedImages = prevReviewSelectedImages.filter((_, i) => i !== key);

		return newSelectedImages;
		});
	};



  { /* 002. storage 이미지 url 업로드 */}
  // firebase storage 파트
  const storage = getStorage(App);
  const [imageUrls, setImageUrls] = useState([]);

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, documentId + "/" + "리뷰/" + reviewNum + "/" + new Date().getTime());  // 여기서 생성한 디렉토리 이름 'Temp'
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for state changes, errors, and completion of the upload.
    uploadTask.on("state_changed",
      (snapshot) => {
        // progress function ....
        const progress = Math.random((snapshot.bytesTransferred / snapshot.totalBytes))*100;
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
          setImageUrls(prevImageUrls => [...prevImageUrls, downloadURL]);
        });
      }
    );
  }

  const uploadImageToFirebase = async () => {
    reviewSelectedImages.map((uri)=>{
      uploadImage(uri, "image/jpeg");
    })
  }


  { /* 003. firestore 이미지 url 저장 
  const db = getFirestore(App);
  const collectionPathInComponent = collectionPath;
  const documentIdInComponent = documentId; // 위에 생성한 디렉토리 이름 'Temp'

  useEffect(() => {
    const updateImageUrl = async () => {
      try {
        const pubDocRef = doc(db, collectionPathInComponent, documentIdInComponent);
        const pubDocSnapshot = await getDoc(pubDocRef);

        if (pubDocSnapshot.exists()) {
          const currentPubReviewImages = pubDocSnapshot.data().reviewImg || [];

          // 이미지 URL 배열을 Firestore 필드로 업데이트합니다.
          const updatedImages = Array.from(new Set([...currentPubReviewImages, ...imageUrls]));

          const updateData = {
            reviewImg: updatedImages,
          };

          // pubImages 필드를 업데이트합니다.
          await updateDoc(pubDocRef, updateData);
          console.log("업데이트 완료");
        } else {
          console.error("문서가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error('업데이트 실패', error);
      }
    };

    updateImageUrl();
  }, [db, imageUrls]);
  // [참고용: 마지막에 [db, imageUrls] 때문에 많은 렌더링이 발생했었음]
  // url 업로드 파트 끝  
	*/}

  { /* 005. CLOVA greeneye 파트
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
*/}
	
	return (
			<View>
				<View style={styles.blockTitleContainer}>
					<Text style={styles.phoneTitle}>리뷰 사진 등록하기</Text>
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
						<Ionicons name="camera" size={24} color="black" />
						<Text style={{ color: "black", fontWeight: "bold" }}>추가</Text>
					</View>
					</Pressable>
				</View>
				{reviewSelectedImages ? (<View style={styles.phoneContentContainer}>
					<ScrollView horizontal>
						{reviewSelectedImages.map((uri, index) => (
							<View key={index}>            
								<TouchableOpacity style={styles.imageSection} key={index} onPressIn={() => changeImage(index)}>
									<Image key={index} source={{ uri }} style={styles.image} />
								</TouchableOpacity>
								<Ionicons name="close-circle-sharp"style={styles.closeCircle} size={15} onPress={() => deleteImage(index)}/>
							</View>
						))} 
					</ScrollView>
					<TouchableOpacity style={styles.syncIcon} onPressIn={uploadImageToFirebase}>
						<Ionicons name="sync-circle" size={36} color="grey" />
					</TouchableOpacity>
					</View>) : (
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
							onPress={() => [pickImages()]}
						>
						</Pressable>
					</View>)}
		</View>
	);
};
const styles = StyleSheet.create({
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
			marginBottom: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    phoneContentContainer: {
      gap: 10,
      borderTopColor: "#E5E5E5",
      borderTopWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 10,
			width: "100%",
			height: 300,
    },
    myInfoContentButton: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
    },
    syncIcon: {
      justifyContent: 'center',
      alignItems: 'center',
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
		image: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
      borderRadius: 10,
      marginVertical: 20,
    },
  });

export default ReviewImagePick;
