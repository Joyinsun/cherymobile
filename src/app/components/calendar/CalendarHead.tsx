"use strict";

import * as React from "react";
import { Component } from "react";
import * as Constants from "../../../lib/Constants";
import { View, Text, StyleSheet, Platform } from "react-native";
import util from "../../../lib/util";

const styles = StyleSheet.create({
  head: {
    height: 35,
    paddingTop: 9,
    backgroundColor: Constants.COLOR.WHITE,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: Constants.COLOR.GREY_666,
    fontSize: 14
  }
});

interface Props {
    date: Date;
}

interface State {
}

class CalendarHead extends Component<Props, State> {
  public render(): JSX.Element {
    let date = this.props.date;
    return (
      <View>
      <View style={styles.head}>
      <Text  style = {styles.text}>{util.dateFormat(date, "chinese")}</Text>
      </View>
      </View>
      );
  }
}

export default CalendarHead;
