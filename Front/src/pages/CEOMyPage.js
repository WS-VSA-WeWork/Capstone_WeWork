import { Pressable, ScrollView, StyleSheet } from "react-native";
import { Text, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CEOMyPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.myPageContainer}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate("사장님 프로필관리")}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#F2F2F2" : "#FFFFFF",
            },
          ]}
        >
          <View style={styles.user}>
            <View style={styles.userLeft}>
              <Image
                source={require("../../assets/wandong.jpg")}
                style={styles.avatar}
              ></Image>
              <Text style={styles.userName}>동완</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </Pressable>
        <View style={styles.userBook}>
          <Text style={styles.userBookTitle}>가장 빠른 대관 일정</Text>
          <View style={styles.userBookContent}>
            <Text style={styles.userBookContentTop}>2023-12-5</Text>
            <Text>17:00 ~ 19:00 / 23명</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.bodyContainer}>
          <Pressable
            onPress={() => navigation.navigate("사장님 예약관리")}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#F2F2F2" : "#FFFFFF",
              },
            ]}
          >
            <View style={styles.reservationManage}>
              <View style={styles.reservationManageLeft}>
                <Feather name="calendar" size={30} color="black" />
                <Text style={styles.reservationManageTitle}>
                  사장님 예약 관리
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={26}
                color="black"
              />
            </View>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#F2F2F2" : "#FFFFFF",
              },
            ]}
          >
            <View style={styles.reservationManage}>
              <View style={styles.reservationManageLeft}>
                <MaterialCommunityIcons
                  name="hand-coin-outline"
                  size={24}
                  color="black"
                />
                <Text style={styles.reservationManageTitle}>결제 관리</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={26}
                color="black"
              />
            </View>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("사장님 위약정보")}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#F2F2F2" : "#FFFFFF",
              },
            ]}
          >
            <View style={styles.reservationManage}>
              <View style={styles.reservationManageLeft}>
                <MaterialCommunityIcons
                  name="account-cancel-outline"
                  size={24}
                  color="black"
                />
                <Text style={styles.reservationManageTitle}>
                  사장님 위약 관리
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={26}
                color="black"
              />
            </View>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("규정 사항")}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#F2F2F2" : "#FFFFFF",
              },
            ]}
          >
            <View style={styles.reservationManage}>
              <View style={styles.reservationManageLeft}>
                <Octicons name="law" size={24} color="black" />
                <Text style={styles.reservationManageTitle}>
                  규정 사항 보기
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={26}
                color="black"
              />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  myPageContainer: {
    flex: 1,
  },
  //첫번째 섹터
  header: {
    backgroundColor: "#FFFFFF",
    height: "30%",
  },
  userLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
  },
  user: {
    marginVertical: 20,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  avatar: {
    borderRadius: 25,
    width: 60,
    height: 60,
    backgroundColor: "#F0F2F5",
  },
  userBook: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  userBookTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  userBookContent: {
    alignItems: "center",
  },
  userBookContentTop: {
    color: "#1AB277",
    fontWeight: "bold",
    fontSize: 18,
  },
  //두번째 섹터
  bodyContainer: {
    marginTop: 18,
  },
  reservationManage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  reservationManageLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  reservationManageTitle: {
    fontSize: 18,
  },
});

export default CEOMyPage;
