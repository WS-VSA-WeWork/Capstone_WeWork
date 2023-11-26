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
import ReviewCard from "../components/ReviewCard";

const BarDetail = ({ route }) => {
  const [date, setDate] = useState(new Date());
  // const [open, setOpen] = useState(false);
  // const [mode, setMode] = useState("date");
  const [time, setTime] = useState("시간을 선택해주세요");
  const [showForm, setShowForm] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [reservDate, setReservDate] = useState();

  const [menu, setMenu] = useState(true);
  const [review, setReviews] = useState(false);

  const MovingBar = useRef(new Animated.Value(38)).current;
  const barWidth = useRef(new Animated.Value(110)).current;

  const bar = route.params.bar;

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
    // 상태에 따라 바 위치를 조절
    if (menu) {
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
  }, [menu, review, MovingBar]);

  const showReservationForm = () => {
    setShowForm(true);
  };

  const handleTimeChange = (selectTime) => {
    setTime(selectTime);

    if (selectTime.charAt(selectTime.length - 3) === ":") {
      setBtnActive(true);
    }
  };

  // // Datepicker
  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setDate(currentDate);
  //   setOpen(false);
  // };

  // const openMode = (currentMode) => {
  //   setOpen(true);
  //   setMode(currentMode);
  // };

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
    const reservationDetails = {
      barName: bar.name,
      barImage: bar.image,
      reservdate: bar.date,
      people: bar.people,
      reservetime: time,
    };
    console.log(reservationDetails);
    navigation.navigate("결제하기", reservationDetails);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={bar.image} style={styles.image} resizeMode="cover" />
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
              <Text style={styles.address}>{bar.address}</Text>
            </View>
            <View style={styles.tagContainer}>
              {bar.tags.map((tag, index) => (
                <Text key={index} style={styles.tag}>
                  {tag}{" "}
                </Text>
              ))}
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{bar.name}</Text>
            </View>
          </View>

          <View style={styles.introContainer}>
            <Text style={styles.introduction} aria-expanded={true}>
              {bar.introduction}
            </Text>
          </View>

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
              <Text style={styles.entryData}>총 40석</Text>
            </View>
            <View style={styles.openTimeContainer}>
              {/* <Text style={styles.entryTitle}>영업시간</Text> */}
              <Image
                source={timeIcon}
                style={styles.iconImg}
                resizeMode="contain"
              />
              <Text style={styles.entryData}>오후 4:00 ~ 오전 4:00</Text>
            </View>
            <View style={styles.phoneContainer}>
              {/* <Text style={styles.entryTitle}>전화번호</Text> */}
              <Image
                source={telephone}
                style={styles.iconImg}
                resizeMode="contain"
              />
              <Text style={styles.entryData}>02-0000-0000</Text>
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
                  {bar.date}
                  {/* {date.toLocaleDateString()}
                  &#40;{dayOfWeek(date.getDay())}&#41; */}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.peopleContainer}>
              <Text style={styles.entryTitle}>인원수</Text>
              <Text style={styles.entryData}>{bar.people}명</Text>
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.entryTitle}>예약시간</Text>
              <Text style={styles.timeData}>{time}</Text>
            </View>
            <TimeTable onTimeChange={handleTimeChange} />
          </View>
        </View>

        <View style={styles.outcontentBorderLine}></View>

        <View style={styles.content}>
          <View style={styles.timetable}>
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
                  marginBottom: 10,
                  transform: [
                    {
                      translateX: MovingBar,
                    },
                  ],
                }}
              ></Animated.View>

              <View style={styles.menuTitleLine}></View>
              {menu && (
                <>
                  <Menu menu={bar.menu[0]} />
                  <Menu menu={bar.menu[0]} />
                </>
              )}
              {review && (
                <View style={styles.reviewContainer}>
                  <ReviewCard isOwner={false}/>
                </View>
              )}
            </View>

            <View style={styles.reservationContainer}>
              {showForm && (
                <>
                  {/* <View style={styles.requestContainer}>
                    <Text>요청사항</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(e) => onChangeText(e)}
                      value={text}
                      placeholder="요청사항을 입력해주세요."
                    />
                  </View> */}
                </>
              )}
            </View>
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
    height: 80,
    marginBottom: 40,
  },
  introduction: {
    color: "#7E8389",
  },

  detailsContainer: {
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
    padding: 16,
  },
  menuContainer: {
    width: "100%",
    marginVertical: 20,
  },
  tabmenu: {
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
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  menuTitleLine: {
    height: 0,
    borderColor: "#393E47",
    borderWidth: 1,
  },
  reviewContainer:{
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
