import * as React from "react";
import { Component } from "react";
import { View, Text, TouchableHighlight, ListView, ScrollView, RefreshControl, StyleSheet, Modal, Switch, Button } from "react-native";
import { connect, Dispatch } from "react-redux";
import * as appActions from "../../app/reducers/app/actions";

import styles from "../styles/CounselorTabsScreenStyle";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";
import TabBar from "../../app/components/tabBar/TabBar";
import TabBarItem from "../../app/components/tabBar/TabBarItem";
import * as Constants from "../../lib/Constants";
import Common from "../../lib/Common";

import LeadItem from "../../app/components/leadItem";
import LeadPage from "./LeadPage";
import ActivityPage from "./ActivityPage";
import HeaderBar from "../components/headerBar";
import HomePage from "./HomePage";
import AboutConsultant from "./RoleA_AboutMe";
import Resolution from "../../lib/Resolution";

interface Props {
  navigator: any;
  userDetail: any;
  selectedTab: number;
  dispatch: Dispatch<any>;
  message: string;
}

interface State {
  selectedTab: number;
  animationType: "none" | "slide" | "fade";
  transparent: boolean;
}

class ConsultantTabsScreen extends Component<Props, State> {
  public switchRole: any;
  public state: State = {
    selectedTab: this.props.selectedTab ? this.props.selectedTab : 0,
    animationType: "none",
    transparent: false
  };

  public render(): JSX.Element {
    return (
      <View style={styles.container}>
        <TabBar
          style={styles.content}
          navFontSize = {11}
          navTextColor = "#252525"
          navTextColorSelected="#d93356"
          defaultPage={this.state.selectedTab}
          onItemSelected={(index) => {
            console.log(`current item"s index is ${index}`);
          }}>
         <TabBarItem
            icon={require("../../../img/home_unselected.png")}
            selectedIcon={require("../../../img/home_selected.png")}
            onPress={() => {
              this._setSelectedTab(0);
            }}
            title="首页">
            <View style={styles.container}>
              <HeaderBar headerTitleImage={"首页"} rightIconName={"message-circle"} />
              <HomePage navigator={this.props.navigator} />
            </View>
        </TabBarItem>
          <TabBarItem
            icon={require("../../../img/lead_unselected.png")}
            selectedIcon={require("../../../img/lead_selected.png")}
            onPress={() => {
              this._setSelectedTab(1);
            }}
            title="线索">
            <View style={styles.container}>
              <HeaderBar headerTitle={"线索"} />
              <LeadPage navigator={this.props.navigator} />
            </View>
          </TabBarItem>
          <TabBarItem
            center={true}
            icon={require("../../../img/Group57.png")}
            selectedIcon={require("../../../img/Group57.png")}
            onPress={this.navigateToAddPage.bind(this)}>
            <View />
          </TabBarItem>
          <TabBarItem
            icon={require("../../../img/activity_unselected.png")}
            selectedIcon={require("../../../img/activity_selected.png")}
            onPress={() => {
              this._setSelectedTab(3);
            }}
            title="活动">
            <View style={styles.container}>
              <HeaderBar headerTitle={"活动"} />
              <ActivityPage navigator={this.props.navigator} />
            </View>
          </TabBarItem>
          <TabBarItem
          icon={require("../../../img/me_unselected.png")}
          selectedIcon={require("../../../img/me_selected.png")}
            onPress={() => {
              this._setSelectedTab(4);
            }}
            title="我的">
            <View style={styles.container}>
              <HeaderBar headerTitle={"我的"} />
              <AboutConsultant navigator={this.props.navigator} dispatch={this.props.dispatch} />
            </View>
          </TabBarItem>
        </TabBar>
      </View>
    );
  }
  private navigateToAddPage(): void {
    this.props.navigator.push({
      title: Constants.CN_INPUT_MOBILE_NUMBER,
      screen: "consultant.CreateLeadScreen",
      transparent: false,
      passProps: {},
      navigatorStyle: {
        tabBarHidden: true
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: require("../../../img/icon_Close@2x.png"),
            title: "Create Clue",
            id: "avatar"
          }
        ]
      }
    });
  }
  private _setSelectedTab(index: number): void {
    this.props.dispatch(appActions.updateSelectedTab(index));
  }
}

function mapStateToProps(state: any) {
  return {
    userDetail: state.app.userDetail
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantTabsScreen);
