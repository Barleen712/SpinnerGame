import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface ResultMessageProps {
  selectedSector: number | string | undefined;
  bidNumber: number | string | undefined;
  onPlayAgain: () => void;
  onExit: () => void;
  setBalance: (arg: (prev: string) => string) => void;
  coins: string;
  setconfetti: (arg: boolean) => void;
}

const ResultMessage = ({
  selectedSector,
  bidNumber,
  onPlayAgain,
  onExit,
  setBalance,
  coins,
  setconfetti,
}: ResultMessageProps) => {
  const isWinner = selectedSector === bidNumber;
  const bounceAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const updateBalance = async () => {
      const coinValue = parseFloat(coins || "0");

      if (isWinner) {
        setBalance((prev) => {
          const newBalance = (parseFloat(prev) + coinValue * coinValue + coinValue).toString();
          AsyncStorage.setItem("balance", newBalance);
          return newBalance;
        });

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
      }
    };

    updateBalance();
    // setconfetti(false);
  }, [isWinner, coins]);

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
