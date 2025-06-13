import { Text, TouchableOpacity, View, Dimensions, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Triangle from "./Triangle";
import Wheel from "./wheel";
import { ImageBackground } from "expo-image";
import styles from "./styles";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const sectorColors = ["yellow", "orange"];
const width = Dimensions.get("window").width;
const topOffset = Dimensions.get("window").height * 0.5 - (Dimensions.get("window").height * 0.3) / 3;
const raduis = width / 2.5;
const centerX = width / 2;

const toastSteps = [
  {
    text1: "Welcome\nto\nWheel of Coins 🌕🌕",
    text2: "Place your bet and spin! 🎡 Each spin deducts a few coins, but big rewards await! 💵🪙",
  },
  {
    text1: "How to Play 🎯",
    text2: "Place your bet and spin! 🎡 Each spin deducts 2000 coins 🌕 from your coin balance 💰💰 ",
  },
  {
    text1: "Multiplier Bonus 🎁",
    text2: "If you get the desired number, your coin balance 💰💰 gets multiplied by 5! 💰🤑",
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
  const [bidnumber, setbidnumber] = useState<number | undefined>();
  const [balance, setbalance] = useState(10000);
  const [disabled, setdisabled] = useState(false);
  useEffect(() => {
    showToastStep(toastStep);
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
    setbid(false);
    setShow(false);
    positionX.value = withTiming(positionX.value - 75);
    positionY.value = withTiming(positionY.value - 260);
  }
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(positionX.value) }, { translateY: withTiming(positionY.value) }],
  }));
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require("../assets/images/image copy 2.png")} style={styles.background}>
          {show && (
            <View
              style={{
                backgroundColor: "rgba(255, 255, 0, 0.5)",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0%",
                zIndex: 100,
              }}
            />
          )}
          {bid && (
            <View
              style={{
                backgroundColor: "black",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 110,
                position: "absolute",
                top: "33%",
                borderColor: "#c9a93d",
                borderWidth: 2,
                padding: 5,
                width: "80%",
              }}
            >
              <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
                🎯 Place your Bet, big rewards await 🎁
              </Text>
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                numColumns={4}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: bidnumber === item ? "red" : "green",
                      margin: 10,
                      padding: 15,
                      borderColor: "#c9a93d",
                      borderWidth: 2,
                    }}
                    onPress={() => setbidnumber(item)}
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                disabled={!bidnumber}
                onPress={PlaceBet}
                style={{
                  backgroundColor: !bidnumber ? "gray" : "green",
                  borderColor: "#c9a93d",
                  borderWidth: 2,
                  width: "50%",
                  alignItems: "center",
                  margin: 10,
                  padding: 5,
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Place Bet</Text>
              </TouchableOpacity>
            </View>
          )}
          {!!bidnumber && !show && (
            <Animated.View style={[styles.buttonContainer, { position: "absolute", top: "50%" }, animatedStyle]}>
              <ImageBackground source={require("../assets/images/image.png")} style={styles.gradient}>
                <View style={styles.innerShadow}>
                  <Text style={[styles.text, { fontSize: 14 }]}>Bet Number</Text>
                  <Text style={[styles.textBalance, { fontSize: 14 }]}>{bidnumber}</Text>
                </View>
              </ImageBackground>
            </Animated.View>
          )}
          <Text style={[styles.text, { marginTop: 30 }]}>Wheel Of Coins</Text>
          <View style={{ width: "90%" }}>
            <View style={{ alignItems: "flex-end" }}>
              <View style={[styles.buttonContainer]}>
                <ImageBackground source={require("../assets/images/image.png")} style={styles.gradient}>
                  <Text style={styles.textBalance}>Balance</Text>
                  <Text style={[styles.textBalance, { fontSize: 14 }]}>🌕 {balance}</Text>
                </ImageBackground>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 40 }}>
            <View style={{ position: "absolute", top: "0%", zIndex: 1 }}>
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
            />
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            disabled={disabled}
            onPress={() => {
              setSpin(true);
              setdisabled(true);
              setbalance((prev) => prev - 2000);
            }}
          >
            <ImageBackground source={require("../assets/images/image.png")} style={styles.gradient}>
              <View style={styles.innerShadow}>
                <Text style={[styles.text, { color: disabled ? "gray" : "white" }]}>SPIN</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
