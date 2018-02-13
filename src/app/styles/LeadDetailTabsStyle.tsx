"use strict";

import { StyleSheet } from "react-native";
import * as Constants from "../../lib/Constants";

const leadDetailTabsStyle = StyleSheet.create({
    bottom: {
        flexDirection: "row",
        width: Constants.SCREEN_WIDTH,
        height: 50,
        position: "relative",
        bottom: 0,
        backgroundColor: "#fff"
    },
    bottomButton: {
        width: Constants.SCREEN_WIDTH / 2 - 0.5,
        height: 50,
        backgroundColor: "#333",
    },
    bottonText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        lineHeight: 30
    }
});

export default leadDetailTabsStyle;
