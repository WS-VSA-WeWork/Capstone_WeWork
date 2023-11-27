import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const GptDetail = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.title}>
          <MaterialCommunityIcons
            name="robot-outline"
            size={28}
            color="black"
          />
          <Text style={styles.titleContent}>AI가 정리한 후기</Text>
        </View>
        <Text>
          "충무로의 백수씨 심야식당은 감각적인 분위기와 다양한 음식 메뉴로
          유명합니다. 특히, 신선한 재료와 훌륭한 맛으로 손님들을 매료시키며,
          매우 친절하고 서비스도 훌륭합니다. 가족, 친구와의 모임이나 특별한 날에
          방문하면 좋은 식사 경험이 될 것입니다."
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  box: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    gap: 10,
    // borderColor: "#1AB277",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  titleContent: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default GptDetail;
