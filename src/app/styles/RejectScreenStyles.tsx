import { StyleSheet } from "react-native";
import * as Constants from "./../../lib/Constants";

const rejectScreenStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        marginLeft: 15
    },
    reassignView: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: Constants.COLOR.BG_GREY,
        justifyContent: "space-between",
        height: 44
    },
    reassignRight: {
        height: 44,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    arrowImg: {
        height: 22,
        width: 22
    },
    labelView: {
        borderBottomWidth: 1,
        borderBottomColor: Constants.COLOR.BG_GREY,
        justifyContent: "center",
        height: 44
    },
    label: {
        fontSize: 16,
        color: "#252525",
    },
    inputView: {
        height: 88,
        borderBottomWidth: 1,
        borderBottomColor: Constants.COLOR.BG_GREY,
    },
    input: {
        paddingTop: 5,
        fontSize: 16,
        color: "#666666"
    }
});

export default rejectScreenStyles;
