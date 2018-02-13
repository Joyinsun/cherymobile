"use strict";

import * as React from "react";
import { Component } from "react";
import * as Constants from "../../lib/Constants";

// import TimerEnhance from "react-native-smart-timer-enhance";
import { View, Text, RefreshControl, Button, FlatList, ScrollView, ActivityIndicator, ActivityIndicatorIOS, StyleSheet, Dimensions, Platform, TouchableOpacity, Animated, Easing } from "react-native";

import { connect, Dispatch } from "react-redux";
import { fetchDriveList, fetchFilterData, resetFilter, fetchedDriveList } from "../reducers/drive/actions";
import SegmentedControlTab from "react-native-segmented-control-tab";
import _ from "lodash";

import Common from "../../lib/Common";

import DriveItem from "../components/driveItem";
import IDrive from "../interfaces/drive";
import IPager from "../../app/interfaces/pager";

import SearchBar from "../../app/components/searchBar";
import FilterMenu from "../../app/components/filterMenu";
import Resolution from "../../lib/Resolution";
import styles from "../styles/testDriveScreenStyle";
import * as GlobalVariable from "../../lib//global";

interface Props {
  navigator: any;
  drive: {
    data: IPager<IDrive>,
    refresh: boolean
  };
  filterData: Array<Array<string>>;
  selectIndex: Array<number>;
  dispatch: Dispatch<any>;
  // userDetail: any;
  fetchFilterData(navigator: any, uid: string): void;
  fetchDriveList(params: object, navigator: any, refresh: boolean): any;
  resetFilter(filterData: Array<Array<string>>): void;
}

interface State {
  dataList: Array<IDrive>;
  filterParams: any;
  selectedTab: number;
  selectedFilter: Array<number>;
}

class TestDriveScreen extends Component<Props, State> {

  // public _dataSource: any = new ListView.DataSource({
  //   rowHasChanged: (r1, r2) => r1 !== r2
  // });

  public state: State = {
    dataList: [],
    filterParams: {},
    selectedTab: 0,
    selectedFilter: [0, 0, 0]
  };

  constructor(props) {
      super(props);
      this.onTabChange(this.state.selectedTab, false);
  }

  public componentWillMount() {
    this.loadFilterData({});
  }

  public componentDidMount() {
    this.loadDriveList({}, true);
  }

