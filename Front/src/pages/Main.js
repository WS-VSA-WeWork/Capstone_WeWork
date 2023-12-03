import { Text, View, Button, StyleSheet, StatusBar, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

import simya from "../../assets/심야식당.jpeg";

//firebase import 파트
import App from "../../firebaseConfig.js";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
// url 업로드 파트
import { getFirestore, getDocs, doc, updateDoc, arrayUnion, collection, query, where } from "firebase/firestore";

import React, { useState, useEffect } from "react";

const Main = () => {
  const navigation = useNavigation();

  const storage = getStorage(App);
  const [imageUrls, setImageUrls] = useState([]);
  var pubName = "백수씨심야식당";
  const directoryRef = ref(storage, pubName); // 'your_directory_name'에 실제 디렉토리명을 넣으세요

  useEffect(() => {
    // List all items in the directory
    listAll(directoryRef)
      .then((result) => {
        // result.items is an array of references to images
        const promises = result.items.map((itemRef) => getDownloadURL(itemRef));
        
        // Fetch download URLs for all items in parallel
        Promise.all(promises)
          .then((urls) => {
            setImageUrls(urls);
          })
          .catch((error) => {
            // Handle error if any of the URLs fails to fetch
            console.error("Error fetching download URLs:", error);
          });
      })
      .catch((error) => {
        // Handle error when listing items in the directory
        console.error("Error listing items in directory:", error);
      });
  }, [directoryRef]);

  // //firebase storage 파트
  // const storage = getStorage(App);
  
  // const [imageUrl, setImageUrl] = useState([]);
  // const imageRef = ref(storage, '술무로');

  // useEffect(() => {
  //   getDownloadURL(imageRef)
  //     .then((url) => {
  //       // `url` is the download URL for the image
  //         setImageUrl(url);
  //         for (let i = 0; i < 4; i++) {
  //           setImageUrl((prev) => [...prev, url]);
  //           console.log(imageUrl);
  //         }
  //       // Fetch the image as a blob using the fetch API
  //       fetch(url)
  //         .then((response) => response.blob())
  //         .then((blob) => {
  //           // Use the blob as needed, for example, display it in an Image component
  //           setImageUrl(URL.createObjectURL(blob));
  //         })
  //         .catch((error) => {
  //           // Handle fetch error
  //         });
  //     })
  //     .catch((error) => {
  //       // Handle Firebase Storage error
  //     });
  // }, []);
  // // storage 이미지 다운로드 체크

  // url 업로드 파트
  // const db = getFirestore(App);
  // const collectionPath = "pubs";
  // const documentId = pubName;

  // useEffect(() => {
  //   const updateImageUrl = async () => {  
  //     try {
  //       const pubsCollectionRef = collection(db, collectionPath);
  //       const q = query(pubsCollectionRef, where("pubName", "==", documentId));
  //       const querySnapshot = await getDocs(q);

  //       const updatePromises = [];
        
  //       querySnapshot.forEach((docs) => {
  //         const pubDocRef = doc(db, collectionPath, docs.id);  
  //         const currentPubImages = docs.data().pubImages || [];

  //         const updatedImages = Array.from(new Set([...currentPubImages, ...imageUrls]));

  //         const updateData = {
  //           pubImages: updatedImages,
  //         };
  //         updatePromises.push(updateDoc(pubDocRef, updateData));
  //     });
  //     await Promise.all(updatePromises);
  //     console.log("업데이트 완료");
  //     } catch (error) {
  //       console.log('업데이트 실패', error);
  //     }
  //   };
  //   updateImageUrl();
  // }, [db, imageUrls]);
  // // url 업로드 파트 끝


  //더미데이터
  const bars = {
    simya: {
      date: "2023.11.10(금)",
      people: 20,
      name: "백수씨 심야식당",
      address: "중구 충무로5가 82-10",
      image: simya,
      rating: 4.3,
      tags: ["#이자카야", "#분위기좋음", "#안주맛있음"],
      introduction: `저희 백수씨 심야식당은 사람들이 편하게 먹을 수 있는 안주거리와 산지의 해산물을 위주로 부담되지 않는 가격대의 '실내포장마차' 를 방향성으로 잡고 있습니다. 
강원도 동해, 남해 서해 등의 현지 특산물, 해산물 등을 산지 직송으로 당일 배송받아 서울에서 판매하는 해산물, 퓨전음식 '소주집' 입니다. 
육류 메뉴로는 가장 많이 나가는 '육전'이 있으며 해산물 요리로는 속초에서 직접 공수받아 조리하는 '홍게탕', '백합조개탕' , 서해 남해 등에서 공수받는 돌문어, 청어, 참소라, 골뱅이 등등 메뉴판에는 없는 그날그날 들어온 해산물들을 직원 추천을 통해 손님들에게 제공하며 옛 감성의 음악과 인테리어 안에 좋은 추억을 가져갈 수 있는 소박한 식당입니다.`,
      menu: [
        {
          menuName: "육전",
          menuImage: simya,
          menuDesc: `얇게 썬 쇠고기를 달걀 반죽에 담그고 튀긴 한국식 하와이 요리입니다.`,
          price: 15000,
        },
      ],
      timeSlots: [
        { label: "17:00", value: "17:00", available: true },
        { label: "17:30", value: "17:30", available: true },
        { label: "18:00", value: "18:00", available: true },
        { label: "18:30", value: "18:30", available: true },
        { label: "19:00", value: "19:00", available: true },
        { label: "19:30", value: "19:30", available: true },
        { label: "20:00", value: "20:00", available: false },
        { label: "20:30", value: "20:30", available: false },
        { label: "21:00", value: "21:00", available: true },
        { label: "21:30", value: "21:30", available: false },
        { label: "22:00", value: "22:00", available: false },
        { label: "22:30", value: "22:30", available: false },
        { label: "23:00", value: "23:00", available: false },
        { label: "23:30", value: "23:30", available: false },
        { label: "24:00", value: "24:00", available: false },
      ],
    },
  };

  return (
    <View style={styles.container}>
      <Text>끼리끼리</Text>
      <Button
        title="식당 상세페이지"
        onPress={() => {
          navigation.navigate("식당 상세", { bar: bars.simya });
        }}
      />
      <Button
        title="예약메인"
        onPress={() => {
          navigation.navigate("예약메인", { bar: bars.simya });
        }}
      />
      <Button
        title="로그인"
        onPress={() => {
          navigation.navigate("로그인화면", { bar: bars.simya });
        }}
      />
      <Button
        title="마이페이지"
        onPress={() => {
          navigation.navigate("마이페이지", { bar: bars.simya });
        }}
      />
      <Button
        title="위약정보"
        onPress={() => {
          navigation.navigate("위약정보", { bar: bars.simya });
        }}
      />
      <Button
        title="프로필관리"
        onPress={() => {
          navigation.navigate("프로필관리", { bar: bars.simya });
        }}
      />
      <Button
        title="내예약관리"
        onPress={() => {
          navigation.navigate("내예약관리", { bar: bars.simya });
        }}
      />
      <View>
        {imageUrls.map((url, index) => (
          <Image key={index} source={{uri: url}} style={{ width: 200, height: 100 }} />
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Main;
