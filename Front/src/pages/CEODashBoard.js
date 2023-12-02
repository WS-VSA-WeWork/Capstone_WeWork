import { React, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReviewCard from "../components/ReviewCard";
import ReservationCardforOwner from "../components/ReservationCardforOwner";

const CEODashBoard = ({ route }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();

  const bar = route.params.bar;

  //한글 요일 반환
  const dayOfWeek = (day) => {
    const date = new Date(day);
    const dateIdx = date.getDay();
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return `(${daysOfWeek[dateIdx]})`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tab}>
        <Text style={styles.title}>백수씨 심야식당</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.center}>
          <Text style={styles.semiTitle}>오늘은 2건의 예약이 있어요.</Text>
        </View>
        <Text style={styles.semiTitle}>
          {selectedDate.toLocaleDateString()}
          {dayOfWeek(selectedDate)}
        </Text>
        <ReservationCardforOwner />
        <ReservationCardforOwner />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("사장님메인", { bar: bar });
          }}
        >
          <View style={styles.center}>
            <Text style={styles.contentText}>월별 전체 일정 보기{` >`}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.incontentBorderLine} />

      <View style={styles.contentContainer}>
        <Text style={styles.semiTitle}>주간 예약수</Text>
      </View>

      <View style={styles.incontentBorderLine} />

      <View style={styles.contentContainer}>
        <Text style={styles.semiTitle}>새로운 리뷰</Text>
        <View style={styles.reviewContainer}>
          <ReviewCard isOwner={true} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  tab: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D7DBDF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1FB077",
  },
  contentsContainer: {},
  center: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
  semiTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#393E47",
  },
  contentText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#393E47",
  },
  incontentBorderLine: {
    width: "1",
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#D7DBDF",
  },
  reviewContainer: {
    marginVertical: 20,
  },
});

export default CEODashBoard;
