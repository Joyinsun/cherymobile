"use strict";

import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";
const { width, height } = Dimensions.get("window");
let buttonWidth = width - 48;

const aboutMeScreenStyle = StyleSheet.create({
    consuItem: {
    flexDirection: "row",
    backgroundColor: Constants.COLOR.WHITE,
    flexWrap: "wrap",
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15
  },
  listStyle: {
    backgroundColor: Constants.COLOR.LIGHTGREY
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Constants.COLOR.BG_GREY
  },
  container: {
    backgroundColor: Constants.COLOR.WHITE,
    borderTopWidth: 1,
    borderTopColor: Constants.COLOR.LIGHTGREY
  },
  textStyle: {
    alignItems: "center",
    height: 30,
    paddingLeft: 20,
    color: Constants.COLOR.GREY,
    fontSize: 16
  },
  textStyle6: {
    textAlign: "center",
    color: Constants.COLOR.WHITE,
    fontSize: 18
  },
  buttonContainer: {
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 30,
    height: 44,
    width: buttonWidth,
    alignSelf: "center",
    backgroundColor: Constants.COLOR.DARKGREY,
    borderColor: Constants.COLOR.GREY_999,
    borderWidth: 0.5
  },
  logoImg: {
    height: 44,
    width: 300,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 24,
    marginBottom: 24
  },
  settingContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecedf1"
  },
  buttonDisabled: {
    backgroundColor: Constants.COLOR.GREY_888
  }
});

export default aboutMeScreenStyle;
