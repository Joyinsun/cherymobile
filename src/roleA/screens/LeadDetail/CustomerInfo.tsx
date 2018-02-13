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
import Line from "../../../app/components/Line";
import ICustomerInfo from "../../../app/interfaces/leadDetail/customerInfo";
import _ from "lodash";
import Utils from "../../../lib/util";
import * as GlobalVariable from "../../../lib/global";

interface Props {
  tabLabel: string;
  navigator: any;
  editable: boolean;
  lead: ICustomerInfo;
}

interface State {
  lead: ICustomerInfo;
  updateData: any;
}

export default class CustomerInfo extends Component<Props, State> {
  public state: State = {
    lead: this.props.lead,
    updateData: {}
  };
  public render() {
    return (
      <View>
        {this.renderForm()}
      </View>
    );
  }
  public getCurrentData(): any {
    return this.state.updateData;
  }

  private renderForm() {
    let customer = this.props.lead;
    let desc = this.props.editable ? "" : "未填写";
    const info = {
      Mobile: Utils.formatMobile(customer.Mobile) || "未填写",
      IndividualCustomerFamilyName: customer.IndividualCustomerFamilyName,
      Gender: customer.GenderText,
      Phone: customer.Phone || desc,
      Address: customer.Address || desc,
      BirthDate: Utils.formatC4CDateToDate(customer.BirthDate, "YYYY/MM/DD") || desc,
      IsCustomer: customer.IsCustomer ? "保客" : "潜客",
      WechatID: customer.WechatID || desc,
      Emailcontent: customer.Emailcontent || desc
    };
    let gender = _.drop(GlobalVariable.metadata.gender.data);
    if (Platform.OS === "android")
      return (
        <ScrollView>
          <Line />
          <RowAndroid label="手机号*" contextType="input" name="Mobile" displayValue={info.Mobile} editable={this.props.editable} onChangeEvent={(text) => { this.onValueChangeText(text, "Mobile"); }} />
          <RowAndroid label="客户姓名*" contextType="input" name="IndividualCustomerFamilyName" displayValue={info.IndividualCustomerFamilyName} editable={this.props.editable} onChangeEvent={(text) => { this.onValueChangeText(text, "IndividualCustomerFamilyName"); }} />
          <RowAndroid label="客户性别" contextType="picker" name="Gender" dataSource={gender} displayValue={info.Gender} editable={this.props.editable} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowAndroid label="固定电话" contextType="input" name="Phone" displayValue={info.Phone} editable={this.props.editable} onChangeEvent={(text) => { this.onValueChangeText(text, "Phone"); }} />
          <RowAndroid label="详细地址" contextType="input" name="Address" displayValue={info.Address} editable={this.props.editable} onChangeEvent={(text) => { this.onValueChangeText(text, "Address"); }} />
          <RowAndroid label="出生日期" contextType="datepicker" name="BirthDate" displayValue={info.BirthDate} editable={this.props.editable} onChangeEvent={this.onValueChange.bind(this)}  navigator={this.props.navigator} />
          <RowAndroid label="客户类型" contextType="text" displayValue={info.IsCustomer} />
          <RowAndroid label="微信昵称" contextType="input" name="WechatID" displayValue={info.WechatID} editable={this.props.editable} onChangeEvent={(text) => { this.onValueChangeText(text, "WechatID"); }} />
          <RowAndroid label="邮箱" contextType="input" name="Emailcontent" displayValue={info.Emailcontent} editable={this.props.editable} onChangeEvent={(text) => { this.onValueChangeText(text, "Emailcontent"); }} />
        </ScrollView>
      );
    else
      return (
        <ScrollView>
          <Line />
          <RowIos label="手机号*" contextType="input" name="Mobile" displayValue={info.Mobile} editable={this.props.editable} onChangeEvent={(text) => { this.onValueChangeText(text, "Mobile"); }} />
          <RowIos label="客户姓名*" contextType="input" name="IndividualCustomerFamilyName" displayValue={info.IndividualCustomerFamilyName} editable={this.props.editable} onChangeEvent={(text) => { this.onValueChangeText(text, "IndividualCustomerFamilyName"); }} />
          <RowIos label="客户性别" contextType="picker" name="Gender" dataSource={gender} displayValue={info.Gender} editable={this.props.editable} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowIos label="固定电话" contextType="input" name="Phone" displayValue={info.Phone} editable={this.props.editable} onChangeEvent={(text) => { this.onValueChangeText(text, "Phone"); }} />
          <RowIos label="详细地址" contextType="input" name="Address" displayValue={info.Address} editable={this.props.editable} onChangeEvent={(text) => { this.onValueChangeText(text, "Address"); }} />
          <RowIos label="出生日期" contextType="datepicker" name="BirthDate" displayValue={info.BirthDate} editable={this.props.editable} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowIos label="客户类型" contextType="text" displayValue={info.IsCustomer} />
          <RowIos label="微信昵称" contextType="input" name="WechatID" displayValue={info.WechatID} editable={this.props.editable} onChangeEvent={(text) => { this.onValueChangeText(text, "WechatID"); }} />
          <RowIos label="邮箱" contextType="input" name="Emailcontent" displayValue={info.Emailcontent} editable={this.props.editable} onChangeEvent={(text) => { this.onValueChangeText(text, "Emailcontent"); }} />
        </ScrollView>
      );
  }

  private onValueChange(displayInfo: any): void {
    //For select
    let lead = this.state.lead;
    let updateData = this.state.updateData;
    let key = Object.keys(displayInfo)[0];
    if (key !== "BirthDate") {
      lead[key] = displayInfo[key].key;
      lead["GenderText"] = displayInfo[key].value;
      updateData[key] = displayInfo[key].key;
    } else {
      lead[key] = "/Date(" + new Date(displayInfo[key]).getTime() + ")/";
      updateData[key] = "/Date(" + new Date(displayInfo[key]).getTime() + ")/";
    }
    this.setState({ lead: lead, updateData: updateData });
  }
  private onValueChangeText(displayInfo: any, fieldName: string): void {
    let key = Object.keys(displayInfo)[0];
    let updateData = this.state.updateData;
    updateData[fieldName] = displayInfo[key];
    let lead = this.state.lead;
    lead[fieldName] = displayInfo[key];
    this.setState({ lead: lead, updateData: updateData });
  }
}
