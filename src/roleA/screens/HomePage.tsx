import * as React from "react";
import { Component } from "react";
import * as Constants from "../../lib/Constants";
import { View, Text, ScrollView, Image, Modal, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect, Dispatch } from "react-redux";
import { fetchHomeList } from "../reducers/home/actions";
import styles from "../styles/HomePageStyles";
import IconButton from "../../app/components/IconButton";
import Resolution from "../../lib/Resolution";
import HomeLeadType from "../interfaces/HomeLeadType";
import globalStyles from "../../app/styles/GlobalStyle";
import RefreshModal from "../../app/components/RefreshModal";
import _ from "lodash";
import * as GlobalVariable from "../../lib/global";

interface Props {
  navigator: any;
  list: {
    data: any;
    refresh: boolean;
  };
  dispatch: Dispatch<any>;
  fetchHomeList(refresh: boolean, navigator: any): void;
}

interface State {
}

const iconWidth = (Constants.SCREEN_WIDTH - 3) / 3;
const iconHeight = (iconWidth * 4) / 5;

class HomePage extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    var that = this;
    this.props.fetchHomeList(true, this.props.navigator);
  }

  public render(): JSX.Element {
    return (
      <ScrollView>
        <Resolution.fixWidthView>
          <View>
            <Image source={require("../../../img/report_placeholder.png")} style={styles.backgroundImage} />
          </View>
          {this.renderTodayWork()}
          <RefreshModal visible={this.props.list.refresh} />
        </Resolution.fixWidthView>
      </ScrollView>
    );
  }
  private renderTodayWork() {
    let data = this.props.list.data;

    //count number for lead type
    let countArray = [];
    _.forIn(HomeLeadType, function(value, key) {
      let list = [];
      if (typeof data === "object" && data !== null) {
        list = data[key];
      }
      countArray.push({ count: list.length, data: list });
    });
    return (
      <View style={styles.form}>
        <View style={styles.formTitle}>
          <Text style={styles.formTitleText}>今日任务</Text>
        </View>
        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
          <IconButton badgeCount={countArray[0].count} label={HomeLeadType.H1} iconSrc="passengerFlow" onClick={() => this.pushPassengerFlowScreen(HomeLeadType.H1)} />
          <View style={{ height: iconHeight, width: 0.5, backgroundColor: Constants.COLOR.DIVIDER }} />
          <IconButton badgeCount={countArray[1].count} label={HomeLeadType.H2} iconSrc="newAssign" onClick={() => this.pushScreenWithoutCalendar(HomeLeadType.H2, countArray[6].data)} />
          <View style={{ height: iconHeight, width: 0.5, backgroundColor: Constants.COLOR.DIVIDER }} />
          <IconButton badgeCount={countArray[2].count} label={HomeLeadType.Z1} iconSrc="unfollow" onClick={() => this.pushScreenWithCalendar(HomeLeadType.Z1)} />
          {/* <View style={{height: iconWidth , width: 0.5, backgroundColor: Constants.COLOR.DIVIDER}} /> */}
        </View>
        <View style={{ height: 1, width: Constants.SCREEN_WIDTH, backgroundColor: Constants.COLOR.DIVIDER }} />
        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
          <IconButton badgeCount={countArray[3].count} label={HomeLeadType.Z2} iconSrc="unreached" onClick={() => this.pushScreenWithCalendar(HomeLeadType.Z2)} />
          <View style={{ height: iconHeight, width: 0.5, backgroundColor: Constants.COLOR.DIVIDER }} />
          <IconButton badgeCount={countArray[4].count} label={HomeLeadType.Z3} iconSrc="drive" onClick={() => this.pushScreenWithCalendar(HomeLeadType.Z3)} />
          <View style={{ height: iconHeight, width: 0.5, backgroundColor: Constants.COLOR.DIVIDER }} />
          <IconButton badgeCount={countArray[5].count} label={HomeLeadType.Z4} iconSrc="car" onClick={() => this.pushScreenWithCalendar(HomeLeadType.Z4)} />
        </View>
        <View style={{ height: 0.5, width: Constants.SCREEN_WIDTH, backgroundColor: Constants.COLOR.DIVIDER }} />
        <IconButton badgeCount={countArray[6].count} label={HomeLeadType.Z5} iconSrc="callback" onClick={() => this.pushScreenWithCalendar(HomeLeadType.Z5)} />
        {this.placeHolder()}
        <View style={{ height: 0.5, width: Constants.SCREEN_WIDTH, backgroundColor: Constants.COLOR.DIVIDER }} />
      </View>
    );
  }
  private placeHolder() {
    return (
      <View style={{ flexDirection: "row", width: Constants.SCREEN_WIDTH - iconWidth - 0.5, height: iconHeight }}>
        <View style={{ height: iconHeight, width: 0.5, backgroundColor: Constants.COLOR.DIVIDER }} />
        <View style={{ height: iconHeight, width: iconWidth }} />
        <View style={{ height: iconHeight, width: 0.5, backgroundColor: Constants.COLOR.DIVIDER }} />
        <View style={{ height: iconHeight, width: iconWidth }} />
      </View>
    );
  }
  private pushPassengerFlowScreen(title: string) {
    this.props.navigator.push({
      title: title,
      screen: "app.DefaultPage",
      animated: true,
      animationType: "slide-horizontal",
      navigatorStyle: {
        tabBarHidden: true
      }
    });
  }
  private pushScreenWithoutCalendar(title: string, data: any): void {
    //TODO
    this.props.navigator.push({
      title: title,
      screen: "consultant.TodayWorkScreenWithoutCalender",
      animated: true,
      animationType: "slide-horizontal",
      navigatorStyle: {
        tabBarHidden: true
      },
      passProps: {
        type: title,
        data: data
      }
    });
  }

  private pushScreenWithCalendar(title: string) {
    this.props.navigator.push({
      title: title,
      screen: "consultant.TodayWorkScreenWithCalender",
      animated: true,
      animationType: "slide-horizontal",
      navigatorStyle: {
        tabBarHidden: true
      },
      passProps: {
        type: title
      }
    });
  }
}
function mapStateToProps(state: any): any {
  return {
    list: state.rolea_home.home
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchHomeList: (refresh: boolean, navigator: any) => {
      dispatch(fetchHomeList(refresh, navigator));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
