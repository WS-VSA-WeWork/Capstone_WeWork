import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ReservationCard from "../components/ReservationCard";

const BarOwnerMain = ({ route }) => {
  const bar = route.params.bar;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>내 술집</Text>
        <View style={styles.myBarContainer}>
          <Image
            source={bar.image}
            style={styles.barImage}
            resizeMode="contain"
          />
          <View style={styles.BarInfo}>
            <Text style={styles.semiTitle}>{bar.name}</Text>
            <View style={styles.tags}>
              {bar.tags.map((tag, index) => (
                <Text key={index} style={styles.tag}>
                  {tag}{" "}
                </Text>
              ))}
            </View>
            <Text>별점: {bar.rating}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>예약 일정</Text>

        <Text style={styles.semiTitle}>2023-11-10(금)</Text>

        <ReservationCard />
        <TouchableOpacity style={styles.reservationContainer}>
          <View style={styles.info}>
            <Text style={styles.semiTitle}>20:00 ~ 21:30</Text>
            <Text style={styles.warning}>21시간 전</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoLabel}>인원수</Text>
            <Text sytle={styles.infoData}>
              <Text style={styles.warning}>25</Text>명
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoLabel}>예약자명</Text>
            <Text sytle={styles.infoData}>김철수</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoLabel}>연락처</Text>
            <Text sytle={styles.infoData}>010-5432-9876</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  topContainer: {
    backgroundColor: "#F1F2F6",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#393E47",
    marginBottom: 15,
  },
  semiTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#393E47",
  },
  myBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  barImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 30,
  },
  BarInfo: {
    width: "60%",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {},

  bottomContainer: {
    padding: 20,
  },
  reservationContainer: {
    backgroundColor: "#E0F7ED",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#393E47",
  },
  warning: {
    color: "#DD3737",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BarOwnerMain;
