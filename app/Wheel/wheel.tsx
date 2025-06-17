import React, { useEffect, useRef, useState } from "react";
import { View, Dimensions } from "react-native";
import Svg, { Circle, Path, Text } from "react-native-svg";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, runOnJS } from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

interface WheelProps {
  radius: number;
  centerX: number;
  centerY: number;
  numSectors: number;
  colors: string[];
  spin: boolean;
  onSpinEnd: (arg: boolean) => void;
  setSelectedSector: (arg: number) => void;
  setResult: (arg: boolean) => void;
  setdisabled: (arg: boolean) => void;
  setconfetti: (arg: boolean) => void;
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

export default function Wheel({
  radius,
  centerX,
  centerY,
  numSectors,
  colors,
  spin,
  onSpinEnd,
  setSelectedSector,
  setResult,
  setdisabled,
  setconfetti,
}: WheelProps) {
  const paths = generateSectorPaths(radius, centerX, centerY, numSectors);
  const rotateAngle = useSharedValue(0);
  const totalRotation = useRef(0);
  const RotationGesture = Gesture.Tap().onEnd(() => {
    runOnJS(setdisabled)(true);
    runOnJS(onSpinEnd)(true);
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotateAngle.value}deg` }],
    };
  });
  const handlePress = () => {
    const fullSpins = 10; // fixed full spins
    const randomOffset = Math.floor(Math.random() * 360); // random part
    const spinAngle = fullSpins * 360 + randomOffset;

    rotateAngle.value = withTiming(
      spinAngle,
      {
        duration: 8000,
        easing: Easing.elastic(1),
      },
      (finished) => {
        if (finished) {
          runOnJS(setconfetti)(true);
          const finalRotation = spinAngle % 360;
          const anglePerSector = 360 / numSectors;
          const pointerAngle = (360 - finalRotation + 270) % 360;
          const selectedSectorIndex = Math.floor(pointerAngle / anglePerSector);
          const selectedSector = (selectedSectorIndex % numSectors) + 1;
          runOnJS(setSelectedSector)(selectedSector);
          runOnJS(onSpinEnd)(false);
          runOnJS(setResult)(true);
        }
      }
    );
  };

  useEffect(() => {
    if (spin) {
      handlePress();
    } else {
      rotateAngle.value = 0;
      totalRotation.current = 0;
    }
  }, [spin]);
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
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
                    {`${index + 1}`}
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
