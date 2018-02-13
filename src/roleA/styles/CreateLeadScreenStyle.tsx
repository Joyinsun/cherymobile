import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";
const { width, height } = Dimensions.get("window");
let inputWidth = width - 48;
let imageWidth = width - 88;
let inputHeight = 44;

let refreshIndicatorHeight = Constants.SCREEN_HEIGHT / 2;

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
        borderWidth: 0.5,
        borderRadius: 5,
        height: inputHeight,
        borderColor: Constants.COLOR.GREY_888,
        width: inputWidth
    },
    mobileInputIOS: {
        display: "flex",
        borderWidth: 0.5,
        borderRadius: 5,
        height: inputHeight,
        borderColor: Constants.COLOR.GREY_888,
        width: inputWidth,
        alignSelf: "center",
        fontSize: 15
    },
    mobileInput: {
        width: 250,
        alignSelf: "center",
        fontSize: 15
    },
    clearIcon: {
        marginRight: 4
    },
    buttonContainer: {
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 30,
        height: inputHeight,
        width: inputWidth,
        alignSelf: "center",
        backgroundColor: Constants.COLOR.DARKGREY,
        borderColor: Constants.COLOR.GREY_999,
        borderWidth: 0.5
    },
    buttonDisabled: {
        backgroundColor: Constants.COLOR.GREY_888
    },
    textStyle6: {
        textAlign: "center",
        color: Constants.COLOR.WHITE,
        fontSize: 18
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
    },
    refreshIndicator: {
        flex: 1,
        alignSelf: "center"
    },
    logoImg: {
        height: 54,
        width: imageWidth,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 58,
        marginTop: 29
    }
});

export default createLeadScreenStyle;
