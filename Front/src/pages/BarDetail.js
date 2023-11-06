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

const BarDetail = ({ route }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("date");
  const [time, setTime] = useState("11:00");
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");

  const bar = route.params.bar;

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
          <Text style={styles.title}>{bar.name}</Text>
          <View style={styles.ratingContainer}>
            <Image source={star} style={styles.starImg} resizeMode="contain" />
            <Text style={styles.rating}>{bar.rating}</Text>
          </View>
        </View>
        <Text style={styles.tags}>
          {bar.tags.map((tag, index) => (
            <Text key={index}>{tag}{" "}</Text>
          ))}
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={bar.image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <View style={styles.timetable}>
          <View style={styles.introContainer}>
            <Text>{bar.introduction}</Text>
          </View>

          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>대표메뉴</Text>
            <View style={styles.menuTitleLine}></View>
            <Menu menu={bar.menu[0]} />
            <Menu menu={bar.menu[0]} />
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
                </View>
                <TimeTable onTimeChange={handleTimeChange} />
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
  timeTitle: {},
  timeText: {
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
