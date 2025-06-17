import React, { useEffect, useRef } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import styles from "./styles";
interface ResultMessageProps {
  selectedSector: number | string | undefined;
  bidNumber: number | string | undefined;
  onPlayAgain: () => void;
  onExit: () => void;
  setBalance: (arg: (prev: number) => number) => void;
  coins: number | string | undefined;
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

export default ResultMessage;
