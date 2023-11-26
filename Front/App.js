import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "./src/pages/Main";
import BarDetail from "./src/pages/BarDetail";
import UserReservation from "./src/pages/userReservation";
import Order from "./src/pages/Order";
import Confirm from "./src/pages/Confirm";
import Login from "./src/pages/Login";
import MyBan from "./src/pages/MyBan";
import MyProfile from "./src/pages/MyProfile";
import MyReservation from "./src/pages/MyReservation";
import MyPage from "./src/pages/MyPage";
import CEOMyPage from "./src/pages/CEOMyPage";
import CEOMyReservation from "./src/pages/CEOMyReservation";
import CEOMyBan from "./src/pages/CEOMyBan";
import CEOMyProfile from "./src/pages/CEOMyProfile";
import MyRule from "./src/pages/MyRule";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="식당 상세" component={BarDetail} />
        <Stack.Screen name="결제하기" component={Order} />
        <Stack.Screen name="예약완료" component={Confirm} />
        <Stack.Screen name="예약메인" component={UserReservation} />
        <Stack.Screen name="로그인화면" component={Login} />
        <Stack.Screen name="마이페이지" component={MyPage} />
        <Stack.Screen name="위약정보" component={MyBan} />
        <Stack.Screen name="프로필관리" component={MyProfile} />
        <Stack.Screen name="내예약관리" component={MyReservation} />
        <Stack.Screen name="사장님 마이페이지" component={CEOMyPage} />
        <Stack.Screen name="사장님 예약관리" component={CEOMyReservation} />
        <Stack.Screen name="사장님 위약정보" component={CEOMyBan} />
        <Stack.Screen name="사장님 프로필관리" component={CEOMyProfile} />
        <Stack.Screen name="규정 사항" component={MyRule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
