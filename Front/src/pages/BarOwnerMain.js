import { React, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LocaleConfig, Calendar, Agenda } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import CustomDayComponent from "../components/CustomDayComponent";
import Reviews from "../components/Reviews";
import { fetchReviewsByPub } from "../reducers/reviewReducer";
import { fetchPubDataByName } from "../reducers/pubReducer";
import { fetchReservationDataByPubName } from "../reducers/reservationReducer";
import Reservations from "../components/Reservations";

const BarOwnerMain = ({ route }) => {
  const [reservation, setReservation] = useState(true);
  const [review, setReviews] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const bar = route.params.bar; //tmp
  const myPubData = useSelector((state) => state.pub.myPub);
  const pubStatus = useSelector((state) => state.pub.status);
  const pubError = useSelector((state) => state.pub.error);
  const reviews = useSelector((state) => state.review.data);
  const reservations = useSelector((state) => state.reservation.data);
  const reservationStatus = useSelector((state) => state.reservation.status);
  const reservationError = useSelector((state) => state.reservation.error);
  const [todaysReservations, setTodaysReservations] = useState([]);
  const [reservationCount, setReservationCount] = useState({});

  // const reviewData = [
  //   {
  //     pubName: "백수씨 심야식당",
  //     customerNickname: "김영희",
  //     reviewRating: 4.5,
  //     uploadDate: "2023-03-01T12:00:00",
  //     reviewContent:
  //       "음식이 정말 맛있었어요. 분위기도 좋고, 서비스도 훌륭합니다!",
  //     reviewImg: "https://example.com/review-photo1.jpg",
  //   },
  //   {
  //     pubName: "백수씨 심야식당",
  //     customerNickname: "이철수",
  //     reviewRating: 5.0,
  //     uploadDate: "2023-03-02T15:30:00",
  //     reviewContent:
  //       "재료가 신선하고, 요리가 일품이었습니다. 다음에 꼭 다시 방문할게요!",
  //     reviewImg:
  //       "https://firebasestorage.googleapis.com/v0/b/wework-back.appspot.com/o/%EB%B0%B1%EC%88%98%EC%94%A8%EC%8B%AC%EC%95%BC%EC%8B%9D%EB%8B%B9%2F%EC%8B%AC%EC%95%BC%EC%8B%9D%EB%8B%B9-%EA%B0%84%ED%8C%9001.jpeg?alt=media&token=7cd18370-abdf-4463-b0bf-467410ef7bd1",
  //   },
  //   {
  //     pubName: "백수씨 심야식당",
  //     customerNickname: "박지영",
  //     reviewRating: 4.0,
  //     uploadDate: "2023-03-03T19:00:00",
  //     reviewContent:
  //       "쾌적한 환경에서 맛있는 식사를 할 수 있어서 좋았어요. 다만, 대기 시간이 조금 길었네요.",
  //     reviewImg: "https://example.com/review-photo3.jpg",
  //   },
  // ];

  LocaleConfig.locales["kr"] = {
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    today: "오늘",
  };

  LocaleConfig.defaultLocale = "kr";

  const MovingBar = useRef(new Animated.Value(38)).current;
  const barWidth = useRef(new Animated.Value(110)).current;

  const onReservation = () => {
    setReservation(true);
    setReviews(false);
  };

  const onReview = () => {
    setReservation(false);
    setReviews(true);
    dispatch(fetchReviewsByPub("백수씨심야식당"));
  };

  useEffect(() => {
    // 상태에 따라 바 위치를 조절
    if (reservation) {
      Animated.timing(MovingBar, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(barWidth, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (review) {
      Animated.timing(MovingBar, {
        toValue: 185, // 원하는 위치로 바 이동
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(barWidth, {
        toValue: 50,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [reservation, review, MovingBar]);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);

    // 선택한 날짜의 예약들만 필터링
    const data = reservations.filter((r) => r.reservDate === day.dateString);
    setTodaysReservations(data);
  };

  //한글 요일 반환
  const dayOfWeek = (day) => {
    const date = new Date(day);
    const dateIdx = date.getDay();
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return `(${daysOfWeek[dateIdx]})`;
  };

  // 날짜별 예약건수 계산
  const countReservations = (reservations) => {
    const count = reservations.reduce((acc, cur) => {
      // 해당 날짜의 예약 건수가 undefined면 0으로 초기화 후 1을 더함
      acc[cur.reservDate] = (acc[cur.reservDate] || 0) + 1;
      return acc;
    }, {});
    console.log("count", count);
    setReservationCount(count);
  };

  useEffect(() => {
    const pubName = "백수씨심야식당"; //tmp
    dispatch(fetchPubDataByName(pubName));
    dispatch(fetchReservationDataByPubName(pubName)).then((action) => {
      const resrv = action.payload;
      countReservations(resrv);
    });
  }, []);

  useEffect(() => {
    console.log("reservationCount", reservationCount);
  }, [reservationCount]); // 페이지에 접속 시 날짜별로 계산된 예약건수 반영

  // 데이터가 없으면 에러 발생하여 데이터 로드 후 렌더링되도록 설정
  if (pubStatus === "succeeded") {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.TopMenu}>
            <Text style={styles.title}>내 술집</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("가게 등록");
              }}
            >
              <Text style={styles.tag}>술집 정보 수정하기{` >`}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.myBarContainer}>
            <Image
              source={{ uri: myPubData.pubImages[1] }}
              style={styles.barImage}
              resizeMode="contain"
            />
            <View style={styles.BarInfo}>
              <Text style={styles.semiTitle}>{myPubData.pubName}</Text>
              <View style={styles.tags}>
                {myPubData.hashTags.map((tag, index) => (
                  <Text key={index} style={styles.tag}>
                    {tag}{" "}
                  </Text>
                ))}
              </View>

              <Text>
                <AntDesign name="star" size={20} color="#1AB277" />{" "}
                {myPubData.rating}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.contentTitle}>
            <View style={styles.tabContainer}>
              <TouchableOpacity onPress={onReservation}>
                <Text
                  style={{
                    ...styles.title,
                    color: reservation ? "#393E47" : "#9FA8B6",
                    marginBottom: 5,
                  }}
                >
                  예약 일정
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tabContainer}>
              <TouchableOpacity onPress={onReview}>
                <Text
                  style={{
                    ...styles.title,
                    color: review ? "#393E47" : "#9FA8B6",
                    marginBottom: 5,
                  }}
                >
                  리뷰
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Animated.View
            style={{
              backgroundColor: "#24242F",
              width: barWidth,
              height: 3,
              marginBottom: 10,
              transform: [
                {
                  translateX: MovingBar,
                },
              ],
            }}
          ></Animated.View>

          {/* 예약 일정 탭 */}
          {reservation && (
            <View style={styles.contentContainer}>
              <Calendar
                onDayPress={onDayPress}
                markedDates={{
                  ...Object.keys(reservations).reduce((acc, curr) => {
                    acc[curr] = { marked: true };
                    return acc;
                  }, {}),
                  [selectedDate]: { selected: true },
                }}
                // markedDates={{
                //   ...updateMarkedDates(),
                //   [selectedDate]: { selected: true, selectedColor: "#1AB277" },
                // }}
                dayComponent={({ date, state }) => (
                  <CustomDayComponent
                    data={reservationCount}
                    date={date}
                    state={state}
                    onDayPress={onDayPress}
                  />
                )}
                markingType="custom"
                theme={{
                  selectedDayBackgroundColor: "#1AB277",
                  dotColor: "#1AB277",
                  todayTextColor: "#6E757B",
                  dayTextColor: "#393E47",
                }}
              />

              {selectedDate && (
                <>
                  <View style={styles.infoSummary}>
                    <Text style={styles.semiTitle}>
                      {selectedDate}
                      {dayOfWeek(selectedDate)}
                    </Text>
                    <Text style={styles.semiTitle}>
                      {todaysReservations.length !== 0
                        ? todaysReservations.length + "건"
                        : "예약 없음"}
                    </Text>
                  </View>
                  <Reservations data={todaysReservations} isOwner />
                </>
              )}
            </View>
          )}

          {/* 리뷰 탭 */}
          {review && (
            <View style={styles.reviewContainer}>
              <Reviews reviews={reviews} isOwner={true} />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    minHeight: "100%",
  },
  topContainer: {
    backgroundColor: "#F1F2F6",
    padding: 20,
  },
  TopMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  tag: {
    color: "#7E8389",
  },
  bottomContainer: {
    padding: 20,
  },
  contentTitle: {
    flexDirection: "row",
  },
  tabContainer: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  infoSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 20,
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
