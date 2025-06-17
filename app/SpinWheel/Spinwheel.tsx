import { Text, TouchableOpacity, View, Dimensions, FlatList, BackHandler } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Triangle from "../Triangle/Triangle";
import Wheel from "../Wheel/wheel";
import { ImageBackground } from "expo-image";
import styles from "./styles";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import ResultMessage from "../Result Message/ResultMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfettiCannon from "react-native-confetti-cannon";
const sectorColors = ["yellow", "orange"];
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const topOffset = Dimensions.get("window").height * 0.5 - (Dimensions.get("window").height * 0.3) / 3;
const raduis = width / 2.5;
const centerX = width / 2;
const toastSteps = [
  {
    text1: "Welcome\nto\nWheel of Coins 🌕🌕",
    text2: "Place your bet and spin! 🎡 Each spin may deduct coins or big rewards await! 💵🪙",
  },
  {
    text1: "How to Play 🎯",
    text2: "Place your bet and spin! 🎡 Each spin deducts a single coin 🌕 from your coin balance 💰💰 if u lose ",
  },
  {
    text1: "Multiplier Bonus 🎁",
    text2: "If you get the desired number, your coin balance 💰💰 gets  multiplied! 💰🤑",
  },
  {
    text1: "Good Luck 🍀",
    text2: "Let the wheel decide your fortune!",
  },
];
export default function SpinWheel() {
  const [Spin, setSpin] = useState(false);
  const [show, setShow] = useState(true);
  const [bid, setbid] = useState(false);
  const [toastStep, setToastStep] = useState(0);
  const [bidnumber, setbidnumber] = useState<number | undefined | string>();
  const [balance, setbalance] = useState<string>("");
  const [disabled, setdisabled] = useState(false);
  const [selectedSector, setselectedSector] = useState<number | undefined | string>("");
  const [result, setresult] = useState(false);
  const [lowBalance, setlowBalance] = useState(false);
  const [coins, setcoins] = useState<boolean>(false);
  const [coincount, setcoincount] = useState<string>("");
  const [showconfetti, setshowconfetti] = useState(false);
  useEffect(() => {
    const loadBalance = async () => {
      showToastStep(toastStep);
      try {
        const balance = await AsyncStorage.getItem("balance");
        if (balance !== null) {
          setbalance(balance);
        } else {
          setbalance("10000");
          await AsyncStorage.setItem("balance", "10000");
        }
      } catch (e) {
        console.error("Error loading balance", e);
      }
    };

    loadBalance();
  }, [toastStep]);

  const showToastStep = (step: number) => {
    const { text1, text2 } = toastSteps[step];

    Toast.show({
      text1,
      text2,
      props: {
        nextToast: handleNext,
      },
      type: "toastConfig",
      autoHide: false,
      topOffset: topOffset,
      swipeable: false,
    });
  };

  const handleNext = () => {
    if (toastStep < toastSteps.length - 1) {
      setToastStep((step) => step + 1);
    } else {
      Toast.hide();
      setbid(true);
    }
  };
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  function PlaceBet() {
    if (coins) {
      setbid(false);
      setShow(false);
      positionX.value = withTiming(positionX.value - 90);
      positionY.value = withTiming(positionY.value - width * 0.78);
    } else {
      setcoins(true);
    }
  }
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(positionX.value) }, { translateY: withTiming(positionY.value) }],
  }));

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require("../../assets/images/image copy 2.png")} style={styles.background}>
          {show && <View style={styles.show} />}
          {bid && (
            <View style={styles.bid}>
              <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
                🎯 Place your Bet, big rewards await 🎁
              </Text>
              <Text style={{ color: "white", fontSize: 16, textAlign: "center", marginTop: 10 }}>
                {coins ? "Select the coin count" : "Select your bet number"}
              </Text>
              {coins ? (
                <FlatList
                  data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                  key="coins"
                  numColumns={5}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.next,
                        {
                          backgroundColor: coincount === item ? "red" : "green",
                          padding: item === "10" ? 8 : 15,
                        },
                      ]}
                      onPress={() => setcoincount(item)}
                    >
                      <Text style={styles.coin}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <FlatList
                  data={[1, 2, 3, 4, 5, 6, 7, 8]}
                  key="numbers"
                  numColumns={4}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.next,
                        {
                          backgroundColor: bidnumber === item ? "red" : "green",
                          padding: 15,
                        },
                      ]}
                      onPress={() => setbidnumber(item)}
                    >
                      <Text style={styles.coin}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}
              <TouchableOpacity
                disabled={coins ? !coincount : !bidnumber}
                onPress={PlaceBet}
                style={[
                  {
                    backgroundColor: (coins ? !coincount : !bidnumber) ? "gray" : "green",
                  },
                  styles.button,
                ]}
              >
                <Text style={styles.coin}>{coins ? "Place Bet" : "NEXT"}</Text>
              </TouchableOpacity>
            </View>
          )}
          {!!bidnumber && !show && (
            <Animated.View
              style={[styles.buttonContainer, { position: "absolute", top: "50%", zIndex: 200 }, animatedStyle]}
            >
              <ImageBackground source={require("../../assets/images/image.png")} style={styles.gradient}>
                <View style={styles.innerShadow}>
                  <Text style={[styles.text, { fontSize: 14 }]}>
                    Bet Number <Text style={[styles.textBalance, { fontSize: 14 }]}>: {bidnumber}</Text>
                  </Text>
                  <Text style={[styles.text, { fontSize: 14 }]}>
                    Coins <Text style={[styles.textBalance, { fontSize: 14 }]}>: 🌕 {coincount}</Text>
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          )}
          {lowBalance && (
            <View style={styles.card}>
              <Text style={styles.title}>😳Oooopppsss!</Text>
              <Text style={styles.message}>
                You dont have enough coin balance 🌕 to place the bet ! Try again Later.
              </Text>
            </View>
          )}
          {result && (
            <ResultMessage
              selectedSector={selectedSector}
              bidNumber={bidnumber}
              setconfetti={setshowconfetti}
              onPlayAgain={() => {
                setshowconfetti(false);
                setresult(false);
                setSpin(false);
                setTimeout(() => {
                  if (balance !== null && balance !== undefined && Number(balance) >= 10) {
                    setcoins(false);
                    setcoincount("");
                    setselectedSector(undefined);
                    setbidnumber(undefined);
                    positionX.value = 0;
                    positionY.value = 0;
                    setbid(true);
                    setdisabled(false);
                    setShow(true);
                  } else {
                    setlowBalance(true);
                  }
                }, 100);
              }}
              onExit={() => {
                BackHandler.exitApp();
              }}
              setBalance={setbalance}
              coins={coincount}
            />
          )}
          <Text style={[styles.text, { marginTop: 30 }]}>Wheel Of Coins</Text>
          <View style={{ width: "90%" }}>
            <View style={{ alignItems: "flex-end" }}>
              <View style={[styles.buttonContainer]}>
                <ImageBackground source={require("../../assets/images/image.png")} style={styles.gradient}>
                  <Text style={styles.textBalance}>Balance</Text>
                  <Text style={[styles.textBalance, { fontSize: 14 }]}>🌕 {balance}</Text>
                </ImageBackground>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 40 }}>
            <View style={styles.triangle}>
              <Triangle />
            </View>
            <Wheel
              radius={raduis}
              centerX={centerX}
              centerY={raduis}
              numSectors={8}
              colors={sectorColors}
              spin={Spin}
              onSpinEnd={setSpin}
              setSelectedSector={setselectedSector}
              setResult={setresult}
              setdisabled={setdisabled}
              setconfetti={setshowconfetti}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            disabled={disabled}
            onPress={() => {
              setSpin(false);
              setTimeout(() => {
                setSpin(true);
                setbalance((prev) => {
                  const newBalance = (parseFloat(prev) - parseFloat(coincount)).toString();
                  AsyncStorage.setItem("balance", newBalance);
                  return newBalance;
                });
              }, 50);

              setdisabled(true);
            }}
          >
            <ImageBackground source={require("../../assets/images/image.png")} style={styles.gradient}>
              <View style={styles.innerShadow}>
                <Text style={[styles.text, { color: disabled ? "gray" : "white" }]}>SPIN</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
        {Number(selectedSector) === Number(bidnumber) && !!showconfetti && (
          <>
            <ConfettiCannon
              count={100}
              origin={{ x: height, y: 0 }}
              explosionSpeed={200}
              fallSpeed={2000}
              fadeOut={true}
            />
            <ConfettiCannon
              count={100}
              origin={{ x: 0, y: width }}
              explosionSpeed={200}
              fallSpeed={2000}
              fadeOut={true}
            />
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
