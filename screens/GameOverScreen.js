import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          // source={require("../assets/images/success.png")}
          source={{
            uri:
              "https://upload.wikimedia.org/wikipedia/commons/a/ac/Crystal_Project_success.png"
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{" "}
          <Text style={styles.highlight}> {props.roundsNumber} </Text> rounds to
          guess number <Text style={styles.highlight}>{props.userNumber}</Text>!
        </BodyText>
      </View>
      <MainButton onPress={props.onNewGame}>NEW GAME</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    width: "40%",
    height: 100,
    marginVertical: 20,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  highlight: {
    fontWeight: "bold",
    color: Colors.primary
  },
  resultContainer: {
    marginVertical: 10,
    marginHorizontal: 30
  },
  resultText: {
    textAlign: "center"
  }
});

export default GameOverScreen;
