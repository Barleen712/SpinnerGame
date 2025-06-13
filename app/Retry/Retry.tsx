import { useNavigation } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function Retry() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: "absolute",
        top: "30%",
        backgroundColor: "black",
        zIndex: 300,
        width: "80%",
        height: "40%",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <Text style={{ color: "white", fontSize: 18 }}>Do you want to retry?</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            width: "45%",
            padding: 10,
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white" }}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            width: "45%",
            padding: 10,
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white" }}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
