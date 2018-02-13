"use strict";

import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";

const width = Dimensions.get(`window`).width;

const testDriveScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    viewContainer: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    filterContent: {

    },
    listContent: {

    },
    thumbnail: {
        padding: 6,
        flexDirection: "row",
        overflow: "hidden",
        backgroundColor: "#EEEEEE"
    },
    textContainer: {
        padding: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: width
    },
    searchButton: {
        margin: 20
    },
    bottomLine: {
        backgroundColor: Constants.COLOR.GREY,
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
    tabContainer: {
        height: 60,
        width: Constants.SCREEN_WIDTH,
        backgroundColor: Constants.COLOR.WHITE,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: Constants.COLOR.BORDER_COLOR
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

export default testDriveScreenStyle;
