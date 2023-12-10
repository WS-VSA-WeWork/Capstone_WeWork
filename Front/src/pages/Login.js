import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { auth } from "../../firebaseConfig";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // 이메일 로그인 -------------------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const onHandleLogin = async () => {
    if (email !== "" && password !== "" && type !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          // 로그인 성공 시, 토큰과 uid를 storage에 저장
          const token = res._tokenResponse.idToken;
          const uid = res.user.uid;
          AsyncStorage.setItem(
            "userData",
            JSON.stringify({
              token: token,
              uid: uid,
              type: type,
            })
          );

          // 이용자에 따른 페이지 이동
          if (type === "사장님") {
            navigation.navigate("대시보드");
          } else {
            const user = {
              uid: uid,
              type: type,
            };
            navigation.navigate("예약메인", { user });
          }
        })
        .catch((err) => {
          if (err.code === "auth/invalid-login-credentials") {
            alert("유효하지 않은 이메일 또는 비밀번호입니다. ");
          } else {
            alert("로그인에 실패하였습니다. 다시 시도해주세요.");
          }
        });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, email, displayName, accessToken } = user;
        console.log("uid :", uid);
        console.log("email :", email);
        console.log("accessToken :", accessToken);
      }
    });
  }, [onAuthStateChanged]);

  const onJoin = () => {
    <TouchableOpacity style={styles.loginButton} onPress={onHandleLogin}>
      <Text style={styles.buttonText}>로그인</Text>
    </TouchableOpacity>;
    navigation.navigate("회원가입", { type: type });
  };

  // // 구글 로그인 -------------------------------------------------
  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId:
  //     "494469542541-j2kjipab4q49fut3d0hrch11tgjm8r5u.apps.googleusercontent.com",
  //   androidId:
  //     "494469542541-p91f7eqoului7456ejr4b4n0502of48e.apps.googleusercontent.com",
  // });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;
  //     const auth = getAuth();
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(auth, credential);
  //   }
  // }, [response]);

  // const url = AuthSession.getRedirectUrl("redirect");
  // const redirectUri = makeRedirectUri({
  //   scheme: "exp",
  //   path: "redirect",
  // });

  // Managed: https://auth.expo.io/@your-username/your-app-slug/redirect
  // Web: https://localhost:19006/redirect

  // const redirectUrl = Linking.createURL("path/into/app", {
  //   queryParams: { hello: "world" },
  // });

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
        <View style={styles.typeButtonContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === "이용자" && styles.selectedTypeButton,
            ]}
            onPress={() => setType("이용자")}
          >
            <Text style={styles.buttonText}>이용자</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === "사장님" && styles.selectedTypeButton,
            ]}
            onPress={() => setType("사장님")}
          >
            <Text style={styles.buttonText}>사장님</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={onHandleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={onJoin}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>

      {/* <Button
        disabled={!request}
        title="구글 로그인"
        onPress={() => {
          promptAsync();
        }}
      /> */}
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
    marginVertical: 10,
  },
  selectedTypeButton: {
    backgroundColor: "#1F7457",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Login;
