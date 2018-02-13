"use strict";

import { Image, StyleSheet } from "react-native";
import * as Constants from "../../lib/Constants";

const personCardStyles = StyleSheet.create({
  center: {
    flexDirection: "row"
  },
  userName: {
    color: Constants.COLOR.WHITE,
    fontSize: 17,
    marginTop: 78
  },
  jobTitle: {
    color: Constants.COLOR.LIGHTYELLOW,
    fontSize: 15,
    marginTop: 9
  },
  header: {
    position: "relative",
    height: 174,
    backgroundColor: "transparent",
    marginBottom: 10
  },
  logoSize: {
    width: 68,
    height: 68,
    marginTop: 68,
    marginRight: 9,
    marginBottom: 38,
    marginLeft: 25,
    resizeMode: Image.resizeMode.contain,
  },
  levelSize: {
    height: 18,
    width: 18,
    marginTop: 9,
    resizeMode: Image.resizeMode.contain,
  },
  setting: {
    height: 22,
    width: 22,
    marginTop: 9,
    resizeMode: Image.resizeMode.contain
  },
  imageStyle: {
    position: "absolute",
    height: 174
  }
});

export default personCardStyles;
