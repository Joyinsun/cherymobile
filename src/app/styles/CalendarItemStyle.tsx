"use strict";
import { Image, StyleSheet } from "react-native";
import * as Constants from "../../lib/Constants";

const calendarItemStyles = StyleSheet.create({
  dateItem: {
    width: Math.floor(Constants.SCREEN_WIDTH / 7),
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    lineHeight: 25,
    marginTop: 16,
  },
  dateItemText: {
    fontSize: 13,
    color: Constants.COLOR.DARKGREY
  },
  selected: {
    backgroundColor: Constants.COLOR.RED,
    borderWidth: 1,
    borderRadius: 25
  },
  default: {
    backgroundColor: Constants.COLOR.WHITE,
    borderWidth: 0
  },
  bottomcircle: {
    height: 7,
    width: 7,
    marginTop: 5,
    borderRadius: 7,
    backgroundColor: Constants.COLOR.GREY_e3
  },
  reservationTrue: {
    backgroundColor: Constants.COLOR.GREY_5a
  },
  dayNameText: {
    fontSize: 15,
    color: Constants.COLOR.DARKGREY
  }
});

export default calendarItemStyles;
