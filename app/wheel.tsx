import { useEffect, useRef, useState } from "react";
import { View, Dimensions } from "react-native";
import Svg, { Circle, Path, Text } from "react-native-svg";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, runOnJS } from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import React from "react";
import Retry from "./Retry/Retry";

interface WheelProps {
  radius: number;
  centerX: number;
  centerY: number;
  numSectors: number;
  colors: string[];
  spin: boolean;
  onSpinEnd: (arg: boolean) => void;
}

const width = Dimensions.get("window").width;

const generateSectorPaths = (radius: number, centerX: number, centerY: number, numSectors: number) => {
  const paths = [];
  const angle = 360 / numSectors;
  const radius1 = radius - 2;
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

export default function Wheel({ radius, centerX, centerY, numSectors, colors, spin, onSpinEnd }: WheelProps) {
  const paths = generateSectorPaths(radius, centerX, centerY, numSectors);
  const rotateAngle = useSharedValue(0);
  const totalRotation = useRef(0);
  const [show, setshow] = useState(false);
  const RotationGesture = Gesture.Tap().onEnd(() => {
    console.log("Tapped");
    // try {
    //   const spinAngle = (13 + Math.random() * Math.random()) * 360;
    //   totalRotation.current += spinAngle;
    //   rotateAngle.value = withTiming(
    //     totalRotation.current,
    //     {
    //       duration: 10000,
    //       easing: Easing.elastic(1),
    //     },
    //     () => {
    //       runOnJS(() => onSpinEnd(false));
    //     }
    //   );
    //   //
    // } catch (error) {
    //   console.log(error, "eror");
    // }
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotateAngle.value}deg` }],
    };
  });
  const handlePress = () => {
    const spinAngle = (13 + Math.random()) * 360;
    totalRotation.current += spinAngle;

    rotateAngle.value = withTiming(
      totalRotation.current,
      {
        duration: 10000,
        easing: Easing.elastic(1),
      },
      (finished) => {
        if (finished) {
          console.log(finished);
          runOnJS(setshow)(true);
        }
      }
    );
  };

  useEffect(() => {
    if (spin) {
      handlePress();
    }
  }, [spin]);
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {show && <Retry />}
      <GestureDetector gesture={RotationGesture}>
        <Animated.View style={[animatedStyle]}>
          <Svg width={width} height={radius * 2}>
            {paths.map((path, index) => {
              const angle = (360 / numSectors) * index + 360 / (2 * numSectors); // mid angle
              const rad = (angle * Math.PI) / 180;
              const textRadius = radius * 0.75; // distance from center to place the text
              const textX = centerX + textRadius * Math.cos(rad);
              const textY = centerY + textRadius * Math.sin(rad);

              return (
                <React.Fragment key={index}>
                  <Path d={path} fill={colors[index % colors.length]} />
                  <Text
                    x={textX}
                    y={textY}
                    fill="black"
                    fontSize={24}
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform={`rotate(${angle + 90}, ${textX}, ${textY})`}
                  >
                    {`${index + 1}`} {/* Replace with custom text per sector if needed */}
                  </Text>
                </React.Fragment>
              );
            })}

            <Circle cx={centerX} cy={centerY} r={radius - 5} stroke="rgb(31, 102, 65)" fill="none" strokeWidth={8} />
          </Svg>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
