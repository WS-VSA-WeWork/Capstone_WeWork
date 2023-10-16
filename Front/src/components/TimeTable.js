import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TimeTable = ({onTimeChange}) => {

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

  const handleTimeChange = (selectTime) => {
    onTimeChange(selectTime);
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
                backgroundColor: timeSlot.available ? "#FFD88E" : "#b3b3b3",
              },
            ]}
            onPress={() => handleTimeChange(timeSlot.value)}
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
    backgroundColor: "#e1e1e1",
  },
  timeSlotsContainer: {
    width: "90%",
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
