"use strict";
import { StyleSheet } from "react-native";
import * as Constants from "../../lib/Constants";

const higherTabStyles = StyleSheet.create({
    tabContainer: {
        height: 60,
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
        width: (Constants.SCREEN_WIDTH / 3) - 40,
        height: 30
    },
    tabTextStyle: {
    	color: Constants.COLOR.DARKGREY
    },
    activeTabTextStyle: {
    	color: Constants.COLOR.WHITE
    }
});

export default higherTabStyles;
