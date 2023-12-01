import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import SetImage from "./Image";
import * as ImagePicker from "expo-image-picker";
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

  const [photo, setPhoto] = useState(undefined);
  const _handlePhotoChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.uri);
      setPhoto(result.uri); // 이미지 변경
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
});

export default RestaurantBasic;
