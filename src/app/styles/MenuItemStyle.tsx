"use strict";
import { Image, StyleSheet } from "react-native";
import * as Constants from "../../lib/Constants";

const menuItemStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    userName: {
        color: Constants.COLOR.WHITE,
        fontSize: 20,
    },
    transparent: {
        backgroundColor: Constants.COLOR.DARKGREY,
     },
     touchContainer: {
         marginTop: 1,
         marginLeft: 15,
         marginRight: 15,
     },
     menuContainer: {
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "space-between",
         backgroundColor: Constants.COLOR.WHITE,
         height: 44,
         paddingLeft: 12,
         paddingRight: 10
     },
     menuTitle: {
         flex: 1,
         color: Constants.COLOR.DARKGREY,
         fontSize: 15
     },
     menuTextContainer: {
         flexDirection: "row",
         alignItems: "center"
     },
     menuText: {
         color: Constants.COLOR.DARKGREY,
         marginLeft: 10
     },
     header: {
         height: 100,
     },
     iconSize: {
         height: 20,
         width: 20,
         resizeMode: Image.resizeMode.contain,
     },
     logoSize: {
         height: 40,
         width: 40,
         resizeMode: Image.resizeMode.contain,
     }
 });

export default menuItemStyles;
