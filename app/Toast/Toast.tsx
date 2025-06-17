import { View, Text, TouchableOpacity } from "react-native";
import { ToastConfigParams } from "react-native-toast-message";
import styles from "./styles";
const CustomToast = {
  toastConfig: ({ text1, text2, props }: ToastConfigParams<any>) => (
    <View style={styles.container}>
      <Text style={styles.text1}>{text1}</Text>
      <Text style={styles.text2}>{text2}</Text>

      <TouchableOpacity onPress={props.nextToast} style={styles.button}>
        <Text style={styles.next}>NEXT</Text>
      </TouchableOpacity>
    </View>
  ),
};
export default CustomToast;
