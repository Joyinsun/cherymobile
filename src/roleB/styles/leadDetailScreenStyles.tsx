import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";

const styles = StyleSheet.create({
    bottomButton: {
        width: Dimensions.get("window").width,
        height: 50,
        backgroundColor: "#333",
        position: "relative",
        bottom: 0,
    },
    bottonText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        lineHeight: 30
    }
});

export default styles;
