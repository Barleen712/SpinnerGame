import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Triangle from "./Triangle";
import Wheel from "./wheel";
import { ImageBackground } from "expo-image";
import styles from "./styles";
import Animated from "react-native-reanimated";
const sectorColors = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "brown"];
export default function SpinWheel() {
  const AnimatedWheel = Animated.createAnimatedComponent(Wheel);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require("../assets/images/image copy 2.png")} style={styles.background}>
          <Text style={[styles.text, { marginTop: 30 }]}>Wheel Of Coins</Text>
          <View style={{ width: "90%" }}>
            <View style={{ alignItems: "flex-end" }}>
              <View style={[styles.buttonContainer]}>
                <ImageBackground source={require("../assets/images/image.png")} style={styles.gradient}>
                  <Text style={styles.textBalance}>Balance</Text>
                  <Text style={[styles.textBalance, { fontSize: 14 }]}>🌕 10000</Text>
                </ImageBackground>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 100 }}>
            <View style={{ position: "absolute", top: "0%", zIndex: 1 }}>
              <Triangle />
            </View>
            <Wheel radius={100} centerX={100} centerY={100} numSectors={8} colors={sectorColors} />
          </View>
          <TouchableOpacity style={styles.buttonContainer}>
            <ImageBackground source={require("../assets/images/image.png")} style={styles.gradient}>
              <View style={styles.innerShadow}>
                <Text style={styles.text}>SPIN</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
