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
        <View style={styles.container}>
          {this._renderTitile(rowData, sectionID, rowID)}
          {this._renderDetail(rowData, sectionID, rowID)}
        </View>
      );
    }
    return (
      <View key={rowID}>
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
      ? (<IonIcon.Button
        name="ios-call"
        color="black"
        onPress={this._pressCall.bind(this)}
        backgroundColor="grey"
        iconStyle={styles.toolBarIcon}
        borderRadius={40} />)
      : (<IonIcon
        name="ios-call"
        color="black"
        backgroundColor="grey"
        iconStyle={styles.toolBarIcon}
        borderRadius={40} />);
    let oSMS = this.props.bSMSEnable
      ? <MaterialCommunityIcons.Button
        name="email-outline"
        color="black"
        onPress={this._pressSMS.bind(this)}
        backgroundColor="grey"
        iconStyle={styles.toolBarIcon}
        borderRadius={40} />
      : <MaterialCommunityIcons
        name="email-outline"
        color="black"
        backgroundColor="grey"
        iconStyle={styles.toolBarIcon}
        borderRadius={40} />;
    let oLocal = this.props.bLocalEnable
      ? <Entypo.Button
        name="shop"
        color="black"
        onPress={this._pressLocal.bind(this)}
        backgroundColor="grey"
        iconStyle={styles.toolBarIcon}
        borderRadius={40} />
      : <Entypo
        name="shop"
        color="black"
        backgroundColor="grey"
        iconStyle={styles.toolBarIcon}
        borderRadius={40} />;
    let oWechat = this.props.bWechatEnable
      ? <Icon.Button
        name="weixin"
        color="black"
        onPress={this._pressWeChat.bind(this)}
        backgroundColor="grey"
        iconStyle={styles.toolBarIcon}
        borderRadius={40} />
      : <Icon
        name="weixin"
        color="black"
        backgroundColor="grey"
        iconStyle={styles.toolBarIcon}
        borderRadius={40} />;
    return (
      <View style={[styles.rowContainer]}>
        {this._renderTitileIcon(rowData, sectionID, rowID)}
        <View style={[styles.toolBar]}>
          {oCall}
          {oSMS}
          {oLocal}
          {oWechat}
        </View>
      </View>
    );
  }
  private expandDetail(rowID) {
    this.state.rowIds.push(rowID);
    this.setState({
      data: this.state.data,
      dataSource: ds.cloneWithRows(this.state.data),
      rowIds: this.state.rowIds
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
    if (this.aTypes.includes(rowData.GroupCode)) {
      if (this.state.rowIds.includes(rowID)) {
        oDetailBox = (<View style={[styles.feedbackDetailBox]}>
          <ButtonGroup data={rowData} expand={true} />
          <Button title={"收起"} onPress={() => this.unexpandDetail(rowID)} />
        </View>);
      } else {
        oDetailBox = (<View style={[styles.feedbackDetailBox]}>
          <ButtonGroup data={rowData} expand={false} />
          <Button title={"展开"} onPress={() => this.expandDetail(rowID)} />
        </View>);
      }
    } else {
      oDetailBox = (<View style={[styles.rowContainer, styles.shortDetailBox]}>
        <Text style={[styles.detailText]}>
          {rowData.title}
        </Text>
        <Text style={[styles.detailText]}>
          {rowData.time}
        </Text>
      </View>);
    }
    return (
      <View style={[styles.rowContainer]}>
        <DashLine visible={Number.parseInt(rowID) !== this.state.data.length - 1 ? true : false} />
        {oDetailBox}
      </View>);
  }
  private _renderTitile(rowData, sectionID, rowID) {
    return (
      <View style={[styles.rowContainer]}>
        {this._renderTitileIcon(rowData, sectionID, rowID)}
        <View style={[styles.rowContainer]}>
          <Text style={[styles.title]}>
            {rowData.title}
          </Text>
          <Text style={[styles.title]}>
            {rowData.time}
          </Text>
        </View>
      </View>
    );
  }
  private _renderTitileIcon(rowData, sectionID, rowID) {
    let oIcon: any;
    if (rowID === "0") {
      oIcon = (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Icon name="circle-o" size={16} />
          <DashLine isTitle={true} visible={true} />
        </View>
      );
    } else {
      switch (rowData.GroupCode) {
        case Constants.CODE_ACTIVITY_GROUPCODE_CALL:
          oIcon = (
            <View>
              <IonIcon name="ios-call" size={40} />
            </View>
          );
          break;
        case Constants.CODE_ACTIVITY_GROUPCODE_SMS:
          oIcon = (
            <View>
              <MaterialCommunityIcons name="email-outline" size={40} />
            </View>
          );
          break;
        case Constants.CODE_ACTIVITY_GROUPCODE_LOCAL:
          oIcon = (
            <View>
              <Entypo name="shop" size={40} />
            </View>
          );
          break;
        case Constants.CODE_ACTIVITY_GROUPCODE_WECHAT:
          oIcon = (
            <View>
              <Icon name="weixin" size={40} />
            </View>
          );
          break;
        default:
          oIcon = (
            <View style={{ flex: 1, alignItems: "center" }}>
              <Icon name="circle-o" size={16} />
              <DashLine height={24} isTitle={true} visible={true} />
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
