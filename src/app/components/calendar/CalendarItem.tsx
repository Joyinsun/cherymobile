"use strict";

import * as React from "react";
import { Component } from "react";
import * as Constants from "../../../lib/Constants";
import { StyleSheet, View, TouchableOpacity, Text, DeviceEventEmitter } from "react-native";

import util from "../../../lib/util";
import styles from "../../styles/CalendarItemStyle";

interface Props {
    date: Date;
    day: any;
    isReserList: any;
    index: number;
    callback: any;
    filedName: string;
}

interface State {
}

class CalendarItem extends Component<Props, State> {

  public render(): JSX.Element {
    let date = this.props.date;
    let isReser = this.props.isReserList,
      fieldName = this.props.filedName;

    return (
      <View style={[styles.dateItem]}>
        <Text style={styles.dayNameText}>{util.getWeekdayName(date)}</Text>
      <TouchableOpacity style={[styles.background, this.props.day[date.getDay()].selected === false ? styles.default : styles.selected]} onPress={(event) => this.pressEvent(event, date)}>
          <Text style={styles.dateItemText}>{date.getDate().toString().length == 1 ? "0" + date.getDate() : date.getDate()}</Text>
        </TouchableOpacity>
        <View style={[styles.bottomcircle, isReser == null ? null : (isReser[fieldName] === true ? styles.reservationTrue : styles.bottomcircle)]}></View>
      </View>
    );
  }
  private pressEvent(event, mydate): void {
    let dayArr = this.props.day;
    let reserveArr = [];
    dayArr.map((t) => { t.id !== mydate.getDay() ? t.selected = false : t.selected = true; });
    DeviceEventEmitter.emit("Msg", dayArr);
    DeviceEventEmitter.emit("Current", [mydate, this.props.index]);
    return this.props.callback(this.props.isReserList == null ? [] : this.props.isReserList, mydate, this.props.index);
  }
}

export default CalendarItem;
