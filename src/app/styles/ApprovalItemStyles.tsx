"use strict";

import { StyleSheet } from "react-native";
import * as Constants from "../../lib/Constants";

const approvalItemStyle = StyleSheet.create({
    container: {
        borderBottomWidth: 10,
        borderBottomColor: Constants.COLOR.BG_GREY,
    },
    label: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: Constants.COLOR.BG_GREY,
        height: 44,
        marginTop: 10,
        marginLeft: 15,
        justifyContent: "center"
    },
    row1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 35,
        marginLeft: 15,
        paddingTop: 15,
    },
    ApplicantTextGroup: {
        flexDirection: "row"
    },
    ApplicantText1: {
        fontSize: 18,
        marginRight: 9,
        fontWeight: "bold",
        color: "#252525"
    },
    ApplicantText2: {
        fontSize: 18,
        color: "#666666"
    },
    LevelText: {
        fontSize: 22,
        color: Constants.COLOR.RED
    },
    row2: {
        flexDirection: "row",
        flex: 1,
        width: Constants.SCREEN_WIDTH,
        marginLeft: 15,
        marginRight: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f4f4f4",
    },
    textGroup: {
        flex: 4,
        flexDirection: "column",
    },
    singleText: {
        marginTop: 12,
        fontSize: 15,
        color: "#666666"
    },
    arrow: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    arrowImg: {
        height: 22,
        width: 22
    },
});

export default approvalItemStyle;
