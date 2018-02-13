"use strict";

import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";

const carManagementItemComponentStyle = StyleSheet.create({
	container: {
        flex: 1,
        flexDirection: "column",
    },
    flatList: {
    },
    listItem: {
        backgroundColor: "white",
        marginBottom: 10,
        borderBottomWidth : 1 ,
        borderBottomColor : Constants.COLOR.BORDER_COLOR,
    },
    listHeader: {
        height: 44,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Constants.COLOR.WHITE,
    },
    listHeadTouchBar: {
        width: "100%",
        height: 44,
    },
    listHeaderConetent: {
    },
    listHeaderConetentLabel: {
        marginLeft: 10,
        fontSize: 16,
        color: Constants.COLOR.DARKGREY
    },
    listHeaderConetentIcon: {
        marginRight: 10,
        fontSize: 22,
        color: Constants.COLOR.GREY_666
    },
    listContent: {
    },
    listContentRow: {
        height: 44,
        // fontSize: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Constants.COLOR.WHITE,
    },
    listContentRowLabel: {
        marginLeft: 10,
        fontSize: 16,
        color: Constants.COLOR.DARKGREY
    },
    listContentRowValue: {
        marginRight: 10,
        fontSize: 16,
        color: Constants.COLOR.GREY_666
    },
    footerLine: {
        alignSelf: "center",
        color: Constants.COLOR.GREY_999
    }
});

export default carManagementItemComponentStyle;
