import * as React from "react";
import { Component } from "react";
import {
    Dimensions,
    PixelRatio,
    Platform,
    StatusBar,
    View
} from "react-native";
import * as global from "./global";
import * as Constants from "./Constants";

export default class Resolution {
    public static setDesignSize() {
        //let navHeight = Platform.OS === "android" ? StatusBar.currentHeight : 64;
        let { width, height } = Dimensions.get("window");

        //let fwScale = 1 / pxRatio / fwDesignScale;
        //let fwScale = (width < 414) ? 1 : 1.5;
        let fwScale = 1;
        //props.fw = { width: fwWidth, height: fwHeight, scale: fwScale, navHeight };
        global.resolution.scale = fwScale;
    }

    public static fixWidthView = (p) => {
        let { scale } = global.resolution;
        return (
            <View {...p} style={{
                width: Constants.SCREEN_WIDTH,
                height: Constants.SCREEN_HEIGHT,
                backgroundColor: "transparent",
                transform: [{ translateX: -Constants.SCREEN_WIDTH * .5 },
                { translateY: -Constants.SCREEN_HEIGHT * .5 },
                { scale: scale },
                { translateX: Constants.SCREEN_WIDTH * .5 },
                { translateY: Constants.SCREEN_HEIGHT * .5 }]
            }}>
            </View>
        );
    }
}
