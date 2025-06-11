import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  background: { width: "100%", height: "100%", alignItems: "center" },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#c9a93d",
    overflow: "hidden",
  },
  textBalance: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    letterSpacing: 2,
  },
  gradient: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: "100%",
    resizeMode: "contain", // gold border
  },
  innerShadow: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
  },
  text: {
    color: "white",
    fontSize: 32,
    fontWeight: "900",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    letterSpacing: 2,
  },
});
export default styles;
