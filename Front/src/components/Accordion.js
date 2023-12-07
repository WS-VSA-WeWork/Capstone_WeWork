import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Accordion = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const descIsLong = description.length > 100;
  
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {isExpanded ? description : `${description.substring(0, 100)}`}
          {descIsLong && (
          <Text onPress={toggleExpand} style={styles.button}>
            <Text style={styles.buttonText}>{isExpanded ? " 접기" : "...더보기"}</Text>
          </Text>
        )}
        </Text>
        
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: 10,
    },
    text: {
      color: "#7E8389",
    },
    button: {
      marginLeft: 5, // 버튼과 텍스트 사이 간격
    },
    buttonText: {
      color: "#1AB277",
    },
  });
  

export default Accordion;
