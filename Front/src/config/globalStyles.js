import { Dimensions } from "react-native";

export const colors = {
    mainGreen: "#1AB277",
    lightGreen: "#E0F7ED",
    black: "#393E47",
    grey: "#6E757B",
    lightGrey: "#7E8389",
    borderGrey: "#DCE0E3",
    borderLightGrey: "#E6EBEF",
    red: "#F62626",
};

export const basicDimensions = {
    height: 759,
    width: 411,
}

export const maxVw = (
    Dimensions.get('screen').width
);

export const height = ( //높이 변환
    Dimensions.get('screen').height *
    (1 / basicDimensions.height)
).toFixed(2);

export const width = (
    Dimensions.get('screen').width *
    (1 / basicDimensions.width)
).toFixed(2);