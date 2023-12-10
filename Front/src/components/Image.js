import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Image, Button } from "react-native";

const SetImage = ({ url, onChangePhoto }) => {
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

  const _handlePhotoBtnPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.uri);
      onChangePhoto(result.uri);
    }
  };

  // useEffect를 사용하여 url이 변경될 때마다 호출되도록 설정
  useEffect(() => {
    // 이미지가 변경되면 새로운 uri로 업데이트
    Image.prefetch(url).then(() => {
      console.log("Image is updated:", url);
    });
  }, [url]);

  return (
    <View>
      {/* Image 컴포넌트에 key prop 추가하여 강제로 다시 렌더링 */}
      <Image
        key={url}
        source={{ uri: url }}
        style={{ width: "85%", height: 200 }}
      />
    </View>
  );
};

export default SetImage;
