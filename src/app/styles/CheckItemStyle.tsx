"use strict";
import { StyleSheet } from "react-native";
import * as Constants from "../../lib/Constants";

const checkItemStyles = StyleSheet.create({
    touchable: {
        width: "100%",
        backgroundColor: Constants.COLOR.WHITE
    },
    touchForbid: {
        opacity: 0.7
    },
    thumbnail: {
        width: Constants.SCREEN_WIDTH,
        paddingTop: 10,
        flexDirection: "column",
        backgroundColor: Constants.COLOR.LIGHTGREY
    },
    base: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: Constants.COLOR.LIGHTGREY
    },
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: Constants.COLOR.WHITE
    },
    title: {
        fontSize: 16,
        color: Constants.COLOR.DARKGREY
    },
    level: {
        marginRight: 20,
        color: Constants.COLOR.RED,
        fontSize: 24
    },
    levelFalse: {
        color: Constants.COLOR.LIGHTGREY,
    },
    iconStyle: {
        fontSize: 14,
        marginRight: 0
    },
    sourceLevel: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 5,
        marginTop: 10
    },
    content: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 5,
        marginBottom: 10
    },
    text: {
        marginTop: 12,
        fontSize: 15
    },
    markLabel: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 50,
        height: 50
    },
    commonFontSize: {
        fontSize: 16
    },
    commonFontWeight: {
        fontWeight: "bold"
    },
    commonMargin: {
        marginLeft: 10
    },
    commonPadding: {
        paddingLeft: 5
    },
    commonDirection: {
        flexDirection: "row"
    },
    customerFontSize: {
        fontSize: 18
    },
    customerFontColor: {
        color: Constants.COLOR.DARKGREY
    }
});
export default checkItemStyles;
