import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/colors.js";

const Header = props => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid
        })
      }}
    >
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  headerIOS: {
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1
  },
  headerAndroid: {
    backgroundColor: Colors.primary
  },

  headerTitle: {
    color: "black",
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: Platform.OS === "ios" ? Colors.primary : "white"
  }
});

export default Header;
