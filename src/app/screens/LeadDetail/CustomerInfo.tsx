import * as React from "react";
import { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Dimensions,
  Platform,
  ScrollView,
  View,
  AlertIOS,
  Alert
} from "react-native";

import { connect, Dispatch } from "react-redux";
import * as Constants from "./../../../lib/Constants";
import RowAndroid from "../../../app/components/row/index.android";
import RowIos from "../../../app/components/row/index.ios";
import ILead from "../../../app/interfaces/lead";

interface Props {
  tabLabel: string;
  navigator: any;
  lead: ILead;
}
interface State {
  customerSex: string;
  customerFPhoneNum ?: string;
  address ?: string;
  birthDate ?: string;
  customerType: string;
  wechatName ?: string;
  email ?: string;
}
const sexList = [
  {
    id: 1,
    key: "female",
    value: "女"
  }, {
    id: 2,
    key: "male",
    value: "男"
  }];

export default class CustomerInfo extends Component<Props, State> {
  public state: State = {
    customerSex: "女",
    customerFPhoneNum: "",
    address: "",
    birthDate: "",
    customerType: "潜客",
    wechatName: "",
    email: "",
  };
  public render() {
    return (
      <View>
        {this.renderForm()}
      </View>
    );
  }

  private renderForm() {
    let lead = this.props.lead;
    if (Platform.OS === "android")
      return (
        <ScrollView>
          <RowAndroid label="手机号*" contextType="text" displayValue={lead.Mobile} navigator={this.props.navigator} />
          <RowAndroid label="客户姓名*" contextType="text" displayValue={lead.IndividualCustomerFamilyName} navigator={this.props.navigator} />
          <RowAndroid label="客户性别" contextType="text" displayValue={this.state.customerSex} dataSource={sexList} navigator={this.props.navigator} />
          <RowAndroid label="固定电话" contextType="text" displayValue={this.state.customerFPhoneNum ? this.state.customerFPhoneNum : "未填写"} navigator={this.props.navigator} />
          <RowAndroid label="详细地址" contextType="text" displayValue={this.state.address ? this.state.address : "未填写"} navigator={this.props.navigator} />
          <RowAndroid label="出生日期" contextType="text" displayValue={this.state.birthDate ? this.state.birthDate : "未填写"} navigator={this.props.navigator} />
          <RowAndroid label="客户类型" contextType="text" displayValue={this.state.customerType} navigator={this.props.navigator} />
          <RowAndroid label="微信昵称" contextType="text" displayValue={this.state.wechatName ? this.state.wechatName : "未填写"} navigator={this.props.navigator} />
          <RowAndroid label="邮箱" contextType="text" displayValue={this.state.email ? this.state.email : "未填写"} navigator={this.props.navigator} />
        </ScrollView>
      );
    else
      return (
        <ScrollView>
          <RowIos label="手机号*" contextType="text" displayValue={lead.Mobile} navigator={this.props.navigator} />
          <RowIos label="客户姓名*" contextType="text" displayValue={lead.IndividualCustomerFamilyName} navigator={this.props.navigator} />
          <RowIos label="客户性别" contextType="text" displayValue={this.state.customerSex} dataSource={sexList} navigator={this.props.navigator} />
          <RowIos label="固定电话" contextType="text" displayValue={this.state.customerFPhoneNum ? this.state.customerFPhoneNum : "未填写"} navigator={this.props.navigator} />
          <RowIos label="详细地址" contextType="text" displayValue={this.state.address ? this.state.address : "未填写"} navigator={this.props.navigator} />
          <RowIos label="出生日期" contextType="text" displayValue={this.state.birthDate ? this.state.birthDate : "未填写"} navigator={this.props.navigator} />
          <RowIos label="客户类型" contextType="text" displayValue={this.state.customerType} navigator={this.props.navigator} />
          <RowIos label="微信昵称" contextType="text" displayValue={this.state.wechatName ? this.state.wechatName : "未填写"} navigator={this.props.navigator} />
          <RowIos label="邮箱" contextType="text" displayValue={this.state.email ? this.state.email : "未填写"} navigator={this.props.navigator} />
        </ScrollView>
      );
  }
}
