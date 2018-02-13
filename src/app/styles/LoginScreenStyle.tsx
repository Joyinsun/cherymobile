import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import * as Constants from "../../lib/Constants";

let inputWidth = width - 48;
let inputHeight = 44;
let imageWidth = inputWidth * 2 / 3;
let imageHeight = inputHeight * 2 / 3;

const loginScreenStyle = StyleSheet.create({
    loginView: {
        flex: 1,
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
    },
    alignCenter: {
        justifyContent: "center",
        width: 300
    },
    text: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,0,0,0)",
        fontSize: 44,
        color: "white"
    },
    textInput: {
        height: inputHeight,
        width: inputWidth,
        fontSize: 15,
        color: "#000",
        borderWidth: 0.5,
        textAlign: "left",
        backgroundColor: Constants.COLOR.WHITE,
        marginBottom: 10
    },
    textStyle6: {
        textAlign: "center",
        color: Constants.COLOR.WHITE,
        fontSize: 18
    },
    errorMessage: {
        color: "#ea3d13",
        fontSize: 16,
        backgroundColor: "transparent",
        textAlign: "center",
        marginHorizontal: 10,
        marginTop: 30
    },
    popup: {
        width: width * 0.8
    },
    loading: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        height: height,
        width: width
    },
    logoImg: {
        height: imageHeight,
        width: imageWidth,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 65,
        marginTop: 65
    },
    buttonContainer: {
        borderColor: Constants.COLOR.GREY_999,
        backgroundColor: Constants.COLOR.DARKGREY,
        borderRadius: 5,
        borderWidth: 0.5,
        marginTop: 30,
        alignSelf: "center",
        width: inputWidth,
        height: inputHeight
    },
    buttonDisabled: {
        backgroundColor: Constants.COLOR.GREY_888
    },
    loginTitle: {
        fontSize: 23,
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        marginTop: 20
    }
});

export default loginScreenStyle;
