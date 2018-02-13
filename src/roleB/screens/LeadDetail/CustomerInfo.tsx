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
import ILeadDetail from "../../../app/interfaces/leadDetail";
import * as Constants from "./../../../lib/Constants";
import RowAndroid from "../../../app/components/row/index.android";
import RowIos from "../../../app/components/row/index.ios";

import _ from "lodash";
import Utils from "../../../lib/util";
interface Props {
  tabLabel: string;
  navigator: any;
  customer: ILeadDetail;
}

interface State {}
export default class CustomerInfo extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <View>
        {this.renderForm()}
      </View>
    );
  }
  private renderForm() {
    const { customer } = this.props;
    const info = {
      Mobile: customer.Mobile || "未填写",
      IndividualCustomerFamilyName: customer.IndividualCustomerFamilyName,
      Gender: customer.Gender === "1" ? "女" : "男",
      Phone: customer.Phone || "未填写",
      Address: customer.Address || "未填写",
      BirthDate: Utils.formatC4CDateToDate(customer.BirthDate, "YYYY/MM/DD") || "未填写",
      IsCustomer: customer.IsCustomer ? "保客" : "潜客",
      WechatID: customer.WechatID || "未填写",
      Emailcontent: customer.Emailcontent || "未填写"
    };
    if (Platform.OS === "android")
      return (
        <ScrollView>
          <RowAndroid label="手机号*" contextType="text" displayValue={info.Mobile}/>
          <RowAndroid label="客户姓名*" contextType="text" displayValue={info.IndividualCustomerFamilyName}/>
          <RowAndroid label="客户性别" contextType="text" displayValue={info.Gender}/>
          <RowAndroid label="固定电话" contextType="text" displayValue={info.Phone}/>
          <RowAndroid label="详细地址" contextType="text" displayValue={info.Address}/>
          <RowAndroid label="出生日期" contextType="text" displayValue={info.BirthDate}/>
          <RowAndroid label="客户类型" contextType="text" displayValue={info.IsCustomer}/>
          <RowAndroid label="微信昵称" contextType="text" displayValue={info.WechatID}/>
          <RowAndroid label="邮箱" contextType="text" displayValue={info.Emailcontent}/>
        </ScrollView>
      );
    else
      return (
        <ScrollView>
          <RowIos label="手机号*" contextType="text" displayValue={info.Mobile}/>
          <RowIos label="客户姓名*" contextType="text" displayValue={info.IndividualCustomerFamilyName}/>
          <RowIos label="客户性别" contextType="text" displayValue={info.Gender}/>
          <RowIos label="固定电话" contextType="text" displayValue={info.Phone}/>
          <RowIos label="详细地址" contextType="text" displayValue={info.Address}/>
          <RowIos label="出生日期" contextType="text" displayValue={info.BirthDate}/>
          <RowIos label="客户类型" contextType="text" displayValue={info.IsCustomer}/>
          <RowIos label="微信昵称" contextType="text" displayValue={info.WechatID}/>
          <RowIos label="邮箱" contextType="text" displayValue={info.Emailcontent}/>
        </ScrollView>
      );
  }
}
