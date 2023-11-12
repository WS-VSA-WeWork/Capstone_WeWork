import { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "./src/pages/Main";
import BarDetail from "./src/pages/BarDetail";
import UserReservation from "./src/pages/userReservation";
import Order from "./src/pages/Order";
import Confirm from "./src/pages/Confirm";
import BarOwnerMain from "./src/pages/BarOwnerMain";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="userReservation" component={UserReservation} />
        <Stack.Screen name="사장님 전용 메인" component={BarOwnerMain} />
        <Stack.Screen name="식당 상세" component={BarDetail}/>
        <Stack.Screen name="결제하기" component={Order}/>
        <Stack.Screen name="예약완료" component={Confirm}/>
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
