"use strict";
import { StyleSheet } from "react-native";
import * as Constants from "../../lib/Constants";

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Constants.COLOR.BG_GREY
  },
  headerText: {
    color: Constants.COLOR.GREY_666,
    fontSize: 14
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 18
  }
});

export default defaultStyles;
