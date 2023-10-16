import { Text, View, Button, StyleSheet, StatusBar } from "react-native";

import { useNavigation } from "@react-navigation/native";

const Main = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>끼리끼리</Text>
      <Button
        title="식당 상세페이지"
        onPress={() => {
          navigation.navigate("식당 상세");
        }}
      />
      <StatusBar style="auto" />
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
});

export default Main;
