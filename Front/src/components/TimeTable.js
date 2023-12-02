import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TimeTable = ({ onTimeChange, timeSlots }) => {
  //임시 시간 목록
  // const timeSlots = [
  //   { label: "17:00", value: "17:00", available: true },
  //   { label: "17:30", value: "17:30", available: true },
  //   { label: "18:00", value: "18:00", available: true },
  //   { label: "18:30", value: "18:30", available: true },
  //   { label: "19:00", value: "19:00", available: true },
  //   { label: "19:30", value: "19:30", available: true },
  //   { label: "20:00", value: "20:00", available: false },
  //   { label: "20:30", value: "20:30", available: false },
  //   { label: "21:00", value: "21:00", available: true },
  //   { label: "21:30", value: "21:30", available: false },
  //   { label: "22:00", value: "22:00", available: false },
  //   { label: "22:30", value: "22:30", available: false },
  //   { label: "23:00", value: "23:00", available: false },
  //   { label: "23:30", value: "23:30", available: false },
  //   { label: "24:00", value: "24:00", available: false },
  // ];

  // const timeSlots = [
  //   { label: "17:00", available: true },
  //   { label: "17:30", available: true },
  //   { label: "18:00", available: true },
  //   { label: "18:30", available: true },
  //   { label: "19:00", available: true },
  //   { label: "19:30", available: true },
  //   { label: "20:00", available: false },
  //   { label: "20:30", available: false },
  //   { label: "21:00", available: true },
  //   { label: "21:30", available: false },
  //   { label: "22:00", available: false },
  //   { label: "22:30", available: false },
  //   { label: "23:00", available: false },
  //   { label: "23:30", available: false },
  //   { label: "24:00", available: false },
  // ];

  const [isStartTimeSelected, setIsStartTimeSelected] = useState(false);
  const [startTime, setStartTime] = useState();
  const [lastTime, setLastTime] = useState();
  const [selectedTimes, setSelectedTimes] = useState([]);

  useEffect(() => {
    if (startTime && lastTime) {
      const result = startTime + " - " + lastTime;
      onTimeChange(result);
    }
  }, [startTime, lastTime, onTimeChange]);

  const handleTimeChange = (selectedTime) => {
    const selectedIndex = timeSlots.findIndex(
      (slot) => slot.label === selectedTime
    );

    if (!isStartTimeSelected) {
      setStartTime(selectedTime);
      setLastTime("00:00");
      setIsStartTimeSelected(true);
      setSelectedTimes([selectedTime]);
    } else {
      // 마지막 시간을 설정하기 전에 비활성화된 시간이 있는지 확인
      const isUnavailableTimeInBetween = timeSlots
        .slice(
          timeSlots.findIndex((slot) => slot.label === startTime) + 1,
          selectedIndex
        )
        .some((slot) => !slot.available);

      if (isUnavailableTimeInBetween) {
        // 비활성화된 시간이 있으면 마지막 시간을 설정하지 않고 시작 시간을 업데이트
        setStartTime(selectedTime);
        setSelectedTimes([selectedTime]);
      } else {
        // 마지막 시간을 설정하고 상태를 초기화
        const startDateTime = new Date(`2023-10-10T${startTime}:00`);
        const selectedDateTime = new Date(`2023-10-10T${selectedTime}:00`);

        if (selectedDateTime < startDateTime) {
          // 선택된 시간이 시작 시간보다 빠르면 시작 시간으로 설정
          setStartTime(selectedTime);
          setLastTime("00:00");
          setSelectedTimes([selectedTime]);
        } else {
          //선택된 시간 + 30분
          selectedDateTime.setMinutes(selectedDateTime.getMinutes() + 30);
          const formattedTime =
            selectedDateTime.getMinutes() < 10
              ? `0${selectedDateTime.getMinutes()}`
              : selectedDateTime.getMinutes();
          setLastTime(selectedDateTime.getHours() + ":" + formattedTime);
          setIsStartTimeSelected(false);

          //선택된 시간구간 색깔 바꿔주기 위해 리스트에 추가
          const selectedIndices = [
            timeSlots.findIndex((slot) => slot.label === startTime),
            timeSlots.findIndex((slot) => slot.label === selectedTime),
          ];
          const newSelectedTimes = timeSlots
            .slice(
              Math.min(...selectedIndices),
              Math.max(...selectedIndices) + 1
            )
            .map((slot) => slot.label);
          setSelectedTimes(newSelectedTimes);
          setIsStartTimeSelected(false);
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
                backgroundColor: selectedTimes.includes(timeSlot.label)
                  ? "#1AB277"
                  : timeSlot.available
                  ? "#E0F7ED"
                  : "#D9D9D9",
              },
            ]}
            onPress={() => handleTimeChange(timeSlot.label)}
            disabled={!timeSlot.available}
          >
            <Text
              style={[
                styles.timeSlotText,
                {
                  color: selectedTimes.includes(timeSlot.label)
                    ? "#ffffff"
                    : timeSlot.available
                    ? "#393E47"
                    : "#ffffff",
                },
              ]}
            >
              {timeSlot.label}
            </Text>
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
    paddingVertical: 10,
    marginVertical: 10,
    backgroundColor: "#F9FAFC",
    borderWidth: 1,
    borderColor: "#E9EAEC",
    borderRadius: 8,
  },
  timeSlotsContainer: {
    width: "100%",
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
    fontWeight: "500",
  },
});

export default TimeTable;
