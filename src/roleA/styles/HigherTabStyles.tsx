"use strict";
import { StyleSheet } from "react-native";
import * as Constants from "../../lib/Constants";

const higherTabStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.COLOR.BG_GREY
    },
    tabContainer: {
        height: 44,
        width: Constants.SCREEN_WIDTH,
        backgroundColor: Constants.COLOR.WHITE,
        justifyContent: "center",
        alignItems: "center"
    },
    tab: {
        flex: 0,
        backgroundColor: Constants.COLOR.WHITE,
        borderWidth: 1,
        borderColor: Constants.COLOR.GREY,
        width: 100,
        height: 33
    },
    tabTextStyle: {
        fontSize: 16,
    	color: Constants.COLOR.DARKGREY
    },
    activeTabTextStyle: {
    	color: Constants.COLOR.WHITE
    }
});

export default higherTabStyles;
