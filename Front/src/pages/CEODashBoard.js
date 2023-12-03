import { React, useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsByPub } from "../reducers/reviewReducer";
import { fetchReservData } from "../reducers/reserveReducer";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import Reviews from "../components/Reviews";
import ReservationCardforOwner from "../components/ReservationCardforOwner";
// import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";

const CEODashBoard = ({ route }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const bar = route.params.bar;
  const reviews = useSelector((state) => state.review.data);

  // 예약 데이터를 가져오기 위한 Redux 상태 선택
  const reservations = useSelector((state) => state.reservation.data);

  useEffect(() => {
    // 컴포넌트가 마운트 될 때 예약 데이터를 불러옴
    dispatch(fetchReservData({ pubName: bar.name })); // bar.name은 현재 선택된 펍의 이름
  }, [dispatch, bar.name]);

  useEffect(() => {
    // 예약 데이터가 업데이트되면 콘솔에 출력
    console.log("예약 데이터:", reservations);
  }, [reservations]);

  // 요일을 계산하는 함수
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
  };

  // 요일별 예약 건수를 저장할 배열 초기화 (일요일부터 토요일까지)
  const weeklyReservations = Array(7).fill(0);

  // 각 예약에 대해 요일별 예약 건수 집계
  reservations.forEach((reservation) => {
    const dayOfWeek = getDayOfWeek(reservation.reservDate);
    weeklyReservations[dayOfWeek]++;
    console.log(weeklyReservations);
  });

  // 차트 데이터
  const data = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        data: weeklyReservations, // 주간 예약 수 데이터
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
        <View style={styles.menuContainer}>
          <View style={styles.buttonContianer}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => {
                navigation.navigate("사장님메인", {bar: bar});
              }}
            >
              <FontAwesome name="calendar-check-o" size={35} color="#393E47" />
            </TouchableOpacity>

            <Text style={styles.menuText}>술집 관리</Text>
          </View>

          <View style={styles.buttonContianer}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => {
                navigation.navigate("가게 등록");
              }}
            >
              <AntDesign name="pluscircleo" size={35} color="#393E47" />
            </TouchableOpacity>

            <Text style={styles.menuText}>가게 등록하기</Text>
          </View>

          <View style={styles.buttonContianer}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => {
                navigation.navigate("사장님 마이페이지");
              }}
            >
              <AntDesign name="user" size={35} color="#393E47" />
            </TouchableOpacity>

            <Text style={styles.menuText}>마이페이지</Text>
          </View>
        </View>
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
        <View style={styles.squareContainer}>
          <LineChart
            data={data}
            width={Dimensions.get("window").width - 30} // 차트의 너비
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff", // 배경색
              backgroundGradientFrom: "#ffffff", // 그라데이션 시작 색상을 하얀색으로
              backgroundGradientTo: "#ffffff", // 그라데이션 끝 색상을 하얀색으로
              decimalPlaces: 0, // 소수점 자리수
              color: (opacity = 1) => `rgba(31, 176, 119, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chartStyle}
          />
        </View>
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
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D7DBDF",
    backgroundColor: "#1FB077",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  menuContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  contentsContainer: {},
  buttonContianer:{
    marginHorizontal: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  menuButton: {
    height: 60,
    width: 60,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginBottom: 3,
  },
  menuText:{
    color: "#ffffff",
  },
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
  squareContainer: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#D7DBDF",
    marginVertical: 10,
  },
  contentText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#393E47",
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
    paddingTop: 15,
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
