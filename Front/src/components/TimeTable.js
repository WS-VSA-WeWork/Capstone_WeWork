import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TimeTable = ({ onTimeChange }) => {
  //임시 시간 목록
  const timeSlots = [
    { label: "17:00", value: "17:00", available: true },
    { label: "17:30", value: "17:30", available: true },
    { label: "18:00", value: "18:00", available: true },
    { label: "18:30", value: "18:30", available: false },
    { label: "19:00", value: "19:00", available: false },
    { label: "19:30", value: "19:30", available: true },
    { label: "20:00", value: "20:00", available: false },
    { label: "20:30", value: "20:30", available: false },
    { label: "21:00", value: "21:00", available: true },
    { label: "21:30", value: "21:30", available: false },
    { label: "22:00", value: "22:00", available: false },
    { label: "22:30", value: "22:30", available: false },
    { label: "23:00", value: "23:00", available: false },
    { label: "23:30", value: "23:30", available: false },
    { label: "24:00", value: "24:00", available: false },
  ];

  const [isStartTimeSelected, setIsStartTimeSelected] = useState(false);
  const [startTime, setStartTime] = useState();
  const [lastTime, setLastTime] = useState();
  const [selectedTimes, setSelectedTimes] = useState([]);

  useEffect(() => {
    if(startTime && lastTime){
      const result = startTime + " - " + lastTime;
      onTimeChange(result);
    }
  },[startTime, lastTime, onTimeChange])

  const handleTimeChange = (selectedTime) => {
    const selectedIndex = timeSlots.findIndex(
      (slot) => slot.value === selectedTime
    );
    if (!isStartTimeSelected) {
      setStartTime(selectedTime);
      setIsStartTimeSelected(true);
      setSelectedTimes([selectedTime]);
    } else {
      // 마지막 시간을 설정하기 전에 비활성화된 시간이 있는지 확인
      const isUnavailableTimeInBetween = timeSlots
        .slice(
          timeSlots.findIndex((slot) => slot.value === startTime) + 1,
          selectedIndex
        )
        .some((slot) => !slot.available);

      if (isUnavailableTimeInBetween) {
        // 비활성화된 시간이 있으면 마지막 시간을 설정하지 않고 시작 시간을 업데이트
        setStartTime(selectedTime);
        setSelectedTimes([selectedTime]);
      } else {  // 마지막 시간을 설정하고 상태를 초기화
        const startDateTime = new Date(`2023-10-10T${startTime}:00`);
        const selectedDateTime = new Date(`2023-10-10T${selectedTime}:00`);

        if (selectedDateTime < startDateTime) {
          // 선택된 시간이 시작 시간보다 빠르면 시작 시간으로 설정
          setStartTime(selectedTime);
          setLastTime("");
          setSelectedTimes([selectedTime]);
        } else {
          //선택된 시간 + 30분
          selectedDateTime.setMinutes(selectedDateTime.getMinutes() + 30);
          const formattedTime = selectedDateTime.getMinutes() < 10 ? `0${selectedDateTime.getMinutes()}` : selectedDateTime.getMinutes();
          console.log(selectedDateTime.getHours() + ":" + formattedTime);
          setLastTime(selectedDateTime.getHours() + ":" + formattedTime);
          setIsStartTimeSelected(false);

          //선택된 시간구간 색깔 바꿔주기 위해 리스트에 추가
          const selectedIndices = [
            timeSlots.findIndex((slot) => slot.value === startTime),
            timeSlots.findIndex((slot) => slot.value === selectedTime),
          ];
          const newSelectedTimes = timeSlots
            .slice(
              Math.min(...selectedIndices),
              Math.max(...selectedIndices) + 1
            )
            .map((slot) => slot.value);
          setSelectedTimes(newSelectedTimes);
        }
      }
    }
  };

  return (
    <View style={styles.timeContainer}>
      <View style={styles.timeSlotsContainer}>
        {timeSlots.map((timeSlot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeSlot,
              {
                backgroundColor: selectedTimes.includes(timeSlot.value)
                  ? "#FFA07A"
                  : timeSlot.available
                  ? "#FFD88E"
                  : "#D9D9D9",
              },
            ]}
            onPress={() => handleTimeChange(timeSlot.value)}
            disabled={!timeSlot.available}
          >
            <Text style={styles.timeSlotText}>{timeSlot.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 10,
    marginVertical: 10,
    backgroundColor: "#ECECEC",
  },
  timeSlotsContainer: {
    width: "91%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  timeSlot: {
    padding: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 5,
  },
  timeSlotText: {
    fontSize: 16,
  },
});

export default TimeTable;
