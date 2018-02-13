"use strict";

import * as React from "react";
import { Component } from "react";
import * as Constants from "../../../lib/Constants";
import { StyleSheet, View, Text, TouchableOpacity, Platform, DeviceEventEmitter } from "react-native";

import CalendarItem from "./CalendarItem";
import util from "../../../lib/util";

const styles = StyleSheet.create({
  panel: {
  	flexDirection: "row",
    flexWrap: "nowrap",
	  width: Constants.SCREEN_WIDTH,
	  //height: Platform.OS === "ios" ? 120 : 120,
    backgroundColor: Constants.COLOR.WHITE
}
});

interface Props {
    date : Date;
    isReserList: Array<string>;
    index: number;
    filedName: string;
    callback: any;
}

interface State {
	day: any;
	msgListener: any;
}
class CalendarPanel extends Component<Props, State> {
	public state: State = {
		day:
		    [
		    {id: 0, selected: false},
		    {id: 1, selected: false},
		    {id: 2, selected: false},
		    {id: 3, selected: false},
		    {id: 4, selected: false},
		    {id: 5, selected: false},
		    {id: 6, selected: false}
		    ],
		 msgListener: null
	};
	public componentWillMount() {
		let today = new Date();
		this.state.day.map((d) => d.id == today.getDay() ? d.selected = true : d.selected = false);
	}
	public componentDidMount() {
		this.state.msgListener = DeviceEventEmitter.addListener("Msg", (day) => {
            this.setState({
                day: day
            });
        });
	}
	public componentWillUnmount() {
        if (this.state.msgListener) {
        	this.state.msgListener.remove();
        }
    }
    public render(): JSX.Element {
        return (
            <View style={[styles.panel]}>
		      {util.getWeekArr(this.props.date, this.props.index).map((d, index) =>
		        <CalendarItem
		          key={d.getMonth().toString() + d.getDate()}
		          date={d}
		          isReserList = {this.props.isReserList ? this.props.isReserList[index] : []}
		          day = {this.state.day}
		          index = {index}
		          callback = {this.props.callback}
		          filedName = {this.props.filedName}
		        />
		        )}
		      </View>
		      );
    }
}

export default CalendarPanel;
