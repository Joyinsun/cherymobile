import * as React from "react";
import { Component  } from "react";
import { Animated, Easing, StyleSheet, ListView, Image, View, Text, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import DashLine from "./../DashLine/dashline";
import ButtonGroup from "./../TextGroup/textgroup";
import styles from "./timelineStyle";
import * as Constants from "../../../lib/Constants";
import Util from "../../../lib/util";

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});
interface Props {
  data?: any;
  style?: any;
  options?: any;
  roleName: string;
  onPressCall?: any;
  onPressLocal?: any;
  onPressSMS?: any;
  onPressWeChat?: any;
  bCallEnable: boolean;
  bSMSEnable: boolean;
  bLocalEnable: boolean;
  bWechatEnable: boolean;
  bKnockdown: boolean;
  bOrderPlaced: boolean;
}
interface State {
  data: any;
  dataSource: any;
  rowIds: any;
}

export default class Timeline extends Component<Props, State> {
  public aTypes: any = [Constants.CODE_ACTIVITY_GROUPCODE_CALL, Constants.CODE_ACTIVITY_GROUPCODE_SMS, Constants.CODE_ACTIVITY_GROUPCODE_LOCAL, Constants.CODE_ACTIVITY_GROUPCODE_WECHAT];
  public state: State = {
    data: [],
    dataSource: ds.cloneWithRows([]),
    rowIds: [],
  };
  constructor(props, context) {
    super(props, context);
    let aData = this.props.data;
    if (aData[0] !== "") {
      aData.unshift("");
    }
    this.state.data = aData;
    this.state.dataSource = ds.cloneWithRows(aData);
  }
  public componentWillReceiveProps(nextProps) {
    let aData = nextProps.data;
    if (aData[0] !== "") {
      aData.unshift("");
    }

    let oState = {
      data: aData,
      dataSource: ds.cloneWithRows(aData),
      rowIds: []
    };
    this.setState(oState);
  }
  public render() {
    if (!(this.props.data.length > 1)) {
      return (<View></View>);
    }
    return (
      <View style={[styles.container, this.props.style]}>
        <ListView
          ref="listView"
          style={[styles.listview]}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          automaticallyAdjustContentInsets={false}
          {...this.props.options} />
      </View>
    );
  }

  private _renderRow(rowData, sectionID, rowID) {
    let content = null;
    if (rowID === "0") {
      if (this.props.roleName !== "manager2" && this.props.roleName !== "manager") {
        content = (
          <View>
            {this._renderToolBar(rowData, sectionID, rowID)}
          </View>
        );
      }
    } else {
      content = (
        <View style={[{ flex: 1 }]}>
          <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
            {this._renderTitileIcon(rowData, sectionID, rowID)}
            {this._renderTitile(rowData, sectionID, rowID)}
          </View>
          {this._renderDetail(rowData, sectionID, rowID)}
        </View>
      );
    }
    return (
      <View key={rowID} style={{ marginBottom: 5, borderWidth: 0 }}>
        {/* Attention: please do not delete property `borderWidth: 0`*/}
        {content}
      </View>
    );
  }

