import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";

const createLeadScreenStyle = StyleSheet.create({
    alignCenter: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: Constants.COLOR.WHITE,
        width: Constants.SCREEN_WIDTH,
        height: Constants.SCREEN_HEIGHT
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        borderWidth: 1,
        borderRadius: 5,
        height: 58,
        marginTop: 60,
        borderColor: Constants.COLOR.GREY,
        width: 300
    },
    mobileInput: {
        width: 250,
        alignSelf: "center"
    },
    clearIcon: {
        marginRight: 4
    },
    buttonContainer: {
        borderRadius: 5,
        marginTop: 60,
        marginBottom: 30,
        height: 58,
        width: 300,
        alignSelf: "center",
        backgroundColor: Constants.COLOR.GREY,
        borderColor: Constants.COLOR.GREY,
        borderWidth: 1
    },
    textStyle6: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 15,
        fontWeight: "bold"
    },
    topContainer: {
        backgroundColor: "#fff",
        height: "auto"
    },
    sectionContainer: {
        paddingBottom: 10,
        backgroundColor: "#f0f0f0",
    },
    bottomLine: {
        backgroundColor: Constants.COLOR.LIGHTGREY,
        height: 1
    }
});

export default createLeadScreenStyle;
