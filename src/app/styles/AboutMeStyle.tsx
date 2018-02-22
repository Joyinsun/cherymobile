"use strict";

import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";
const { width, height } = Dimensions.get("window");
let inputWidth = width - 48;

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
    color: Constants.COLOR.DARKGREY,
    fontSize: 18
  },
  buttonContainer: {
    // borderRadius: 5,
    marginTop: 10,
    height: 44,
    alignSelf: "center",
    backgroundColor: Constants.COLOR.WHITE,
    borderColor: Constants.COLOR.WHITE,
    // borderWidth: 0.5
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
    justifyContent: "flex-start",
    backgroundColor: "#ecedf1"
  },
  buttonDisabled: {
    backgroundColor: "#dad9d7"
  },
  bottomLine: {
    backgroundColor: Constants.COLOR.LIGHTGREY,
    height: 1
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    borderWidth: 0.5,
    borderRadius: 5,
    height: 44,
    borderColor: Constants.COLOR.GREY_888,
    width: inputWidth
  },
  mobileInput: {
    width: 250,
    alignSelf: "center",
    fontSize: 15
  }
});

export default aboutMeScreenStyle;