  public componentWillReceiveProps(newProps: Props): void {
    let newDrive = newProps.drive;
    if (newDrive.data && newDrive.data.list) {
      this.setState({
        dataList: (newDrive.data.currentPage != 1) ? this.state.dataList.concat(newDrive.data.list) : newDrive.data.list
      });
    } else {
      return;
    }
  }
  public render() {
    if (typeof (this.props.filterData) === "undefined") {
      return (null);
    } else {
      // let dataSource = this._dataSource.cloneWithRows(this.state.dataList);
      return (
      <Resolution.fixWidthView>
        <View style={styles.viewContainer} >
            <SegmentedControlTab
                values={["待试驾", "已试驾"]}
                selectedIndex={this.state.selectedTab}
                onTabPress={(e) => {this.onTabChange(e, true); }}
                borderRadius={4}
                tabsContainerStyle={styles.tabContainer}
                tabStyle={styles.tab}
                activeTabStyle={{ backgroundColor: "#000" }}
                tabTextStyle={styles.tabTextStyle}
                activeTabTextStyle={styles.activeTabTextStyle} />
          			<FilterMenu
          				arrowImg={""}
          				checkImage={""}
          				bgColor={"white"}
          				tintColor={"gray"}
          				selectItemColor={"gray"}
          				data={this.props.filterData}
          				maxHeight={410}
          				onPressReset={this.reset}
          				handler={ (selectIndex) => { this.onSelectFilter(selectIndex); } }
          				resetButtonName={"清空"}>
                          <View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: Constants.COLOR.BG_COLOR }}/>
                        <FlatList
                          keyExtractor={(item, index) => index}
                          data={this.state.dataList ? this.state.dataList : []}
                          renderItem={({ item }) => this._renderItem(item)}
                          onEndReached={this.onLoadMore.bind(this)}
                          ListFooterComponent={this.renderFooterLine.bind(this)}
                          onEndReachedThreshold={0.1}
                          refreshing={this.props.drive.refresh}
                          onRefresh={() => this.onRefresh()}>
                        </FlatList>
          			</FilterMenu>
            </View>
        </Resolution.fixWidthView>);
    }
  }

  private onRefresh(): void {
      this.onTabChange(this.state.selectedTab, false);
  }

  private onLoadMore(e): void {
    if (this.props.drive.data && this.state.dataList && this.state.dataList.length >= 10) {
        this.loadDriveList({page: this.props.drive.data.currentPage + 1}, true);
    } else {
        return;
    }
  }

  private _renderItem(drive: any): JSX.Element {
    let { DriverID, LeadIDcontent, ActivityID, CustomerName, VehicleModel, VehicleModeID, NextActivityTime, TestDrivenStatus, SalesRepName, SalesRepID, AppointmentDate, CreationDate } = drive;
    const driveItem: IDrive = { DriverID, LeadIDcontent, ActivityID, CustomerName, VehicleModel, VehicleModeID, NextActivityTime, TestDrivenStatus, SalesRepName, SalesRepID, AppointmentDate, CreationDate };
    return (<DriveItem drive={driveItem} navigator={this.props.navigator} />);
  }

  private renderFooterLine() {
      if (this.props.drive.refresh) {
        return (null);
      } else {
        return (
          <Text style={styles.footerLine} > -- 木有更多了~ --</Text>
        );
      }
  }

  private loadFilterData(params: any): void {
      this.props.fetchFilterData(this.props.navigator, _.merge({
          filter: {
              TestDrivenStatus: ["TestDrivenStatus", "eq", "\'0" + (this.state.selectedTab + 1 || 1) + "\'"],
              DriverID: ["DriverID", "eq", GlobalVariable.userdetail.sciUserId && GlobalVariable.userdetail.sciUserId ? "\'" + GlobalVariable.userdetail.sciUserId + "\'" : ""]
          }
      }, params));
  }

  private loadDriveList(params: any, refresh: boolean): void {
      this.props.fetchDriveList( _.merge({
          filter: {
              TestDrivenStatus: ["TestDrivenStatus", "eq", "\'0" + (this.state.selectedTab + 1 || 1) + "\'"],
              DriverID: ["DriverID", "eq", GlobalVariable.userdetail.sciUserId && GlobalVariable.userdetail.sciUserId ? "\'" + GlobalVariable.userdetail.sciUserId + "\'" : ""]
          },
          page: 1
      }, {
          filter: this.state.filterParams
        }, params), this.props.navigator, refresh || true);
  }

  private onSelectFilter(selectIndex: Array<number>): void {
      const moment: any = require("moment");
      let { filterData } = this.props;
      let self = this;

      let filter = {},
          keywords = ["SalesManName", "VehicleModel", "AppointmentDate"];

      _.forEach(selectIndex, function (value, key) {
          if (value > 0) {
              let filterKey = keywords[key];
              let filterValue = key !== 2 ? filterData[key][value] : "datetime" + "\'" + (value - 1 ? moment(new Date()).add(value - 1, "days").format("YYYY-MM-DDT00:00:00") : moment(new Date()).format("YYYY-MM-DDT00:00:00")) + "\'" ;
              filter[filterKey] = [filterKey, "eq", filterValue];
          }
      });
      this.setState({
          filterParams: filter
      }, () => {
          this.loadDriveList({filter: filter}, true);
      });
  }

  private reset = () => {
      const filterData = this.props.filterData;
      this.props.resetFilter(filterData);
      this.setState({
          filterParams: {}
      }, () => {
          this.loadDriveList({}, true);
          this.loadFilterData({});
      });
  }

  private fetchFilterResult(selectIndex: Array<number>) {
      this.loadDriveList({}, true);
  }

  private onTabChange(i: number, reset: boolean): void {
      let states  = {
          selectedTab: i || 0
      };

      if (reset) {
          states["filterParams"] = {};
          states["selectedFilter"] = [0, 0, 0];
      }

      this.setState(states, () => {
          this.loadDriveList({}, true);
          this.loadFilterData({});
      });
  }
  private renderActivityIndicator(): JSX.Element {
    return ActivityIndicator
      ? (
        <ActivityIndicator
          style={styles.customMarginRight}
          animating={true}
          color={Constants.COLOR.GREY}
          size={"small"} />
      )
      : Platform.OS === "android"
        ? (
          <ActivityIndicator
            style={styles.customMarginRight}
            color={Constants.COLOR.GREY}
            size={"small"} />

        )
        : (
          <ActivityIndicatorIOS
            style={styles.customMarginRight}
            animating={true}
            color={Constants.COLOR.GREY}
            size={"small"} />
        );
  }
  private onNavigation(targetScreent: string, drive?: IDrive): void {
    Common.callOnceEvent(() => {
        switch (targetScreent) {
          case "driveDetail":
            let screenTitle = drive.CustomerName + "申请试驾";
            this.props.navigator.push({
              title: screenTitle,
              screen: "driver.TestDriveScreen",
            });
            break;
          default:
            break;
        }
    });
  }

  private onSearch(): void {
    this.props.navigator.push({
      title: "",
      screen: "consultant.SearchScreen",
      animated: true,
      navigatorStyle: { navBarHidden: true },
      animationType: "slide-up",
      passProps: {
        navigator: this.props.navigator
      }
    });
  }
}

function mapStateToProps(state: any) {
	return {
		drive: state.rolec_drive.driveList,
		selectIndex: state.rolec_drive.selectIndex,
		filterData: state.rolec_drive.filterData
        // userDetail: state.app.userDetail
	};
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDriveList: (params: any, navigator: any, refresh: boolean) => {
      dispatch(fetchDriveList(params, navigator, refresh));
    },
    fetchFilterData: (navigator: any, uid: string) => {
        dispatch(fetchFilterData(navigator, uid));
    },
    resetFilter: (filterData: Array<Array<string>>) => {
        dispatch(resetFilter(filterData));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestDriveScreen);
