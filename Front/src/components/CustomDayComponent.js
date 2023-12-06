import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const CustomDayComponent = ({ data, date, state, onDayPress }) => {
  // const reservations = {
  //   "2023-12-5": [{ name: "예약 1" }, { name: "예약 2" }],
  //   "2023-12-6": [{ name: "예약 3" }],
  //   // 다른 날짜의 예약들...
  // };

  const dateStr = date.dateString;
  const numOfEvents = data[dateStr] ? data[dateStr] : 0;

  return (
    <TouchableOpacity 
      style={{ alignItems: 'center' }} 
      onPress={() => onDayPress(date)}
    >
      <Text style={{ textAlign: 'center', color: state === 'today' ? 'blue' : 'black' }}>
        {date.day}
      </Text>
      {numOfEvents > 0 && (
        <View style={styles.eventDot}>
          <Text style={styles.eventDotText}>{numOfEvents}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    // 기존 스타일...
    eventDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#1AB277',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 2,
    },
    eventDotText: {
      color: 'white',
      fontSize: 10,
    },
    // 기타 스타일...
  });

export default CustomDayComponent;
