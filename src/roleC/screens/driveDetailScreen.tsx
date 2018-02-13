import * as React from "react";
import { Component } from "react";
import { View, Text } from "react-native";
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import { connect, Dispatch } from "react-redux";
import * as Constants from "../../lib/Constants";

import { fetchDriveInfo , updateMileage } from "../reducers/drive/actions";

import CompleteInfo from "./CompleteInfo";
import IntentInfo from "./IntentInfo";
import DrivenInfo from "./DrivenInfo";

import IDriveInfo from "../interfaces/driveInfo";
import IDrive from "../interfaces/drive";

interface Props {
  driveInfo: IDriveInfo;
  driver: IDrive;
  navigator: any;
  dispatch: Dispatch<any>;
  fetchDriveInfo(activityId, leadId, navigator: any): void;
  updateMileage(navigator: any, params): void;
}

interface State {
}
class DriveDetailScreen extends Component<Props, State> {
  public state: State = {
  };

  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    this.props.fetchDriveInfo(this.props.driver.ActivityID, this.props.driver.LeadIDcontent, this.props.navigator);
  }

  public render(): JSX.Element {
    const intentInfo = this.props.driver ? <IntentInfo tabLabel="意向信息" navigator={this.props.navigator} driver={this.props.driveInfo} /> : null;
    const completeInfo = <CompleteInfo tabLabel="试驾后完善信息" driver={this.props.driveInfo} ObjectID={this.props.driver.ObjectID} updateMileage={this.props.updateMileage}  navigator={this.props.navigator} />;
    const drivenInfo = <DrivenInfo tabLabel="意向信息" navigator={this.props.navigator}  driver={this.props.driveInfo} />;
    //TODO: The status should be use a number or tech code.
    let viewContent = this.props.driver && this.props.driver.TestDrivenStatus !== "02" ? <ScrollableTabView
          renderTabBar={() => <DefaultTabBar />}
          tabBarBackgroundColor={Constants.COLOR.WHITE}
          tabBarActiveTextColor={Constants.COLOR.DARKGREY}
          tabBarInactiveTextColor={Constants.COLOR.GREY_999}
          locked={false}
          tabBarUnderlineStyle={{ backgroundColor: Constants.COLOR.DEEP_RED, height: 2 }} >
          {intentInfo}
          {completeInfo}
        </ScrollableTabView> : drivenInfo;
    return (
      <View style={{ flex: 1 }}>
         {viewContent}
      </View>
    );
  }

}

function mapStateToProps(state: any) {
  return {
    driveInfo: state.rolec_drive.driveInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDriveInfo: (activityId: string, leadId: string, navigator: any) => {
      dispatch(fetchDriveInfo(activityId, leadId, navigator));
    },
    updateMileage: (navigator: any, params: any) => {
      dispatch(updateMileage(navigator, params));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DriveDetailScreen);