  private _pressCall() {
    this.props.onPressCall(this);
  }
  private _pressLocal() {
    this.props.onPressLocal(this);
  }
  private _pressSMS() {
    this.props.onPressSMS(this);
  }
  private _pressWeChat() {
    this.props.onPressWeChat(this);
  }
  private _renderToolBar(rowData, sectionID, rowID) {
    let oCall = this.props.bCallEnable
      ? (<TouchableOpacity
        onPress={this._pressCall.bind(this)}
      >
        <Image
          style={styles.toolBarIcon}
          source={require("../../../../img/phone.png")}
        />
      </TouchableOpacity>)
      : (<Image
        style={styles.toolBarIcon}
        source={require("../../../../img/phone.png")}
      />);
    let oSMS = this.props.bSMSEnable
      ? (<TouchableOpacity
        onPress={this._pressSMS.bind(this)}
      >
        <Image
          style={styles.toolBarIcon}
          source={require("../../../../img/message.png")}
        />
      </TouchableOpacity>)
      : (<Image
        style={styles.toolBarIcon}
        source={require("../../../../img/message.png")}
      />);
    let oLocal = this.props.bLocalEnable
      ? (<TouchableOpacity
        onPress={this._pressLocal.bind(this)}
      >
        <Image
          style={styles.toolBarIcon}
          source={require("../../../../img/store.png")}
        />
      </TouchableOpacity>)
      : (<Image
        style={styles.toolBarIcon}
        source={require("../../../../img/store.png")}
      />);
    let oWechat = this.props.bWechatEnable
      ? (<TouchableOpacity
        onPress={this._pressWeChat.bind(this)}
      >
        <Image
          style={styles.toolBarIcon}
          source={require("../../../../img/wechat.png")}
        />
      </TouchableOpacity>)
      : (<Image
        style={styles.toolBarIcon}
        source={require("../../../../img/wechat.png")}
      />);
    return (
      <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
        {this._renderTitileIcon(rowData, sectionID, rowID)}
        <View style={[styles.toolBar, styles.itemContentCard]}>
          {oCall}
          {oSMS}
          {oLocal}
          {oWechat}
        </View>
      </View>
    );
  }
  private expandDetail(rowID) {
    let aRowIds = this.state.rowIds;
    aRowIds.push(rowID);
    this.setState({
      data: this.state.data,
      dataSource: ds.cloneWithRows(this.state.data),
      rowIds: aRowIds
    });
  }
  private unexpandDetail(rowID) {
    let aRowIds = this.state.rowIds;
    let iIndex = aRowIds.indexOf(rowID);
    if (iIndex > -1) {
      aRowIds.splice(iIndex, 1);
    }
    this.setState({
      data: this.state.data,
      dataSource: ds.cloneWithRows(this.state.data),
      rowIds: aRowIds
    });
  }
  private _renderDetail(rowData, sectionID, rowID) {
    let dashLineDisplay = Number.parseInt(rowID) !== this.state.data.length - 1 ? "block" : "none";
    let oDetailBox = null;
    const info: any = {
      activityType: rowData.GroupCodeText + "跟进",
      changeBy: "由[销售顾问" + (rowData.SalesRepName ? rowData.SalesRepName : "未知") + "]变更状态",
      activityTime: Util.formatC4CDateToDate(rowData.ActivityTime, "YYYY/MM/DD HH:MM")
    };
    if (this.aTypes.includes(rowData.GroupCode)) {
      if (this.state.rowIds.includes(rowID)) {
        oDetailBox = (
          <View style={[styles.itemContentCard, styles.detailBox]}>
            <View style={[{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginBottom: 12, marginTop: 7 }]}>
              <Text style={[styles.subTitle]}>
                {info.changeBy}
              </Text>
              <Text style={[styles.subTitle]}>
                {info.activityTime}
              </Text>
            </View>
            <ButtonGroup data={rowData} expand={true} />
            <TouchableOpacity
              style={styles.toggleButtonBox}
              onPress={() => this.unexpandDetail(rowID)}
            >
              <Text style={styles.buttonText}>收起</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        oDetailBox = (
          <View style={[styles.itemContentCard, styles.detailBox]}>
            <View style={[{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginBottom: 12, marginTop: 7 }]}>
              <Text style={[styles.subTitle]}>
                {info.changeBy}
              </Text>
              <Text style={[styles.subTitle]}>
                {info.activityTime}
              </Text>
            </View>
            <ButtonGroup data={rowData} expand={false} />
            <TouchableOpacity
              style={styles.toggleButtonBox}
              onPress={() => this.expandDetail(rowID)}
            >
              <View style={styles.toggleButton}>
                <Text style={styles.buttonText}>展开</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    } else {
      oDetailBox = (<View style={[styles.shortDetailBox]}>
        <Text style={[styles.detailText]}>
          {rowData.GroupCodeText}
        </Text>
        <Text style={[styles.detailText]}>
          {rowData.ActivityTime}
        </Text>
      </View>);
    }
    if (rowData.GroupCode === "Z001" || rowData.GroupCode === "Z002" || rowData.GroupCode === "Z003" || rowData.GroupCode === "Z004") {
      return (
        <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
          <View style={[styles.titleHeaderIcon]}>
            <View style={styles.leftTimeline}>
              <DashLine visible={Number.parseInt(rowID) !== this.state.data.length - 1 ? true : false} />
            </View>
          </View>
          {oDetailBox}
        </View>);
    } else {
      return (
        <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
          <View style={[styles.titleHeaderIcon]}>
            <View style={styles.leftTimeline}>
              <DashLine visible={Number.parseInt(rowID) !== this.state.data.length - 1 ? true : false} />
            </View>
          </View>
          <View style={[styles.shortDetailBox]}>
            <Text style={[styles.detailText]}>
              {"此线索被指派给顾问" + (rowData.SalesRepName ? rowData.SalesRepName : "未知")}
            </Text>
          </View>
        </View>);
    }
  }
  private _renderTitile(rowData, sectionID, rowID) {
    const info: any = {
      activityType: rowData.GroupCodeText + "跟进"
    };
    if (rowData.GroupCode === "Z001" || rowData.GroupCode === "Z002" || rowData.GroupCode === "Z003" || rowData.GroupCode === "Z004") {
      return (
        <View style={[{ flex: 1, justifyContent: "flex-start" }]}>
          <Text style={[styles.title]}>
            {info.activityType}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={[{ flex: 1, justifyContent: "flex-start" }]}>
          <View style={[{ flex: 1, flexDirection: "row", justifyContent: "space-between"}]}>
            <Text style={[styles.subTtitleitle]}>
              {"[" + (rowData.SalesManName ? rowData.SalesManName : "未知") + "]变更状态"}
            </Text>
            <Text style={[styles.subTitle]}>
              {info.activityTime}
            </Text>
          </View>
        </View>
      );
    }
  }
  private _renderTitileIcon(rowData, sectionID, rowID) {
    let oIcon: any;
    if (rowID === "0") {
      oIcon = (
        <View style={styles.leftTimeline}>
          <Image
            style={styles.ellipseIcon}
            source={require("../../../../img/timelineellipse.png")}
          />
          <DashLine isTitle={true} visible={true} style={{ flex: 1 }} />
        </View>
      );
    } else {
      switch (rowData.GroupCode) {
        case Constants.CODE_ACTIVITY_GROUPCODE_CALL:
          oIcon = (
            <View>
              <Image
                style={styles.leftTimelineIcon}
                source={require("../../../../img/timelinephone.png")}
              />
            </View>
          );
          break;
        case Constants.CODE_ACTIVITY_GROUPCODE_SMS:
          oIcon = (
            <View>
              <Image
                style={styles.leftTimelineIcon}
                source={require("../../../../img/timelinemessage.png")}
              />
            </View>
          );
          break;
        case Constants.CODE_ACTIVITY_GROUPCODE_LOCAL:
          oIcon = (
            <View style={styles.leftTimeline}>
              <Image
                style={styles.leftTimelineIcon}
                source={require("../../../../img/timelinestore.png")}
              />
            </View>
          );
          break;
        case Constants.CODE_ACTIVITY_GROUPCODE_WECHAT:
          oIcon = (
            <View>
              <Image
                style={styles.leftTimelineIcon}
                source={require("../../../../img/timelinewechat.png")}
              />
            </View>
          );
          break;
        default:
          oIcon = (
            <View style={styles.leftTimeline}>
              <Image
                style={styles.ellipseIcon}
                source={require("../../../../img/timelineellipse.png")}
              />
            </View>
          );
          break;
      }
    }
    return (
      <View style={[styles.titleHeaderIcon]}>
        {oIcon}
      </View>);
  }

}
