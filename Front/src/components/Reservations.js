import React from "react";
import { FlatList } from "react-native";

import ReservationCardforOwner from "./ReservationCardforOwner";
import ReservationCardforUser from "./ReservationCardforUser";

const Reservations = ({ data, isOwner }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        if (isOwner) {
          return <ReservationCardforOwner item={item} />;
        } else {
          return <ReservationCardforUser item={item} notFinished={false}/>;
        }
      }}
    />
  );
};

export default Reservations;
