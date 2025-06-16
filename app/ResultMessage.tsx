import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";

interface ResultMessageProps {
  selectedSector: number | string | undefined;
  bidNumber: number | string | undefined;
  onPlayAgain: () => void;
  onExit: () => void;
  setBalance: (arg: (prev: number) => number) => void;
  coins: number | boolean;
}

const ResultMessage = ({ selectedSector, bidNumber, onPlayAgain, onExit, setBalance, coins }: ResultMessageProps) => {
  const isWinner = selectedSector === bidNumber;

  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isWinner) {
      setBalance((balance: number) => balance + (typeof coins === "number" ? coins * coins : 0));
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      setBalance((balance: number) => balance - (typeof coins === "number" ? coins : 0));
    }
  }, [isWinner, bounceAnim]);

  return (
    <View style={[styles.card, isWinner ? styles.winCard : styles.loseCard]}>
      {isWinner ? (
        <>
          <Animated.Text style={[styles.title, { transform: [{ scale: bounceAnim }] }]}>🎉 You Won! 🎉</Animated.Text>
          <Text style={styles.message}>
            Boom! <Text style={styles.highlight}>{bidNumber}</Text> was the lucky number on the wheel! 🤑
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>😞 Try Again!</Text>
          <Text style={styles.message}>
            Not quite! <Text style={styles.highlight}>{bidNumber}</Text> didn’t land, but your luck might turn next
            spin! 🎯
          </Text>
        </>
      )}

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.exitButton]} onPress={onExit}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 24,
    padding: 28,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    alignItems: "center",
    backgroundColor: "black",
    position: "absolute",
    top: "30%",
    zIndex: 100,
    width: "85%",
    alignSelf: "center",
  },
  winCard: {
    borderColor: "#27ae60",
    borderWidth: 3,
  },
  loseCard: {
    borderColor: "#c0392b",
    borderWidth: 3,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "green",
    marginBottom: 14,
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontWeight: "bold",
    color: "green",
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 40,
    elevation: 3,
    marginHorizontal: 5,
  },
  exitButton: {
    backgroundColor: "#7f8c8d",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ResultMessage;
