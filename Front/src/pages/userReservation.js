import React, { Component, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
  TextInput,
  Animated,
  Pressable,
  Modal,
  Keyboard,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function UserReservation() {
  const [servicing, setServicing] = useState(true);
  const [reservation, setReservation] = useState(false);
  const [igakaya, setIgakaya] = useState(false);
  const [chicken, setChicken] = useState(false);
  const [all, setAll] = useState(true);
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [haveReservation, setHaveReservation] = useState(false);
  const [typing, setTyping] = useState(false);
  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [value, onChangeText] = useState("환불 사유를 입력해주세요");
  const igakayaCategory = () => {
    setIgakaya(true);
    setChicken(false);
    setAll(false);
  };

  const chickenCategory = () => {
    setIgakaya(false);
    setChicken(true);
    setAll(false);
  };

  const allCategory = () => {
    setIgakaya(false);
    setChicken(false);
    setAll(true);
  };

  const service = () => {
    setServicing(true);
    setReservation(false);
  };

  const myreservation = () => {
    setServicing(false);
    setReservation(true);
  };

  const showDateTimePicker = () => {
    setDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisible(false);
  };

  const [stringDate, setStringDate] = useState(
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
  );

  const today = new Date();

  const handleDatePicked = (date) => {
    console.log("A date has been picked:", date);

    setStringDate(
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );

    // console.log(stringDate);
    hideDateTimePicker();
    setDate(date);
  };

  const [numberOfPeople, setNumberOfPeople] = useState(0);
  useEffect(() => console.log(numberOfPeople), [numberOfPeople]);

  const [barPosition, setBarPosition] = useState(0);
  const MovingBar = useRef(new Animated.Value(38)).current;
  const barWidth = useRef(new Animated.Value(110)).current;

  useEffect(() => {
    // 상태에 따라 바 위치를 조절
    if (servicing) {
      Animated.timing(MovingBar, {
        toValue: 38,
        duration: 500,
        useNativeDriver: false,
      }).start();
      Animated.timing(barWidth, {
        toValue: 110,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else if (reservation) {
      Animated.timing(MovingBar, {
        toValue: 165, // 원하는 위치로 바 이동
        duration: 500,
        useNativeDriver: false,
      }).start();
      Animated.timing(barWidth, {
        toValue: 93,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [servicing, reservation, MovingBar]);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // 화면 상태창//
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#F1F2F6" }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={service}>
            <Text
              style={{
                ...styles.mainbtn,
                color: servicing ? "black" : "#9FA8B6",
              }}
            >
              대관서비스
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={myreservation}>
            <Text
              style={{
                ...styles.mainbtn,
                color: reservation ? "black" : "#9FA8B6",
              }}
            >
              내 예약 +
            </Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={{
            backgroundColor: "#24242F",
            width: barWidth,
            height: 3,
            marginTop: 4,
            transform: [
              {
                translateX: MovingBar,
              },
            ],
          }}
        ></Animated.View>
      </View>

      <View style={styles.category}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              ...styles.categorybtn,
              backgroundColor: igakaya ? "#282834" : "white",
            }}
          >
            <Button
              title="이자카야"
              color={igakaya ? "white" : "#68707D"}
              onPress={igakayaCategory}
            />
          </View>
          <View
            style={{
              ...styles.categorybtn,
              backgroundColor: chicken ? "#282834" : "white",
            }}
          >
            <Button
              title="치킨집"
              color={chicken ? "white" : "#68707D"}
              onPress={chickenCategory}
            />
          </View>
          <View
            style={{
              ...styles.categorybtn,
              backgroundColor: all ? "#282834" : "white",
            }}
          >
            <Button
              title="ALL +"
              color={all ? "white" : "#68707D"}
              onPress={allCategory}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.header2}>
        <View style={styles.calender}>
          <AntDesign name="calendar" size={24} color="black" />
          <Button
            title={stringDate}
            onPress={showDateTimePicker}
            color="black"
          />
          <DateTimePicker
            mode="date"
            isVisible={isDateTimePickerVisible}
            onConfirm={handleDatePicked}
            onCancel={hideDateTimePicker}
          />
        </View>

        <View style={styles.numberOfPeople}>
          <Ionicons name="people" size={24} color="black" />
          <TextInput
            maxLength={500}
            editable
            onChangeText={(number) => setNumberOfPeople(number)}
            style={{ padding: 10 }}
            placeholder={
              numberOfPeople > 4 ? `{numberOfPeople} 명` : "인원을 선택해주세요"
            }
            inputMode="numeric"
            keyboardType="numeric"
          ></TextInput>
        </View>
      </View>
      {/* 대관서비스 및 내예약 서비스 페이지 */}
      <ScrollView>
        <View style={styles.storeContainer}>
          <ScrollView>
            {servicing ? (
              <View>
                <View style={styles.location}>
                  <SimpleLineIcons
                    name="location-pin"
                    size={24}
                    color="black"
                  />
                  <Text style={{ fontSize: 18, fontWeight: 700 }}>동국대</Text>
                </View>

                <View style={styles.timePeople}>
                  {handleDatePicked && numberOfPeople > 4 ? (
                    <View style={{ gap: 5 }}>
                      <Text style={styles.timePeopleTitle}>
                        함께 할 시간과 인원수
                      </Text>
                      <Text style={styles.timePeopleContent}>
                        {stringDate + " " + " / " + numberOfPeople + " 명"}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.timePeopleTitle}>
                      시간과 인원수를 선택해주세요 !
                    </Text>
                  )}
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      paddingHorizontal: 30,
                    }}
                  >
                    현재 예약 가능한 술집
                  </Text>
                </View>
                <View>
                  {igakaya && (
                    <View style={styles.store}>
                      <Image
                        source={require("../../assets/백수씨.png")}
                        style={styles.picture}
                      />
                      <View style={styles.content}>
                        <Text>이자카야</Text>
                        <Text>#이자카야 #분위기 좋음</Text>
                        <Text>새벽 3시 마감</Text>
                      </View>
                    </View>
                  )}

                  {chicken && (
                    <View style={styles.store}>
                      <Image
                        source={require("../../assets/술무로.png")}
                        style={styles.picture}
                      />
                      <View style={styles.content}>
                        <Text>치킨</Text>
                        <Text>#이자카야 #분위기 좋음</Text>
                        <Text>새벽 3시 마감</Text>
                      </View>
                    </View>
                  )}
                  {all && (
                    <View style={styles.listContainer}>
                      <View style={styles.listCard}>
                        <View>
                          <Image
                            source={require("../../assets/백수씨.png")}
                            style={styles.picturetmp}
                          />
                        </View>
                        <View>
                          <Text>백수씨 심야식당</Text>
                          <Text>"별"</Text>
                          <Text>0.5</Text>
                        </View>
                        <View>
                          <Text>시간</Text>
                          <Text>총좌석</Text>
                        </View>
                        <View>
                          <Text>#이자카야 #분위기좋음</Text>
                        </View>
                      </View>
                      <View style={styles.store}>
                        <Image
                          source={require("../../assets/백수씨.png")}
                          style={styles.picture}
                        />
                        <View style={styles.content}>
                          <Text>백수씨 심야식당</Text>
                          <Text>#이자카야 #분위기 좋음</Text>
                          <Text>새벽 3시 마감</Text>
                        </View>
                      </View>
                      <View style={styles.store}>
                        <Image
                          source={require("../../assets/술무로.png")}
                          style={styles.picture}
                        />
                        <View style={styles.content}>
                          <Text>술무로</Text>
                          <Text>#이자카야 #분위기 좋음</Text>
                          <Text>새벽 3시 마감</Text>
                        </View>
                      </View>
                      <View style={styles.store}>
                        <Image
                          source={require("../../assets/술무로.png")}
                          style={styles.picture}
                        />
                        <View style={styles.content}>
                          <Text>술무로</Text>
                          <Text>#이자카야 #분위기 좋음</Text>
                          <Text>새벽 3시 마감</Text>
                        </View>
                      </View>
                      <View style={styles.store}>
                        <Image
                          source={require("../../assets/술무로.png")}
                          style={styles.picture}
                        />
                        <View style={styles.content}>
                          <Text>술무로</Text>
                          <Text>#이자카야 #분위기 좋음</Text>
                          <Text>새벽 3시 마감</Text>
                        </View>
                      </View>
                      <View style={styles.store}>
                        <Image
                          source={require("../../assets/술무로.png")}
                          style={styles.picture}
                        />
                        <View style={styles.content}>
                          <Text>술무로</Text>
                          <Text>#이자카야 #분위기 좋음</Text>
                          <Text>새벽 3시 마감</Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <ScrollView>
                {haveReservation ? (
                  <View style={styles.myreservationContainer}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        paddingHorizontal: 30,
                      }}
                    >
                      나의 예약일정
                    </Text>
                    <Pressable onPress={() => setModalVisible(true)}>
                      <View style={styles.reservationListContainer}>
                        <View style={styles.reservationList1}>
                          <Text style={styles.reservationListTitle}>
                            백수씨 심야식당
                          </Text>
                          <Text style={styles.reservationListLastTime}>
                            19시간 전
                          </Text>
                        </View>
                        <View style={styles.reservationList2}>
                          <Text>2023-09-20</Text>
                          <Text>19:00</Text>
                        </View>
                        <View style={styles.reservationList3}>
                          <Text>예약금</Text>
                          <Text>56000원</Text>
                        </View>
                      </View>
                    </Pressable>

                    <View style={styles.reservationPast}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          marginLeft: 30,
                          paddingRight: 10,
                          textAlign: "center",
                        }}
                      >
                        나의 대관 내역
                      </Text>
                      <Text style={styles.reservationPastNum}>5</Text>
                    </View>
                    <View style={styles.reservationListContainer}>
                      <View style={styles.reservationList1}>
                        <Text style={styles.reservationListTitle}>
                          백수씨 심야식당
                        </Text>
                        <Text style={styles.reservationListLastTime}>
                          19시간 전
                        </Text>
                      </View>
                      <View style={styles.reservationList2}>
                        <Text>2023-09-20</Text>
                        <Text>19:00</Text>
                      </View>
                      <View style={styles.reservationList3}>
                        <Text>예약금</Text>
                        <Text>56000원</Text>
                      </View>
                    </View>

                    <Button
                      title="지금 예약하러가기"
                      color={"black"}
                      onPress={() => setHaveReservation(false)}
                    />
                  </View>
                ) : (
                  <View style={styles.myreservationContainer}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginHorizontal: 30,
                      }}
                    >
                      나의 예약일정
                    </Text>
                    <View style={styles.myreservation}>
                      <FontAwesome
                        name="calendar-plus-o"
                        size={50}
                        color="white"
                      />
                      <View style={styles.myreservationTextContainer}>
                        <Text style={styles.myreservationText}>
                          예약된 대관일정이 없어요.
                        </Text>
                        <Text style={styles.myreservationText}>
                          예약을 진행해주세요 !
                        </Text>
                      </View>
                      <View style={styles.myreservationButton}>
                        <Button
                          title="지금 예약하러가기"
                          color={"black"}
                          onPress={() => setHaveReservation(true)}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </ScrollView>
            )}
          </ScrollView>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {/* <TouchableWithoutFeedback
          onPress={() => setModalVisible(false)}
          style={styles.backdrop}
        /> */}

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>식당 정보</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Feather name="x" size={25} color="black" />
              </Pressable>
            </View>
            <View style={styles.modalRestaurantTop}>
              <Text style={styles.modalRestaurantName}>백수씨 심야식당</Text>
              <Text style={styles.modalRestaurantTime}>19시간 전</Text>
            </View>
            <View style={styles.modalRestaurantMiddle}>
              <Text style={styles.modalRestaurantDate}>2023-09-20</Text>
              <Text style={styles.modalRestaurantTime}>19:00</Text>
            </View>
            <View style={styles.modalRestaurantBottom}>
              <Text style={styles.modalRestaurantMoney}>예약금</Text>
              <Text style={styles.modalRestaurantMoney}>56000원</Text>
            </View>
            <View style={{}}>
              <TextInput
                style={styles.want}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="환불사유를 입력해주세요"
                multiline
                numberOfLines={5}
                maxLength={40}
                onPressin={() => setTyping(true)}
              ></TextInput>
            </View>
            <View style={styles.wantButton}>
              <Button
                color={"white"}
                onPress={(() => setTyping(false), () => setModalVisible(false))}
                style={styles.wantButton}
                title="환불 요청하기"
              ></Button>
            </View>
            <View
              style={{
                height: typing ? 0 : keyboardHeight - 20,
              }}
            ></View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    paddingHorizontal: 40,
    paddingTop: 80,
    flexDirection: "row",
    gap: 20,
    backgroundColor: "#F1F2F6",
    alignItems: "center",
  },
  header2: {
    flexDirection: "row",
    backgroundColor: "#F1F2F6",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 30,
    paddingBottom: 15,
  },
  mainbtn: {
    fontSize: 25,
    fontWeight: "600",
    alignItems: "center",
  },
  category: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: "#F1F2F6",
  },
  categorybtn: {
    marginHorizontal: 10,
    fontSize: 50,
    fontWeight: "bold",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#282834",
  },
  categoryText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  store: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0F7ED",
    marginHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  storeContainer: {
    // paddingTop: 50,
  },
  content: {
    paddingLeft: 20,
  },
  calender: {
    // marginHorizontal: 30,
    // marginTop: 15,
    // backgroundColor: "orange",
    flexDirection: "row",
    width: 150,
    alignItems: "center",
  },
  numberOfPeople: {
    // marginHorizontal: 30,
    // marginTop: 15,
    // paddingHorizontal: 10,
    // backgroundColor: "orange",
    width: 130,
    flexDirection: "row",
    alignItems: "center",
  },
  timePeople: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: "#1F7457",
    marginHorizontal: 30,
    marginTop: 0,
    marginBottom: 50,
    borderRadius: 10,
    gap: 10,
  },
  timePeopleTitle: {
    color: "white",
  },
  timePeopleContent: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  location: {
    flexDirection: "row",
    paddingHorizontal: 30,
    alignItems: "center",
    paddingVertical: 10,
    gap: 8,
    marginTop: 30,
  },
  myreservationContainer: {
    marginVertical: 30,
  },
  myreservation: {
    justifyContent: "center",
    alignItems: "center",
    paddubgHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: "#1F7457",
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 50,
    borderRadius: 10,
    gap: 17,
  },
  myreservationTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  myreservationText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  myreservationButton: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  reservationListContainer: {
    backgroundColor: "#E0F7ED",
    marginHorizontal: 30,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 10,
  },
  reservationListTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },

  reservationListLastTime: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
  reservationList1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reservationList2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reservationList3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reservationPast: {
    flexDirection: "row",
    gap: 5,
    marginTop: 40,
    marginTop: 30,
    alignItems: "center",
  },
  reservationPastNum: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#109B1E",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#F1F2F6",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: "black",
  },
  modalTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: "bold",
  },
  modalRestaurantTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  modalRestaurantName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  modalRestaurantTime: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
  modalRestaurantMiddle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  modalRestaurantDate: {
    fontSize: 15,
    fontWeight: "bold",
  },
  modalRestaurantTime: {
    fontSize: 15,
    fontWeight: "bold",
  },
  modalRestaurantBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  modalRestaurantMoney: {
    marginTop: 3,
    fontSize: 17,
    fontWeight: "bold",
  },
  want: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    height: 150,
    margin: 12,
    width: 340,
    borderWidth: 1,
    backgroundColor: "#F9FAFC",
    borderColor: "#F9FAFC",
  },
  wantButton: {
    color: "white",
    backgroundColor: "#1AB277",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 20,
    margintop: 20,
    height: 50,
    width: 320,
    justifyContent: "center",
    alignItems: "center",
  },
  // backdrop: {
  //   backgroundColor: "rgba(0, 0, 0, 0.5)", // 어두운 배경 색상 및 투명도 조절
  //   position: "absolute",
  //   top: 0,
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  // },
  listCard: {
    width: "90%",
    backgroundColor: "red",
  },
  picturetmp: {
    resizeMode: "cover",
    width: "100%",
  },
  listContainer: { justifyContent: "center", alignItems: "center" },
});