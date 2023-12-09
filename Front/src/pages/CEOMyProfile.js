import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const CEOMyProfile = () => {
  const [phone, onChangePhone] = useState("01033600449");
  const [name, onChangeName] = useState("동완");
  const [registrationNumber, setRegistrationNumber] = useState("");

  const phonehandlePress = () => {
    onChangePhone((currentText) => currentText);
    console.log(phone);
  };
  const namehandlePress = () => {
    onChangeName((currentText) => currentText);
    console.log(name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require("../../assets/wandong.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{name}</Text>
      </View>
      <View style={styles.myInfo}>
        <Text style={styles.myInfoTitle}>내 정보</Text>

        <View style={styles.myInfoContent}>
          <Text style={styles.myInfoContentTitle}>이름</Text>
          <TextInput
            style={styles.myInfoInput}
            onChangeText={(name) => onChangeName(name)}
            value={name}
            maxLength={5}
          ></TextInput>
          <Pressable
            onPress={namehandlePress}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#FFFFFF" : "#F2F2F2",
              },
            ]}
          >
            <View style={styles.myInfoContentButton}>
              <Text>이름 변경</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.myInfoContent}>
          <Text style={styles.myInfoContentTitle}>연락처</Text>
          <TextInput
            style={styles.myInfoInput}
            onChangeText={(phone) => onChangePhone(phone)}
            value={phone}
            maxLength={11}
          ></TextInput>
          <Pressable
            onPress={phonehandlePress}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#FFFFFF" : "#F2F2F2",
              },
            ]}
          >
            <View style={styles.myInfoContentButton}>
              <Text>연락처 변경</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.myInfoContent}>
          <Text style={styles.myInfoContentTitle}>사업자 등록 번호</Text>
          <Text
            style={styles.myRegistrationNumber}
            // onChangeText={(phone) => onChangePhone(phone)}
            // value={phone}
            // maxLength={11}
          >
            011234-1234
          </Text>
        </View>
      </View>
      <View style={styles.registerNumberNotify}>
        <AntDesign name="exclamationcircle" size={19} color="black" />
        <Text style={styles.registerNumberNotifyContent}>
          사업자 등록 번호 변경은 고객센터를 통해 변경 가능합니다.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginVertical: 10 },
  // 프로필
  top: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    height: "28%",
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "grey",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
  },
  //내 정보
  myInfo: {
    marginVertical: 10,
    height: "45%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 15,
  },
  myInfoTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
  },
  myInfoContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  myInfoContentTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  myInfoInput: {
    borderWidth: 1,
    borderColor: "#F2F2F2",
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "55%",
    color: "#939393",
    fontWeight: "500",
  },
  myRegistrationNumber: {
    borderWidth: 1,
    borderColor: "#F2F2F2",
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "60%",
    color: "#939393",
    fontWeight: "500",
  },
  myInfoContentButton: {
    borderColor: "#F2F2F2",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 2,
  },
  registerNumberNotify: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    height: "10%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 15,
  },
  registerNumberNotifyContent: {
    fontSize: 12,
    fontWeight: "400",
  },
});

export default CEOMyProfile;
