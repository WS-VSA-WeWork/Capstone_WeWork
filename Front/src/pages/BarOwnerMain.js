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

import ReservationCard from "../components/ReservationCardforOwner";
import ReviewCard from "../components/ReviewCard";

const BarOwnerMain = ({ route }) => {
  const [reservation, setReservation] = useState(true);
  const [review, setReviews] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const reservations = {
    "2023-11-20": [{ name: "예약 1" }, { name: "예약 2" }],
    "2023-11-21": [{ name: "예약 3" }],
    // 다른 날짜의 예약들...
  };

  const bar = route.params.bar;

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
    console.log(day);
  };

  //한글 요일 반환
  const dayOfWeek = (day) => {
    const date = new Date(day);
    const dateIdx = date.getDay();
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return daysOfWeek[dateIdx];
  };

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

            <Text>
              <AntDesign name="star" size={20} color="#1AB277" /> {bar.rating}
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
            />

            {/* {selectedDate && (
              <Agenda
                items={reservations}
                selected={selectedDate}
                renderItem={(item) => {
                  return (
                    <View>
                      <Text>{item.name}</Text>
                    </View>
                  );
                }}
              />
            )} */}

            <Text style={styles.semiTitle}>{selectedDate}({dayOfWeek(selectedDate)})</Text>

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
        )}

        {/* 리뷰 탭 */}
        {review && (
          <View style={styles.reviewContainer}>
            <ReviewCard />
          </View>
        )}
      </View>
    </ScrollView>
  );
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
