import React from "react";
import { View, FlatList, Text } from "react-native";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviews, isOwner }) => {
  return (
    <FlatList
      data={reviews}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => 
        <ReviewCard 
        item={item} 
        isOwner={isOwner} 
        />
      }
    />
  );
};

export default Reviews;
