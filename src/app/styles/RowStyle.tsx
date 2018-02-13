"use strict";

import { StyleSheet } from "react-native";
import * as Constants from "../../lib/Constants";

const rowStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    height: 44,
    backgroundColor: "#fff"
  },
  inVisible: {
    display: "none"
  },
  containerColumn: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 15,
    paddingRight: -15,
    paddingTop: 1,
    height: "auto",
    backgroundColor: "#fff"
  },
  NavRow: {
    flexDirection: "row",
    height: 44,
    alignItems: "center",
    marginRight: -10
  },
  input: {
    width: Constants.SCREEN_WIDTH / 2,
    padding: 0,
    fontSize: 16,
    textAlign: "right",
    color: Constants.COLOR.GREY_888
  },
  title: {
    fontSize: 16,
    color: Constants.COLOR.DARKGREY
  },
  text: {
    fontSize: 16,
    color: Constants.COLOR.GREY_888
  },
  counterText: {
    fontSize: 16,
    textAlign: "right",
    paddingRight: 30,
    width: Constants.SCREEN_WIDTH
  },
  textArea: {
    fontSize: 16,
    width: Constants.SCREEN_WIDTH,
    paddingRight: 10,
    textAlign: "left",
    height: 120,
    textAlignVertical: "top",
    color: Constants.COLOR.GREY_888
  },
  componentLabel: {
    height: 44,
    marginRight: -10,
    fontSize: 16,
    paddingTop: 5,
    color: Constants.COLOR.GREY_252525
  },
  margin: {
    marginRight: 14
  },
  selectionContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff"
  },
  selectItem: {
    marginTop: 10,
    height: 44,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: Constants.SCREEN_WIDTH
  },
  selectionText: {
    fontSize: 16,
    color: Constants.COLOR.DARKGREY
  }
});

export default rowStyles;
