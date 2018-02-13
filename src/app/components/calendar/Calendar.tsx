"use strict";

import * as React from "react";
import { Component } from "react";
import { ScrollView, ViewPagerAndroid, View, Text, StyleSheet, Platform, DeviceEventEmitter } from "react-native";

import util from "../../../lib/util";
import * as Constants from "../../../lib/Constants";
import { connect, Dispatch } from "react-redux";

import CalendarHead from "./CalendarHead";
import CalendarPanel from "./CalendarPanel";
import CalendarItem from "./CalendarItem";

const styles = StyleSheet.create({
  container: {
    height: 90
  },
  borderColor: {
    borderBottomWidth: 0.5,
    borderBottomColor: Constants.COLOR.GREY_ddd
  },
  case: {
    width: Constants.SCREEN_WIDTH,
    height: 40,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Constants.COLOR.WHITE
  },
  caseItem: {
    color: Constants.COLOR.DARKGREY,
    fontSize: 15
  },
  circleDefault: {
    width: 7,
    height: 7,
    position: "relative",
    marginLeft: Math.floor(Constants.SCREEN_WIDTH / 14),
    marginRight: 10,
    borderRadius: 7,
    backgroundColor: Constants.COLOR.GREY_e3
  },
  circleFalse: {
    marginLeft: 24,
    backgroundColor: Constants.COLOR.GREY_5a
  }
});

interface Props {
  dataList: any;
  scroll: any;
  callback: any;
  filedName: string;
  textArr: Array<string>;
}

interface State {
	currentDate: Date;
	nextWeekDate: Date;
	preWeekDate: Date;
	today: Date;
	currListener: any;
	isReserList: any;
  index: number;
}

class Calendar extends Component<Props, State> {
  public scrollView : any;
  public state: State = {
    today: new Date(),
    currentDate: new Date(),
    nextWeekDate: util.getNextWeekDate(new Date()),
    preWeekDate: util.getPreWeekDate(new Date()),
    currListener: null,
    isReserList: this.props.dataList ? this.props.dataList : [],
    index: 0
  };
  public render() {
    const { preWeekDate, currentDate, nextWeekDate, today } = this.state;
    if (Platform.OS === "ios") {
      return (
        <View style = {[styles.borderColor]}>
          <CalendarHead date={currentDate} />
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            onMomentumScrollEnd={(event) => this.scrollEnd(event)}
            contentOffset={{ x: Constants.SCREEN_WIDTH }}
            ref={(scrollView) => this.scrollView = scrollView}
            style = {styles.container}
          >
            <CalendarPanel
              date={preWeekDate}
              isReserList={this.state.isReserList}
              index={this.state.index}
              callback={this.props.callback}
              filedName={this.props.filedName}
            />
            <CalendarPanel
              date={currentDate}
              isReserList={this.state.isReserList}
              index={this.state.index}
              callback={this.props.callback}
              filedName={this.props.filedName}
            />
            <CalendarPanel
              date={nextWeekDate}
              isReserList={this.state.isReserList}
              index={this.state.index}
              callback={this.props.callback}
              filedName={this.props.filedName}
            />
          </ScrollView>
          <View style={styles.case}>
            <View style={[styles.circleDefault, styles.circleFalse]} />
            <Text style={styles.caseItem}>{this.props.textArr[0]}</Text>
            <View style={[styles.circleDefault]} />
            <Text style={styles.caseItem}>{this.props.textArr[1]}</Text>
          </View>
        </View>
      );
    } else {
    return (
      <View style={styles.borderColor}>
        <CalendarHead date={currentDate} />
        <ViewPagerAndroid
          initialPage={1}
          onPageSelected={(event) => this.scrollEnd(event)}
          ref={(scrollView) => this.scrollView = scrollView}
          style={styles.container}
        >
          <CalendarPanel
            date={preWeekDate}
            isReserList={this.state.isReserList}
            index={this.state.index}
            callback={this.props.callback}
            filedName={this.props.filedName}
          />
          <CalendarPanel
            date={currentDate}
            isReserList={this.state.isReserList}
            index={this.state.index}
            callback={this.props.callback}
            filedName={this.props.filedName}
          />
          <CalendarPanel
            date={nextWeekDate}
            isReserList={this.state.isReserList}
            index={this.state.index}
            callback={this.props.callback}
            filedName={this.props.filedName}
          />
        </ViewPagerAndroid>

        <View style={styles.case}>
          <View style={[styles.circleDefault, styles.circleFalse]} />
          <Text style={styles.caseItem}>{this.props.textArr[0]}</Text>
          <View style={[styles.circleDefault]} />
          <Text style={styles.caseItem}>{this.props.textArr[1]}</Text>
        </View>
      </View>
    );
  }
  }
  public componentWillReceiveProps(newProps: Props): void {
        if (newProps.dataList) {
          let newReserve = newProps.dataList;
          this.setState({
              isReserList: newProps.dataList
            });
        }
      }
      public componentDidMount() {
        this.state.currListener = DeviceEventEmitter.addListener("Current", (day) => {
          this.setState({
            currentDate: day[0],
            index: day[1],
            preWeekDate: util.getPreWeekDate(day[0]),
            nextWeekDate: util.getNextWeekDate(day[0])
          });
        });
      }
      public componentWillUnmount() {
        if (this.state.currListener) {
          this.state.currListener.remove();
        }
      }
      private scrollEnd(event) {
        const scrollView = this.scrollView;
        const { currentDate } = this.state;
        let changeDate = currentDate;

        if (Platform.OS === "ios") {
          const offsetX = event.nativeEvent.contentOffset.x;
          if (offsetX < Constants.SCREEN_WIDTH) {
          //上周
        if (!util.isSameDate(util.getWeekArr(currentDate, this.state.index)[0])) {
          changeDate = util.getPreWeekDate(currentDate);
        } else {
          changeDate = this.state.currentDate;
        }
      } else {
          //下周
          changeDate = util.getNextWeekDate(currentDate);
        }

        if (offsetX !== Constants.SCREEN_WIDTH) {
          scrollView.scrollTo({x: Constants.SCREEN_WIDTH, animated: false});
        }
      } else {
      if (event.nativeEvent.position === 0) {
        //上周
        if (!util.isSameDate(util.getWeekArr(currentDate, this.state.index)[0])) {
          changeDate = util.getPreWeekDate(currentDate);
        }
      } else {
          //下周
          changeDate = util.getNextWeekDate(currentDate);
        }
        scrollView.setPageWithoutAnimation(1);
      }
      this.props.scroll();

      this.setState({
        currentDate: changeDate,
        nextWeekDate: util.getNextWeekDate(changeDate),
        preWeekDate: util.getPreWeekDate(changeDate)
      });
    }
  }

export default Calendar;
