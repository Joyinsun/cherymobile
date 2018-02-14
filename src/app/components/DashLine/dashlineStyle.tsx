import { StyleSheet, Dimensions } from "react-native";

const dashlineStyle = StyleSheet.create({
    dashLine: {
        flex: 1,
        alignItems: "center"
    },
    titleHeaderIcon: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
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
        width: 2,
        // borderStyle: "solid",
        backgroundColor: "#fcc2ca",
        flex: 1,
    }
});
export default dashlineStyle;
