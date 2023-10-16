import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import simya from "../../assets/심야식당.jpeg";
import star from "../../assets/star.png";

import Menu from "../components/Menu";
import TimeTable from "../components/TimeTable";

const BarDetail = ({ bar }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("date");
  const [time, setTime] = useState("11:00");
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");

  const showReservationForm = () => {
    setShowForm(true);
  };

  const handleTimeChange = (selectTime) => {
    setTime(selectTime);
  };

  // Datepicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setOpen(false);
  };

  const openMode = (currentMode) => {
    setOpen(true);
    setMode(currentMode);
  };

  const openDatepicker = () => {
    openMode("date");
  };

  const onChangeText = (text) => {
    setText(text);
  };

  //한글 요일 반환
  const dayOfWeek = (dateIdx) => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return daysOfWeek[dateIdx];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTopContainer}>
          <Text style={styles.title}>백수씨 심야식당</Text>
          <View style={styles.ratingContainer}>
            <Image source={star} style={styles.starImg} resizeMode="contain" />
            <Text style={styles.rating}>4.3</Text>
          </View>
        </View>
        <Text style={styles.tags}>#이자카야 #분위기좋음 #안주맛있음</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={simya} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        <View style={styles.timetable}>
          <View style={styles.detailContainer}>
            <Text>
              저희 백수씨 심야식당은 사람들이 편하게 먹을 수 있는 안주거리와
              산지의 해산물을 위주로 부담되지 않는 가격대의 '실내포장마차' 를
              방향성으로 잡고 있습니다. 강원도 동해, 남해 서해 등의 현지 특산물,
              해산물 등을 산지 직송으로 당일 배송받아 서울에서 판매하는 해산물,
              퓨전음식 '소주집' 입니다. 육류 메뉴로는 가장 많이 나가는 '육전' 이
              있으며 해산물 요리로는 속초에서 직접 공수받아 조리하는 '홍게탕'
              '백합조개탕' , 서해 남해 등에서 공수받는 돌문어, 청어, 참소라,
              골뱅이 등등 메뉴판에는 없는 그날그날 들어온 해산물들을 직원 추천을
              통해 손님들에게 제공하며 옛 감성의 음악과 인테리어 안에 좋은
              추억을 가져갈 수 있는 소박한 식당입니다.
            </Text>
          </View>

          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>대표메뉴</Text>
            <View style={styles.menuTitleLine}></View>
            <Menu />
            <Menu />
          </View>

          <View style={styles.reservationContainer}>
            {showForm && (
              <>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateTitle}>날짜</Text>
                  <TouchableOpacity
                    onPress={openDatepicker}
                    style={styles.datePicker}
                  >
                    <Text style={styles.dateText}>
                      {date.toLocaleDateString()}
                      &#40;{dayOfWeek(date.getDay())}&#41;
                    </Text>
                  </TouchableOpacity>
                </View>
                {open && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display="calendar"
                    onChange={onChange}
                  />
                )}
                <View style={styles.timeContainer}>
                  <Text style={styles.timeTitle}>시간</Text>
                  <Text style={styles.timeText}>{time}</Text>
                  {/* <Picker
                    style={styles.timePicker}
                    selectedValue={time}
                    onValueChange={handleTimeChange}
                  >
                    <Picker.Item label="11:00" value="11:00" />
                    <Picker.Item label="12:00" value="12:00" />
                    <Picker.Item label="13:00" value="13:00" />
                    <Picker.Item label="14:00" value="14:00" />
                    <Picker.Item label="15:00" value="15:00" />
                    <Picker.Item label="16:00" value="16:00" />
                    <Picker.Item label="17:00" value="17:00" />
                    <Picker.Item label="18:00" value="18:00" />
                    <Picker.Item label="19:00" value="19:00" />
                    <Picker.Item label="20:00" value="20:00" />
                    <Picker.Item label="21:00" value="21:00" />
                    <Picker.Item label="22:00" value="22:00" />
                    <Picker.Item label="23:00" value="23:00" />
                  </Picker> */}
                  
                </View>
                <TimeTable onTimeChange={handleTimeChange}/>
                <View style={styles.requestContainer}>
                  <Text>요청사항</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(e) => onChangeText(e)}
                    value={text}
                    placeholder="요청사항을 입력해주세요."
                  />
                </View>
              </>
            )}
          </View>
          <Button
            title="예약하기"
            onPress={() => {
              // 예약하기 API 호출
              showReservationForm();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  headerContainer: {
    width: "100%",
    height: 140,
    padding: 30,
    backgroundColor: "lightgrey",
    marginBottom: 10,
  },
  headerTopContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 30,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
  },
  starImg: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  imageContainer: {
    width: "90%",
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 16,
  },
  tags: {
    fontSize: 14,
    fontWeight: "bold",
  },
  menuContainer: {
    width: "100%",
    backgroundColor: "lightgrey",
    marginVertical: 20,
    padding: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  menuTitleLine: {
    height: 0,
    borderColor: "black",
    borderWidth: 1,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateTitle: {},
  datePicker: {
    width: "90%",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "grey",
  },
  dateText: {},
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  timeTitle:{},
  timeText:{
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: "bold",
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
});

export default BarDetail;
