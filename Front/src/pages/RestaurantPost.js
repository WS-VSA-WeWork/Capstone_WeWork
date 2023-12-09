import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Button, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import RestaurantBasic from "../components/RestaurantBasic";
import RestaurantMenu from "../components/RestaurantMenu";
import RestaurantInfo from "../components/RestaurantInfo";
import RestaurantREview from "../components/RestaurantReview";
import MenuManagementComponent from "../components/RestaurantMenu";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();
function MainScreen({ route }) {
  const myPubData = route.params.myPub;
  console.log("post", myPubData);
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="기본정보"
        component={RestaurantBasic}
        initialParams={{ myPubData }}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="restaurant-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="메뉴등록"
        component={MenuManagementComponent}
        initialParams={{ myPubData }}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="menu-open" size={27} color="black" />
          ),
        }}
      />
      {/* <Tab.Screen
        name="운영정보"
        component={RestaurantInfo}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="down" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="댓글관리"
        component={MenuManagementComponent}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="down" size={24} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="상세보기"
        onPress={() => navigation.push("Detail", { id: 1 })}
      />
    </View>
  );
}

function SearchScreen() {
  return <Text>Search</Text>;
}

function NotificationScreen() {
  return <Text>Notification</Text>;
}

function MessageScreen() {
  return <Text>Message</Text>;
}

export default MainScreen;
