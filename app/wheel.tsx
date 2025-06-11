import { Button, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated";
import { useRef } from "react";

interface WheelProps {
  radius: number;
  centerX: number;
  centerY: number;
  numSectors: number;
  colors: string[];
}

const generateSectorPaths = (radius: number, centerX: number, centerY: number, numSectors: number) => {
  const paths = [];
  const angle = 360 / numSectors;
  const radius1 = radius - 5;
  for (let i = 0; i < numSectors; i++) {
    const startAngle = i * angle * (Math.PI / 180);
    const endAngle = (i + 1) * angle * (Math.PI / 180);
    const startX = centerX + radius1 * Math.cos(startAngle);
    const startY = centerY + radius1 * Math.sin(startAngle);
    const endX = centerX + radius1 * Math.cos(endAngle);
    const endY = centerY + radius1 * Math.sin(endAngle);

    const path = `M${centerX},${centerY} L${startX},${startY} A${radius},${radius},0,0,1,${endX},${endY} Z`;
    paths.push(path);
  }
  return paths;
};

export default function Wheel({ radius, centerX, centerY, numSectors, colors }: WheelProps) {
  const paths = generateSectorPaths(radius, centerX, centerY, numSectors);
  const rotateAngle = useSharedValue(0);
  const totalRotation = useRef(0); // ⬅️ store total cumulative rotation

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotateAngle.value}deg` }],
    };
  });

  function handlePress() {
    const spinAngle = (13 + Math.random() * Math.random()) * 360; // Random spin amount
    totalRotation.current += spinAngle; // Add to total
    rotateAngle.value = withTiming(totalRotation.current, {
      duration: 10000,
      easing: Easing.out(Easing.exp),
    });
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={[animatedStyle]}>
        <Svg width={radius * 2} height={radius * 2} fill="red">
          {paths.map((path, index) => (
            <Path key={index} d={path} fill={colors[index % colors.length]} />
          ))}
          <Circle cx={centerX} cy={centerY} r={radius - 5} stroke="white" fill="none" strokeWidth={4}></Circle>
        </Svg>
      </Animated.View>
      <View style={{ marginTop: 20 }}>
        <Button title="Spin" onPress={handlePress} />
      </View>
    </View>
  );
}
