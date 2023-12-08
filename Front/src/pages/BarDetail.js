import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import location from "../../assets/location.png";
import star from "../../assets/star.png";
import timeIcon from "../../assets/time.png";
import telephone from "../../assets/telephone.png";

import Menu from "../components/Menu";
import TimeTable from "../components/TimeTable";
import GptDetail from "../components/GptDetail";
import Reviews from "../components/Reviews";

import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsByPub } from "../reducers/reviewReducer";
import { fetchTimetable } from "../reducers/timetableReducer";
import Carousel from "../components/Carousel";
import Accordion from "../components/Accordion";

const BarDetail = ({ route }) => {
  const dispatch = useDispatch();

  const bar = route.params.bar;
  const selectedDate = route.params.selectedDate;
  const numberOfPeople = route.params.numberOfPeople;
  const reviews = useSelector((state) => state.review.data);
  const timetable = useSelector((state) => state.timetable.data);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("시작시간과 종료시간을 선택해주세요");
  const [timeIdx, setTimeIdx] = useState([]);
  const [btnActive, setBtnActive] = useState(false);

  const [menu, setMenu] = useState(true);
  const [review, setReviews] = useState(false);

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

  const MovingBar = useRef(new Animated.Value(38)).current;
  const barWidth = useRef(new Animated.Value(110)).current;

  const navigation = useNavigation();

  const onMenu = () => {
    setMenu(true);
    setReviews(false);
  };

  const onReview = () => {
    setMenu(false);
    setReviews(true);
  };

  useEffect(() => {
    const date = "2023-12-04"; // 임시코드 selectedDate로 바꿔야함
    dispatch(fetchReviewsByPub(bar.pubName));
    dispatch(fetchTimetable({ pubName: bar.pubName, date: date }));
  }, []);

  useEffect(() => {
    // 상태에 따라 바 위치를 조절
    if (menu) {
      Animated.timing(MovingBar, {
        toValue: 5,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(barWidth, {
        toValue: 75,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (review) {
      Animated.timing(MovingBar, {
        toValue: 195, // 원하는 위치로 바 이동
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(barWidth, {
        toValue: 43,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [menu, review, MovingBar]);

  const handleTimeChange = (selectTime) => {
    setTime(selectTime);
    console.log(time);
    if (selectTime.charAt(selectTime.length - 3) === ":") {
      setBtnActive(true);
    }
  };

  const openDatepicker = () => {
    // openMode("date");
  };

  const onChangeText = (text) => {
    setText(text);
  };

  //한글 요일 반환
  const dayOfWeek = (dateIdx) => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return daysOfWeek[dateIdx];
  };

  const localeDate = (date) => {
    const result = `${date.toLocaleDateString()}(${dayOfWeek(date.getDay())})`;
    // setReservDate(result);
    return result;
  };

  const navigateToOrder = () => {
    const splitTimes = time.split(" - ");

    const reservationDetails = {
      pubName: bar.pubName,
      pubImage: bar.pubImages[1],
      reservDate: selectedDate,
      people: numberOfPeople,
      reserveTime: time,
      timeIdx: [
        timetable.findIndex((time) => time.label === splitTimes[0]),
        timetable.findIndex((time) => time.label === splitTimes[1]),
      ],
    };
    console.log("bardetailnavigate", reservationDetails);
    navigation.navigate("결제하기", reservationDetails);
  };

  console.log(bar.pubImages);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Carousel images={bar.pubImages.slice(1)} />
        </View>

        {/* 타이틀 */}
        <View style={styles.contentContainer}>
          <View style={styles.topContainer}>
            <View style={styles.addressContainer}>
              <Image
                source={location}
                style={styles.iconImg}
                resizeMode="contain"
              />
              <Text style={styles.address}>{bar.pubAddress}</Text>
            </View>
            <View style={styles.tagContainer}>
              {bar.hashTags.map((tag, index) => (
                <Text key={index} style={styles.tag}>
                  {tag}{" "}
                </Text>
              ))}
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{bar.pubName}</Text>
            </View>
          </View>

          <View style={styles.introContainer}>
            <Accordion description={bar.pubDescription} />
          </View>

          <GptDetail></GptDetail>

          {/* 상세정보 */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailTopContainer}>
              <View style={styles.ratingContainer}>
                <Image
                  source={star}
                  style={styles.starImg}
                  resizeMode="contain"
                />
                <Text style={styles.rating}>{bar.rating}</Text>
              </View>
              <View style={styles.deviderLine}></View>
              <Text style={styles.entryData}>총 {bar.maxSeats}석</Text>
            </View>
            <View style={styles.openTimeContainer}>
              <Image
                source={timeIcon}
                style={styles.iconImg}
                resizeMode="contain"
              />
              <Text style={styles.entryTitle}>영업시간</Text>
              <Text style={styles.entryData}>
                {bar.startTime} ~ {bar.endTime}
              </Text>
            </View>
            <View style={styles.phoneContainer}>
              <Image
                source={telephone}
                style={styles.iconImg}
                resizeMode="contain"
              />

              <Text style={styles.entryTitle}>전화번호</Text>
              <Text style={styles.entryData}>{bar.pubPhonenum}</Text>
            </View>
          </View>

          <View style={styles.incontentBorderLine}></View>

          <View style={styles.resrvInfoContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.entryTitle}>예약일</Text>
              <TouchableOpacity
                onPress={openDatepicker}
                style={styles.datePicker}
              >
                <Text style={styles.entryData}>
                  {selectedDate}
                  {/* {date.toLocaleDateString()}
                  &#40;{dayOfWeek(date.getDay())}&#41; */}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.peopleContainer}>
              <Text style={styles.entryTitle}>인원수</Text>
              <Text style={styles.entryData}>{numberOfPeople}명</Text>
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.entryTitle}>예약시간</Text>
              <Text style={styles.timeData}>{time}</Text>
            </View>
            <TimeTable onTimeChange={handleTimeChange} timeSlots={timetable} />
          </View>
        </View>

        <View style={styles.outcontentBorderLine}></View>

        <View style={styles.content}>
          <View style={styles.menuContainer}>
            <View style={styles.tabmenu}>
              <View style={styles.tabContainer}>
                <TouchableOpacity onPress={onMenu}>
                  <Text
                    style={{
                      ...styles.menuTitle,
                      color: menu ? "#393E47" : "#9FA8B6",
                      marginBottom: 5,
                    }}
                  >
                    대표메뉴
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tabContainer}>
                <TouchableOpacity onPress={onReview}>
                  <Text
                    style={{
                      ...styles.menuTitle,
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
                marginBottom: 15,
                transform: [
                  {
                    translateX: MovingBar,
                  },
                ],
              }}
            ></Animated.View>

            <View style={styles.menuTitleLine}></View>
            {/* 대표메뉴 */}
            {menu && (
              <View style={styles.cardsContainer}>
                <Menu menu={bar.pubMenus[0]} />
                <Menu menu={bar.pubMenus[1]} />
              </View>
            )}
            {/* 리뷰 */}
            {/* {review && reviewData && ( */}
            {review && (
              <View style={styles.cardsContainer}>
                <Reviews reviews={reviews} isOwner={false} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.reserveButton,
            {
              backgroundColor: btnActive ? "#1AB277" : "#D9D9D9",
            },
          ]}
          disabled={!btnActive}
          onPress={navigateToOrder}
        >
          <Text style={styles.buttonText}>예약하기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    paddingBottom: 70,
  },
  imageContainer: {
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    width: "100%",
    padding: 25,
  },
  topContainer: {
    width: "100%",
    marginBottom: 20,
  },
  iconImg: {
    width: 18,
    height: 18,
    marginRight: 10,
    tintColor: "#6E757B",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  address: {
    color: "#858A8E",
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  tag: {
    padding: 5,
    paddingLeft: 8,
    marginRight: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#62676B",
    borderWidth: 1,
    borderColor: "#DCE0E3",
    borderRadius: 5,
  },
  titleContainer: {
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#393E47",
  },
  introContainer: {
    minHeight: 80,
    marginBottom: 0,
  },
  introduction: {
    color: "#7E8389",
  },

  detailsContainer: {
    marginTop: 10,
    flexDirection: "column",
  },
  detailTopContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starImg: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#1AB277",
  },
  rating: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#6F797F",
  },
  deviderLine: {
    height: "80%",
    marginHorizontal: 8,
    borderRightWidth: 1,
    borderColor: "#DDDEE0",
  },
  openTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  entryTitle: {
    paddingRight: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "#6F797F",
  },
  entryData: {
    color: "#393E47",
    fontWeight: "500",
  },

  incontentBorderLine: {
    width: "1",
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#D7DBDF",
  },

  outcontentBorderLine: {
    width: "100%",
    borderBottomWidth: 8,
    borderColor: "#E6EBEF",
  },

  resrvInfoContainer: {
    width: "100%",
    flexDirection: "column",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  datePicker: {},
  peopleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  timeData: {
    fontWeight: "bold",
    color: "#1FB077",
  },

  content: {
    margin: 16,
  },
  menuContainer: {
    width: "100%",
    marginVertical: 20,
  },
  tabmenu: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabContainer: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#393E47",
    paddingHorizontal: 8,
  },
  menuTitleLine: {
    height: 0,
    borderColor: "#393E47",
    borderWidth: 1,
  },
  cardsContainer: {
    maxWidth: "100%",
    marginTop: 10,
  },
  reservationContainer: {},
  requestContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    width: "80%",
    height: 40,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  timetable: {
    margin: 16,
  },
  timePicker: {
    width: "100%",
    height: 40,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowColor: "#000000",
      },
      android: {
        elevation: 10,
      },
    }),
  },
  reserveButton: {
    width: "90%",
    height: 50,
    marginVertical: 10,
    backgroundColor: "#1AB277",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    height: "100%",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#ffffff",
  },
});

export default BarDetail;
