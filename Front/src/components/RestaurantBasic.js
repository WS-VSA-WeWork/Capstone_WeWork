import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import SetImage from "./Image";
import * as ImagePicker from "expo-image-picker";
import ImagePick from "./ImagePick";
import { useDispatch } from "react-redux";
import { pushPubData } from "../reducers/pubReducer";
const RestaurantBasic = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myPub = route.params.myPubData;

  const [pubName, setPubName] = useState("");
  const [category, setCategory] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [maxSeats, setMaxSeats] = useState("");
  const [hashTag, setHashTag] = useState("");
  const [hashTags, setHashTags] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState("");
  const [photo, setPhoto] = useState(undefined);
  const categories = ["이자카야", "치킨집", "전집", "막걸리", "기타"];

  const handlePress = () => {
    const data = {
      pubName: pubName,
      type: category,
      pubPhonenum: phoneNum,
      pubAddress: address,
      startTime: startTime,
      endTime: endTime,
      maxSeats: maxSeats,
      pubDescription: restaurantInfo,
      hashTags: hashTags,
    };
    dispatch(
      pushPubData({
        pubName: "백수씨심야식당",
        data: data,
      })
    );
  };

  const onChangePubName = (text) => {
    setPubName(text);
  };

  const onChangeCategory = (text) => {
    setCategory(text);
  };

  const onChangeAddress = (text) => {
    setAddress(text);
  };

  const onChangeOpeningHours = (text) => {
    console.log(text);
    setOpeningHours(text);
    const splitTimes = text.split(" - ");
    console.log(splitTimes);
    setStartTime(splitTimes[0]);
    setEndTime(splitTimes[1]);
  };

  const onChangeMaxSeats = (text) => {
    setMaxSeats(text);
  };

  const onChangePhonenum = (text) => {
    setPhoneNum(text);
  };

  const onChangeHashtag = (text) => {
    setHashTag(text);
    console.log(text);
  };

  const onChangeRestaurantInfo = (text) => {
    setRestaurantInfo(text);
  };

  const _handlePhotoChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.uri);
      setPhoto(result.uri); // 이미지 변경
    }
  };

  const addHashTag = () => {
    const word = "#" + hashTag;
    const newHashTags = [...hashTags, word];
    console.log(newHashTags);
    const uniqueHashTags = [...new Set(newHashTags)];
    console.log(uniqueHashTags);
    setHashTags(uniqueHashTags);
    setHashTag("");
    console.log("hashtags", hashTags);
  };

  const removeHashTag = (tag) => {
    const updatedHashTags = hashTags.filter((t) => t !== tag);
    setHashTags(updatedHashTags);
  };

  useEffect(() => {
    if (myPub) {
      setPubName(myPub.pubName);
      setCategory(myPub.type);
      setPhoneNum(myPub.pubPhonenum);
      setAddress(myPub.pubAddress);
      setStartTime(myPub.startTime);
      setEndTime(myPub.endTime);
      setOpeningHours(myPub.startTime + " - " + myPub.endTime);
      setMaxSeats(myPub.maxSeats.toString());
      setHashTags(myPub.hashTags);
      setRestaurantInfo(myPub.pubDescription);
    }
  }, [myPub]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.blockContainer}>
          <View style={styles.blockTitleContainer}>
            <Text style={styles.blockTitle}>가게 정보</Text>
            <Pressable
              onPress={handlePress}
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
                <Text style={{ color: "blue", fontWeight: "bold" }}>수정</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.blockContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.fieldTitle}>가게 이름</Text>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                onChangeText={(text) => onChangePubName(text)}
                value={pubName}
                maxLength={11}
                style={styles.content}
                placeholder={"가게 이름"}
              ></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.blockContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.fieldTitle}>카테고리</Text>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <SelectDropdown
                data={categories}
                buttonStyle={styles.dropdownButtonStyle}
                defaultButtonText={category}
                buttonTextStyle={styles.dropdownButtonTextStyle}
                dropdownStyle={styles.dropdownStyle}
                dropdownButtonTextStyle={styles.dropdownButtonTextStyle}
                onSelect={(selectedItem, index) => {
                  onChangeCategory(selectedItem);
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.blockContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.fieldTitle}>가게 대표 전화번호</Text>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                onChangeText={(text) => onChangePhonenum(text)}
                value={phoneNum}
                maxLength={11}
                style={styles.content}
                placeholder={phoneNum}
              ></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.blockContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.fieldTitle}>가게 주소</Text>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                onChangeText={(text) => onChangeAddress(text)}
                value={address}
                maxLength={11}
                style={styles.content}
                placeholder={address}
              ></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.blockContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.fieldTitle}>영업 시간</Text>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                onChangeText={(text) => onChangeOpeningHours(text)}
                value={openingHours}
                style={styles.content}
                placeholder={openingHours}
              ></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.blockContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.fieldTitle}>수용 가능 최대 인원</Text>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                onChangeText={(text) => onChangeMaxSeats(text)}
                value={maxSeats}
                maxLength={11}
                style={styles.content}
                placeholder={maxSeats}
              ></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.blockContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.fieldTitle}>가게 소개</Text>
            <TextInput
              onChangeText={(info) => onChangeRestaurantInfo(info)}
              value={restaurantInfo}
              style={styles.restaurantInfoContent}
              multiline={true}
              placeholder={restaurantInfo}
            ></TextInput>
          </View>
        </View>

        <View style={styles.blockContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.fieldTitle}>가게 해시태그</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "70%",
              }}
            >
              <TextInput
                onChangeText={(text) => onChangeHashtag(text)}
                value={hashTag}
                style={styles.content}
                placeholder={"해시 태그"}
              ></TextInput>
              <Button
                style={{ backgroundColor: "#FFFFFF" }}
                title="Add HashTag"
                onPress={addHashTag}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {hashTags.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    borderRadius: 10,
                    backgroundColor: "#E0E0E0",
                    padding: 5,
                    margin: 3,
                    height: 25,
                  }}
                >
                  <Text style={{ marginRight: 8 }}>{item}</Text>
                  <TouchableOpacity onPress={() => removeHashTag(item)}>
                    <Text style={{ color: "red" }}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.blockContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.fieldTitle}>대표 사진 등록하기</Text>

            {/* <Pressable
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
            </Pressable> */}
            <ImagePick collectionPath="pubs" documentId="백수씨심야식당" />
            {/* {photo ? (
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
          )}*/}
          </View>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  blockTitleContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  blockTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
    borderColor: "#E5E5E5",
    borderTopWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: "100%",
    margin: 10,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 2,
  },
  content: {
    fontSize: 15,
    fontWeight: "500",
    width: "100%",
    paddingRight: 20,
    height: 40,
  },
  restaurantInfoContent: {
    fontSize: 15,
    fontWeight: "500",
    width: "100%",
    paddingRight: 20,
    height: 150,
  },
  dropdownButtonStyle: {
    width: "40%",
    height: 40,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 3,
  },
  dropdownButtonTextStyle: {
    fontSize: 13,
    fontWeight: "400",
    color: "#000000",
  },
  dropdownStyle: {
    width: "50%",
    height: 150,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  myInfoContentButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    width: 100,
  },
  photoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RestaurantBasic;
