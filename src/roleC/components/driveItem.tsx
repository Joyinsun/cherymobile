"use strict";

import * as React from "react";
import { Component } from "react";
import { TouchableHighlight, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IDrive from "../interfaces/drive";

import styles from "../styles/driveItemComponentStyle";
import util from "../../lib/util";
import Common from "../../lib/Common";
import * as Constants from "../../lib/Constants";

interface Props {
  navigator: any;
  drive: IDrive;
  statusBackgroundColor?: string;
}

interface State {
}

class DriveItem extends Component<Props, State> {
  public state: State = {
  };

  private moment: any = require("moment");

  public render(): JSX.Element {
    if (this.props.drive) {
      const drive = this.props.drive;
      let testDriveStatus = drive.TestDrivenStatus;
      if (testDriveStatus === "01" ) {
        testDriveStatus = Constants.CN_ORDERED_DRIVE_STATUS;
      } else if (testDriveStatus === "02" ) {
        testDriveStatus = Constants.CN_TEST_DRIVED_STATUS;
      }
      const driveDate = (testDriveStatus === Constants.CN_ORDERED_DRIVE_STATUS) ? this.moment(drive.AppointmentDate).format("YYYY-MM-DD") : this.moment(drive.CreationDate).format("YYYY-MM-DD");
      return (
        <View style={styles.container}>
          <TouchableHighlight style={{ width: "100%"}} underlayColor={Constants.COLOR.LIGHTGREY} onPress={this.onPressItem.bind(this)}>
            <View style={styles.driveItemContainer}>
              <View style={styles.driveItemContainer} >
                <View style={styles.textContainer} >
                  <Text style={styles.customerName}> {drive.CustomerName} </Text>
                  <Text style={styles.normalText}> 销售顾问</Text>
                </View>
                <View style={[styles.textContainer]} >
                <Text style={styles.intentCar}> {drive.VehicleModel}  </Text>
                <Text style={styles.normalText}> {drive.SalesRepName} </Text>
                </View>
              </View>
              <View style={styles.driveItemContainer}>
                <View style={styles.statusContainer}>
                  <Text style={styles.statusText}> {drive.TestDrivenStatus} </Text>
                  <Text style={styles.normalText}> {driveDate} </Text>
                </View>
                <Icon name="chevron-right" size={24} style={styles.rightIcon} />
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.bottomLine} />
        </View>);
    } else {
      return (null);
    }
  }
  private onPressItem() {
    let customerName = this.props.drive.CustomerName ? this.props.drive.CustomerName : " ";
    Common.callOnceEvent(() => this.props.navigator.push({
      title: customerName + "申请试驾",
      screen: "driver.DriveDetailScreen",
      passProps: {
        driver: this.props.drive,
      },
      navigatorStyle: {
        tabBarHidden: true
      }
    }));
  }
}

export default DriveItem;
