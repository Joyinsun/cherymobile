import { StyleSheet, Dimensions } from "react-native";

const dashlineStyle = StyleSheet.create({
    dashLine: {
        flex: 1,
        alignItems: "center"
    },
    titleHeaderIcon: {
        height: "100%",
        alignItems: "center",
        width: 60
    },
    dashItem: {
        height: 1,
        width: 2,
        marginTop: 1,
        flex: 1,
        backgroundColor: "grey"
    },
    dashLineInvisible: {
        display: "none"
    },
    fullLine: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        flex: 1,
    }
});
export default dashlineStyle;
