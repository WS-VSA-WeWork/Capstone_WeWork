import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Linking,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";
import { auth } from "../../firebaseConfig";
import { setUserInfo } from "../reducers/userReducer";

function Join({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [pubName, setPubName] = useState("");
  const [pubNum, setPubNum] = useState("");
  const userType = route.params.type;

  const onHandleJoin = async () => {
    const data = {
      email: email,
      name: name,
      phoneNum: phoneNum,
      pubName: pubName,
      pubNum: pubNum,
    };
    if (
      email !== "" &&
      password !== "" &&
      passwordCheck !== "" &&
      name !== "" &&
      phoneNum !== ""
    ) {
      if (
        (userType === "사장님" && pubName !== "" && pubNum !== "") ||
        userType === "이용자"
      ) {
        if (password === passwordCheck) {
          await createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
              const token = res._tokenResponse.idToken;
              const uid = res.user.uid;
              console.log(res);
              dispatch(setUserInfo({ uid: uid, type: userType, data }));
              alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
              navigation.navigate("로그인화면");
            })
            .catch((err) => {
              if (err.code === "auth/email-already-in-use") {
                alert("이미 가입된 이메일입니다.");
              } else if (
                err.code === "auth/invalid-email" ||
                err.code === "auth/invalid-credential"
              ) {
                alert("유효하지 않은 이메일입니다.");
              } else if (err.code === "auth/weak-password") {
                alert("비밀번호는 6자리 이상이어야 합니다.");
              } else if (
                err.code === "auth/operation-not-allowed" ||
                err.code === "auth/user-disabled" ||
                err.code === "auth/user-not-found"
              ) {
                alert("이메일/비밀번호 계정이 비활성화 되었습니다.");
              } else {
                console.log(err.code, err.message);
                dispatch(setUserInfo({ uid: uid, type: type, data }));
                alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
                navigation.navigate("로그인");
              }
              console.log(err.code, err.message);
            });
        } else {
          alert("비밀번호가 일치하지 않습니다.");
        }
      }
    } else {
      alert("모든 정보를 입력해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text.toString())}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text.toString())}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={passwordCheck}
          onChangeText={(text) => setPasswordCheck(text.toString())}
        />
        <TextInput
          style={styles.input}
          placeholder="이름"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="username"
          value={name}
          onChangeText={(text) => setName(text.toString())}
        />
        <TextInput
          style={styles.input}
          placeholder="전화번호"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="telephoneNumber"
          value={phoneNum}
          onChangeText={(text) => setPhoneNum(text.toString())}
        />
        {userType === "사장님" && (
          <>
            <TextInput
              style={styles.input}
              placeholder="가게 이름"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="location"
              value={pubName}
              onChangeText={(text) => setPubName(text.toString())}
            />
            <TextInput
              style={styles.input}
              placeholder="사업자 등록 번호"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="none"
              value={pubNum}
              onChangeText={(text) => setPubNum(text.toString())}
            />
          </>
        )}
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={onHandleJoin}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  typeButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  typeButton: {
    flex: 1,
    backgroundColor: "#7C9C91",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 10,
  },
  loginButton: {
    backgroundColor: "#1F7457",
    width: "70%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  selectedTypeButton: {
    backgroundColor: "#1F7457",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Join;
