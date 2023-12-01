import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Image, Button } from "react-native";

const SetImage = ({ url, onChangePhoto }) => {
  const _handlePhotoBtnPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
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
        style={{ width: "85%", height: "85%" }}
      />
    </View>
  );
};

export default SetImage;
