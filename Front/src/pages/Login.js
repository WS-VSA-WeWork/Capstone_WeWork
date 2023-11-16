import { StyleSheet, View, Image, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.loginContainer}>
      <Image
        source={require("../../assets/elephant.png")}
        style={styles.logo}
      ></Image>
      <Text style={styles.title}>대학교 단체 대관 예약 서비스</Text>
      <Text style={styles.subTitle}>끼리끼리</Text>

      <Button
        title="예약메인"
        onPress={() => {
          navigation.navigate("예약메인");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 100,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 10,
  },
  subTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Login;
