"use strict";

import { StyleSheet } from "react-native";
import * as Constants from "../../lib/Constants";

const messageTemplateScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: Constants.COLOR.LIGHTGREY
  },
  listItemView: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: Constants.COLOR.WHITE,
    borderWidth: 1,
    borderColor: Constants.COLOR.LIGHTGREY,
    borderRadius: 10,
  },
  listItemContainer: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex"
  },
  titleStyle: {
    fontSize: 14,
    color: "#252525"
  },
  textInput: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    color: "#666666"
  },
});

export default messageTemplateScreenStyle;
