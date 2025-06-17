import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  card: {
    margin: 24,
    padding: 28,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    alignItems: "center",
    backgroundColor: "black",
    position: "absolute",
    top: "30%",
    zIndex: 100,
    width: "85%",
    alignSelf: "center",
  },
  winCard: {
    borderColor: "#27ae60",
    borderWidth: 3,
  },
  loseCard: {
    borderColor: "#c0392b",
    borderWidth: 3,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "green",
    marginBottom: 14,
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontWeight: "bold",
    color: "green",
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 40,
    elevation: 3,
    marginHorizontal: 5,
  },
  exitButton: {
    backgroundColor: "#7f8c8d",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default styles;
