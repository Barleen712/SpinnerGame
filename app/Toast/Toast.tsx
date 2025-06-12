import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { ToastConfigParams } from "react-native-toast-message";

const height = Dimensions.get("window").height * 0.35;

export const CustomToast = {
  toastConfig: ({ text1, text2, props }: ToastConfigParams<any>) => (
    <View
      style={{
        backgroundColor: "#222",
        padding: 16,
        borderRadius: 12,
        borderColor: "#FFD700",
        borderWidth: 1.5,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        marginHorizontal: 20,
        width: "90%",
        height: height,
        justifyContent: "space-evenly",
        alignItems: "center",
        zIndex: 20000,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 24, textAlign: "center" }}>{text1}</Text>
      <Text style={{ color: "#aaa", marginTop: 10, fontSize: 16, textAlign: "center" }}>{text2}</Text>

      <TouchableOpacity
        onPress={props.nextToast}
        style={{
          alignItems: "center",
          width: "70%",
          backgroundColor: "green",
          height: "20%",
          justifyContent: "center",
          margin: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>NEXT</Text>
      </TouchableOpacity>
    </View>
  ),
};
