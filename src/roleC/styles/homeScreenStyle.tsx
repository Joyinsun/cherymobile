"use strict";

import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";
const { width, height } = Dimensions.get("window");

let inputWidth = width - 48;
let inputHeight = 48;
let imageWidth = inputWidth * 2 / 3;
let imageHeight = inputHeight * 2 / 3;

const homeScreenStyle = StyleSheet.create({
    container: {
        height: Constants.SCREEN_HEIGHT,
        backgroundColor: Constants.COLOR.LIGHTGREY
    },
    headerContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50
    },
    arrangementContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    arrangementText: {
        color: Constants.COLOR.DARKGREY,
        fontSize: 16,
        fontWeight: "bold"
    },
    backgroundImage: {
        flexDirection: "row",
        height: 200,
        width: width,
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10
    },
    bottomLine: {
        backgroundColor: Constants.COLOR.LIGHTGREY,
        height: 1,
        marginLeft: 15
    },
    customMarginRight: {
        marginRight: 10
    },
    footerLine: {
        alignSelf: "center",
        color: Constants.COLOR.GREY_999
    },
    logoContainer: {
        backgroundColor: Constants.COLOR.WHITE,
        flex: 3,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    logoImg: {
        height: imageHeight,
        width: imageWidth,
        marginBottom: 10,
        marginTop: 15
    },
    headerLogoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Constants.COLOR.WHITE
    },
    notiContainer: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginRight: 10
    }
});

export default homeScreenStyle;
