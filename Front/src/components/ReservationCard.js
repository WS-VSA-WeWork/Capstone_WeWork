import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ReservationCard = ({ name, rating, image, phone, start, end }) => {
  const navigation = useNavigation();
  return (
    // <View style={styles.cardContainer}>
    // <Pressable
    //   onPress={() => {
    //     navigation.navigate("식당 상세");
    //   }}
    // >
    <View style={styles.card}>
      <View>
        <Image source={{ uri: image }} style={styles.cardPicture} />
      </View>
      <View style={styles.cardSpace}></View>
      <View style={styles.cardContentContainer}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{name}</Text>
          <FontAwesome name="star" size={20} color="green" />
          <Text style={styles.cardRating}>{rating}</Text>
        </View>
        {/* <View style={styles.cardContent}>
          <Text>최소주문 14,500원</Text>
        </View> */}
        <View style={styles.cardContent2}>
          <Feather name="clock" size={15} color="black" />
          <Text>
            오후 {start} ~ 오전 {end}
          </Text>
          <AntDesign name="phone" size={15} color="black" />
          <Text>{phone}</Text>
        </View>
      </View>
    </View>

    // </Pressable>

    // </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 20,
    flex: 1,
    width: "100%",
    marginVertical: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignItems: "center",
  },
  cardContent2: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignItems: "center",
    gap: 8,
  },
  cardContentContainer: {
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: "#F1F2F6",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 3,
  },
  cardPicture: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardSpace: {
    width: "100%",
    backgroundColor: "green",
    height: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  cardRating: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
export default ReservationCard;
