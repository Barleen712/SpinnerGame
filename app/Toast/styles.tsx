import { StyleSheet, Dimensions } from "react-native";
const height = Dimensions.get("window").height * 0.35;
const styles = StyleSheet.create({
  container: {
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
  },
  text1: { color: "#fff", fontWeight: "bold", fontSize: 24, textAlign: "center" },
  text2: { color: "#aaa", marginTop: 10, fontSize: 16, textAlign: "center" },
  button: {
    alignItems: "center",
    width: "70%",
    backgroundColor: "green",
    height: "20%",
    justifyContent: "center",
    margin: 10,
  },
  next: {
    color: "white",
    fontSize: 20,
  },
});
export default styles;
