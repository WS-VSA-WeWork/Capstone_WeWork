import { React, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsByPub } from "../reducers/reviewReducer";

import Reviews from "../components/Reviews";
import ReservationCardforOwner from "../components/ReservationCardforOwner";
// import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";

const CEODashBoard = ({ route }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const bar = route.params.bar;
  const reviews = useSelector((state) => state.review.data);

  // 예시를 위한 데이터, 실제 데이터로 교체 필요
  const data = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50], // 주간 예약 수 데이터
      },
    ],
  };

  const reviewData = [
    {
      pubName: "백수씨 심야식당",
      customerNickname: "김영희",
      reviewRating: 4.5,
      uploadDate: "2023-03-01T12:00:00",
      reviewContent:
        "음식이 정말 맛있었어요. 분위기도 좋고, 서비스도 훌륭합니다!",
      reviewImg: "https://example.com/review-photo1.jpg",
    },
    {
      pubName: "백수씨 심야식당",
      customerNickname: "이철수",
      reviewRating: 5.0,
      uploadDate: "2023-03-02T15:30:00",
      reviewContent:
        "재료가 신선하고, 요리가 일품이었습니다. 다음에 꼭 다시 방문할게요!",
      reviewImg:
        "https://firebasestorage.googleapis.com/v0/b/wework-back.appspot.com/o/%EB%B0%B1%EC%88%98%EC%94%A8%EC%8B%AC%EC%95%BC%EC%8B%9D%EB%8B%B9%2F%EC%8B%AC%EC%95%BC%EC%8B%9D%EB%8B%B9-%EA%B0%84%ED%8C%9001.jpeg?alt=media&token=7cd18370-abdf-4463-b0bf-467410ef7bd1",
    },
    {
      pubName: "백수씨 심야식당",
      customerNickname: "박지영",
      reviewRating: 4.0,
      uploadDate: "2023-03-03T19:00:00",
      reviewContent:
        "쾌적한 환경에서 맛있는 식사를 할 수 있어서 좋았어요. 다만, 대기 시간이 조금 길었네요.",
      reviewImg: "https://example.com/review-photo3.jpg",
    },
  ];

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
        <LineChart
          data={data}
          width={400} // 차트의 너비
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2, // 소수점 자리수
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          bezier
          style={styles.chartStyle}
        />
      </View>

      <View style={styles.incontentBorderLine} />

      <View style={styles.contentContainer}>
        <Text style={styles.semiTitle}>새로운 리뷰</Text>
        <View style={styles.reviewContainer}>
          <Reviews reviews={reviews} isOwner={true} />
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
  chartStyle: {
    width: "100%",
    marginVertical: 8,
    borderRadius: 16,
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
