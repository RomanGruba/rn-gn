import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

// const renderListItem = (value, numOfRound) => (
//   <View key={value} style={styles.listItem}>
//     <BodyText>#{numOfRound}</BodyText>
//     <BodyText>{value}</BodyText>
//   </View>
// );

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setcurrentGuess] = useState(initialGuess);
  // const [rounds, setRounds] = useState(0);
  const [pastGuesses, setpastGuesses] = useState([initialGuess.toString()]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don`t lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" }
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setcurrentGuess(nextNumber);
    // setRounds(currentRounds => currentRounds + 1);
    setpastGuesses(curPastGuesses => [
      nextNumber.toString(),
      ...curPastGuesses
    ]);
  };

  return (
    <View style={styles.screen}>
      <Text>Computer`s guess:</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="" white />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="" white />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(null, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 300,
    maxWidth: "80%"
  },
  listContainer: {
    width: Dimensions.get("window").width > 350 ? "60%" : "80%",
    flex: 1
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end"
  },
  listItem: {
    borderRightColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});

export default GameScreen;
