"use strict";

import * as React from "react";
import { Component } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, ActivityIndicatorIOS, Platform, RefreshControl, Modal } from "react-native";
import { connect, Dispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Constants from "../../lib/Constants";
import * as appActions from "../../app/reducers/app/actions";
import { fetchPendingDriveList } from "../reducers/drive/actions";
import DriveItem from "../components/driveItem";
import IDrive from "../interfaces/drive";
import styles from "../styles/homeScreenStyle";
import * as GlobalVariable from "../../lib//global";
import Resolution from "../../lib/Resolution";
interface Props {
  drive: {
    data: Array<IDrive>,
    refresh: boolean,
    totalNumber: number
  };
  navigator: any;
  dispatch: Dispatch<any>;
  fetchPendingDriveList(userDetail: any, navigator: any, refresh: boolean): void;
}

interface State {
}

class HomeScreen extends Component<Props, State> {
  public state: State = {
  };

  private moment: any = require("moment");

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  public componentDidMount() {
    this.props.fetchPendingDriveList(GlobalVariable.userdetail, this.props.navigator, true);
  }

  public render(): JSX.Element {
    if (typeof (this.props.drive) === "undefined") {
      return (null);
    } else {
      this.props.navigator.setTabBadge({
        badge: this.props.drive.totalNumber
      });
      let driveList = this.props.drive.data;
      let pageContent = (
        <FlatList
          style={{ backgroundColor: "white", height: "150%" }}
          data={driveList}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => this._renderItem(item)}
          ListFooterComponent={this._renderFooterLine.bind(this)}
          ListEmptyComponent={() => (<Text> 今天没有试驾预约 </Text>)}
          refreshing={this.props.drive.refresh}
          onRefresh={this.onRefresh.bind(this)}>
        </FlatList>);
      return (
        <Resolution.fixWidthView>
          <View style={styles.container}>
            <View style={styles.headerLogoContainer}>
              <View style={styles.logoContainer}>
                <Image source={require("../../../img/logo@3x.png")}
                style={styles.logoImg} />
              </View>
              <View style={styles.notiContainer}>
                <Image source={require("../../../img/icon_noti.png")} />
              </View>
            </View>
            <View>
              <Image source={require("../../../img/report_placeholder.png")}
                style={styles.backgroundImage} />
            </View>
            <View style={styles.headerContainer}>
              <View style={[styles.arrangementContainer, { flex: 1 }]}>
                <Text style={styles.arrangementText}> 今日任务 </Text>
              </View>
            </View>
            <View style={styles.bottomLine} />
            <View style={[styles.container, { height: 288 }]}>
              {pageContent}
            </View>
          </View>
        </Resolution.fixWidthView>);
    }
  }

  private _renderItem(drive: any): JSX.Element {
    let { DriverID, LeadIDcontent, ActivityID, CustomerName, AppointmentDate, VehicleModel, VehicleModeID, NextActivityTime, TestDrivenStatus, SalesRepName, SalesRepID, CreationDate } = drive;
    const driveItem: IDrive = { DriverID, LeadIDcontent, ActivityID, CustomerName, AppointmentDate, VehicleModel, VehicleModeID, NextActivityTime, TestDrivenStatus, SalesRepName, SalesRepID, CreationDate };
    return (<DriveItem drive={driveItem} navigator={this.props.navigator} />);
  }

  private _renderFooterLine(): JSX.Element {
    if (this.props.drive.refresh) {
      return (null);
    } else {
      return (
        <Text style={styles.footerLine} > -- 木有更多了~ --</Text>
      );
    }
  }

  private _setModalVisible(visible: boolean): void {
    this.setState({
      modalVisible: visible
    });
  }

  private onNavigatorEvent(event: any): void {
    if (event.id) {
      switch (event.id) {
        case "notification":
          // alert("navigate to notification page...");
          break;
        default:
          break;
      }
    } else {
      return null;
    }
  }

  private formatStatusColor(drive: IDrive): string {
    return (drive.TestDrivenStatus === "已预约") ? "lightblue" : "lightgrey";
  }

  private onRefresh(): void {
    this.props.fetchPendingDriveList(GlobalVariable.userdetail, this.props.navigator, true);
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
}

function mapStateToProps(state: any) {
  return {
    drive: state.rolec_drive.pendingDriveList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPendingDriveList: (userDetail: any, navigator: any, refresh: boolean) => {
    dispatch(fetchPendingDriveList(userDetail, navigator, refresh));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
