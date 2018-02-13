import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";

const leadPageStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.COLOR.BG_GREY
    },
    thumbnail: {
        padding: 6,
        flexDirection: "row",
        overflow: "hidden",
    },
    textContainer: {
        padding: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    searchButton: {
        margin: 20
    },
    tips_box: {
        marginVertical: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    line: {
        width: 50,
        height: 1,
        backgroundColor: "#d9d9d9"
    },
    tips_text: {
        fontSize: 10,
        color: "#999",
        marginHorizontal: 5
    }
});

export default leadPageStyle;
