import { Dimensions } from "react-native";
import Svg, { Polygon } from "react-native-svg";
const width = Dimensions.get("window").width;
const centre = width / 2;
const left = centre + 25;
const right = centre - 25;
export default function Triangle() {
  return (
    <Svg width={width} height={50}>
      <Polygon points={`${left},0 ${centre},50 ${right},0`} fill="red"></Polygon>
    </Svg>
  );
}
