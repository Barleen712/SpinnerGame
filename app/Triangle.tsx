import Svg, { Polygon } from "react-native-svg";
export default function Triangle() {
  return (
    <Svg width={200} height={50}>
      <Polygon points="120,0 100,50 75,0" fill="red"></Polygon>
    </Svg>
  );
}
