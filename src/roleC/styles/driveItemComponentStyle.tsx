"use strict";

import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";
const driveItemComponentStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    driveItemContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 15
    },
    rightIcon: {
        justifyContent: "center",
        alignItems: "flex-end",
        marginLeft: 10,
        marginRight: 10
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    bottomLine: {
        backgroundColor: Constants.COLOR.LIGHTGREY,
        height: 1,
        marginLeft: 15
    },
    statusContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
    },
    statusText: {
        fontSize: 16,
        color: Constants.COLOR.DEEP_RED,
        textAlign: "right"
    },
    customerName: {
        fontSize: 18,
        color: Constants.COLOR.DARKGREY,
        fontWeight: "bold"
    },
    intentCar: {
        fontSize: 16,
        color: Constants.COLOR.GREY_666
    },
    normalText: {
        fontSize: 14,
        color: Constants.COLOR.DARKGREY,
        marginBottom: 5,
        marginTop: 20
    }
});

export default driveItemComponentStyle;
