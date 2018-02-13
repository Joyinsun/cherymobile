import * as React from "react";
import { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
	Dimensions,
	Platform,
	ScrollView,
	View,
	Text,
	Alert,
	AlertIOS
} from "react-native";

import ILeadInfo from "../../../app/interfaces/leadDetail/leadInfo";

import RowAndroid from "../../../app/components/row/index.android";
import RowIos from "../../../app/components/row/index.ios";
import Line from "../../../app/components/Line";
import * as Constants from "./../../../lib/Constants";
import _ from "lodash";
import Utils from "../../../lib/util";
import * as GlobalVariable from "../../../lib/global";

interface Props {
	tabLabel: string;
	navigator: any;
	editable: boolean;
	lead: ILeadInfo;
}

interface State {
	editable: boolean;
	lead: ILeadInfo;
	updateData: any;
}

export default class CustomerInfo extends Component<Props, State> {
	public state: State = {
		editable: this.props.editable,
		lead: this.props.lead,
		updateData: {}
	};
	public getCurrentData(): any {
		return this.state.updateData;
	}
	public render() {
    	return(
    		<View>
    			{this.renderForm()}
    		</View>
    	);
    }
	private renderForm() {
	  let lead = this.props.lead;
	  let desc = this.props.editable ? "" : "未填写";
		const info = {
			LeadSource1Name: lead.LeadSource1Name || desc,
			LeadSource2Name: lead.LeadSource2Name || desc,
			IntentionCarName: lead.IntentionCarName || desc,
			IntentionColor: lead.IntentionColor || desc,
			IntentionOrderTime: Utils.formatC4CDateToDate(lead.IntentionOrderTime, "YYYY/MM/DD") || desc,
			Budget: _.round(lead.Budget) > 0 ? _.round(lead.Budget) + "万" : desc,
			GroupCodeText: lead.GroupCodeText || desc,
			BuyMethod2Text: lead.BuyMethod2Text || desc,
			CompetitorNotes: lead.CompetitorNotes || desc,
			MainPurchaseFocuscontentText: lead.MainPurchaseFocuscontentText || desc,
			ECommerceOrderID: lead.ECommerceOrderID || desc,
			ServeResult: lead.ServeResult || desc,
			UserStatusCodeText: lead.UserStatusCodeText || desc,
			HasChecked: lead.HasChecked ? "是" : "否",
			LeadLevelText: lead.LeadLevelText ? lead.LeadLevelText + "级" : desc,
			CreationDateTime: Utils.formatC4CDateToDate(lead.CreationDateTime, "YYYY/MM/DD") || desc,
			ArrageDateTime: Utils.formatC4CDateToDate(lead.ArrageDateTime, "YYYY/MM/DD") || desc,
			ECommerceCheckTime: Utils.formatC4CDateToDate(lead.ECommerceCheckTime, "YYYY/MM/DD") || desc,
			InteractionTimes: _.round(lead.InteractionTimes),
			ActionTimes: _.round(lead.ActionTimes),
			ArrivalTimes: _.round(lead.ArrivalTimes),
			InvoiceCar: _.round(lead.InvoiceCar)
		};
      if ( Platform.OS === "android")
          return (
            <ScrollView>
				  <Line />
				  <RowAndroid label="意向信息" isGroupTitle={true} />
				  <RowAndroid label="线索来源一级" contextType="text" displayValue={info.LeadSource1Name} />
				  <RowAndroid label="线索来源二级" contextType="text" displayValue={info.LeadSource2Name} />
				  <RowAndroid label="意向车型*" contextType="picker" name="IntentionCarCategoryID" rootScreenTitle={Constants.CN_INTENTCARMODEL} hasChild={true} childScreenTitle="品种/动总/型号" editable={this.props.editable} displayValue={info.IntentionCarName} dataSource={GlobalVariable.metadata.carTypeList.data} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
				  <RowAndroid label="颜色" contextType="picker" editable={this.props.editable} displayValue={info.IntentionColor} dataSource={colorList} navigator={this.props.navigator} />
				  <RowAndroid label="预购时间" contextType="datepicker" name="IntentionOrderTime" editable={this.props.editable} displayValue={info.IntentionOrderTime} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
				  <RowAndroid label="购车预算" contextType="picker" editable={this.props.editable} displayValue={info.Budget} dataSource={budgetList} navigator={this.props.navigator} />
				  <RowAndroid label="购车用途" contextType="picker" name="GroupCode" editable={this.props.editable} displayValue={info.GroupCodeText} dataSource={GlobalVariable.metadata.purposeList.data} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
				  <RowAndroid label="购买类型" contextType="picker" name="BuyMethod2" editable={this.props.editable} displayValue={info.BuyMethod2Text} dataSource={GlobalVariable.metadata.purchaseTypeList.data} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
				  <RowAndroid label="竞品车型" contextType="input" editable={this.props.editable} displayValue={info.CompetitorNotes} onChangeEvent={(text) => { this.onValueChangeText(text, "CompetitorNotes"); }} />
				  <RowAndroid label="购车关注点" contextType="picker" name="MainPurchaseFocuscontent" editable={this.props.editable} displayValue={info.MainPurchaseFocuscontentText} dataSource={GlobalVariable.metadata.purchaseFocusList.data} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
             	  <RowAndroid label="电商订单ID" contextType="text" editable={this.props.editable} displayValue={info.ECommerceOrderID} />
				  <RowAndroid label="接待结果" contextType="textarea" name="ServeResult" editable={this.props.editable} placeholder="其他重点描述" displayType="column" displayValue={info.ServeResult} displayCounterText={true} maxLength={200} onChangeEvent={this.onValueChange.bind(this)} />
				  <Line />
				  <RowAndroid label="管理信息" isGroupTitle={true} />
				  <RowAndroid label="线索状态" contextType="text" displayValue={info.UserStatusCodeText} />
				  <RowAndroid label="呼叫中心核验	" contextType="text" displayValue={info.HasChecked} />
				  <RowAndroid label="意向级别" contextType="picker" name="LeadLevel" editable={this.props.editable} dataSource={GlobalVariable.metadata.leadLevelList.data} displayValue={info.LeadLevelText} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
				  <RowAndroid label="创建时间" contextType="text" displayValue={info.CreationDateTime} />
				  <RowAndroid label="分配时间" contextType="text" displayValue={info.ArrageDateTime} />
				  <RowAndroid label="电商核销时间" contextType="text" displayValue={info.ECommerceCheckTime} />
				  <Line />
				  <RowAndroid label="指标时效信息" isGroupTitle={true} />
				  <RowAndroid label="渠道来源次数" contextType="text" displayValue={info.InteractionTimes} />
				  <RowAndroid label="跟进次数" contextType="text" displayValue={info.ActionTimes} />
				  <RowAndroid label="到店次数" contextType="text" displayValue={info.ArrivalTimes} />
				  <RowAndroid label="成交车型" contextType="text" displayValue={info.InvoiceCar} />
			  </ScrollView>
          );
      else
          return (
            <ScrollView  >
				  <View style={{ borderBottomWidth: 10, borderBottomColor: "#F9F8F8" }}>
						<RowIos label="意向信息" isGroupTitle={true} />
						<RowIos label="线索来源一级" contextType="text" displayValue={info.LeadSource1Name} />
						<RowIos label="线索来源二级" contextType="text" displayValue={info.LeadSource2Name} />
					    <RowIos label="意向车型*" contextType="picker" name="IntentionCar" rootScreenTitle={Constants.CN_INTENTCARMODEL} hasChild={true} childScreenTitle="品种/动总/型号" editable={this.props.editable} displayValue={info.IntentionCarName} dataSource={GlobalVariable.metadata.carTypeList.data} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
					    <RowIos label="颜色" contextType="picker" name="IntentionColor" editable={this.props.editable} displayValue={info.IntentionColor} dataSource={colorList} navigator={this.props.navigator} />
					    <RowIos label="预购时间" contextType="datepicker" name="IntentionOrderTime" editable={this.props.editable} displayValue={info.IntentionOrderTime} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
					    <RowIos label="购车预算" contextType="picker" name="Budget" editable={this.props.editable} displayValue={info.Budget} dataSource={budgetList} navigator={this.props.navigator} />
					    <RowIos label="购车用途" contextType="picker" name="GroupCode" editable={this.props.editable} displayValue={info.GroupCodeText} dataSource={GlobalVariable.metadata.purposeList.data} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
					    <RowIos label="购买类型" contextType="picker" name="BuyMethod2" editable={this.props.editable} displayValue={info.BuyMethod2Text} dataSource={GlobalVariable.metadata.purchaseTypeList.data} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
						<RowIos label="电商订单ID" contextType="text" displayValue={info.ECommerceOrderID} />
					    <RowIos label="竞品车型" contextType="input" name="CompetitorNotes" editable={this.props.editable} displayValue={info.CompetitorNotes} onChangeEvent={(text) => { this.onValueChangeText(text, "CompetitorNotes"); }} />
					    <RowIos label="购车关注点" contextType="picker" name="MainPurchaseFocuscontent" editable={this.props.editable} displayValue={info.MainPurchaseFocuscontentText} dataSource={GlobalVariable.metadata.purchaseFocusList.data} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
					    <RowIos label="接待结果" contextType="textarea" editable={this.props.editable} displayType="column" displayValue={info.ServeResult} displayCounterText={true} maxLength={200} />
				  </View>
				  <View style={{ borderBottomWidth: 10, borderBottomColor: "#F9F8F8" }}>
						<RowIos label="管理信息" isGroupTitle={true} />
						<RowIos label="线索状态" contextType="text" displayValue={info.UserStatusCodeText} />
						<RowIos label="呼叫中心核验" contextType="text" displayValue={info.HasChecked} />
					    <RowIos label="意向级别" contextType="picker" name="LeadLevel" editable={this.props.editable} dataSource={GlobalVariable.metadata.leadLevelList.data} displayValue={info.LeadLevelText} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
					    <RowIos label="创建时间" contextType="text" displayValue={info.CreationDateTime} />
					    <RowIos label="分配时间" contextType="text" displayValue={info.ArrageDateTime} />
					    <RowIos label="电商核销时间" contextType="text" displayValue={info.ECommerceCheckTime} />
				  </View>
				  <View style={{ borderBottomWidth: 10, borderBottomColor: "#F9F8F8" }}>
					  <RowIos label="指标时效信息" isGroupTitle={true} />
					  <RowIos label="渠道来源次数" contextType="text" displayValue={info.InteractionTimes} />
					  <RowIos label="跟进次数" contextType="text" displayValue={info.ActionTimes} />
					  <RowIos label="到店次数" contextType="text" displayValue={info.ArrivalTimes} />
					  <RowIos label="成交车型" contextType="text" displayValue={info.InvoiceCar} />
				  </View>
			  </ScrollView>
          );
    }
	private onValueChange(displayInfo: any): void {
		//For select
		let lead = this.state.lead;
		let updateData = this.state.updateData;
		let key = Object.keys(displayInfo)[0];
		if (this.findTextFieldByKey(key)) {
			lead[key] = displayInfo[key].key;
			lead[this.findTextFieldByKey(key)] = displayInfo[key].value;
			updateData[key] = displayInfo[key].key;
		} else {
			lead[key] = displayInfo[key];
			updateData[key] = displayInfo[key];
		}

		this.setState({ lead: lead, updateData: updateData });
	}
	private findTextFieldByKey(key: string): string {
		//TODO 不同的metadata对应的keycode不确定
		let result = null;
		if (key.indexOf("Code") > -1) {
			if (key === "GroupCode") {
				result = key + "Text";
			} else if (key === "LeadLevel") {
				result = key + "Text";
			} else {
				result = key.replace("Code", "Text");
			}
		} else if (key === "IntentionCarCategoryID") {
			result = "IntentionCarName";
		} else {
			result = key + "Text";
		}
		return result;
	}
	private onValueChangeText(displayInfo: any, fieldName: string): void {
		let updateData = this.state.updateData;
		updateData[fieldName] = displayInfo;
		let lead = this.state.lead;
		lead[fieldName] = displayInfo;
		this.setState({ lead: lead, updateData: updateData });
	}
}

const colorList = [
	{
		id: 1,
		key: "red",
		value: "红"
	},
	{
		id: 2,
		key: "white",
		value: "白"
	}
];

const budgetList = [
	{
		id: 1,
		key: "less",
		value: "5-10万"
	},
	{
		id: 2,
		key: "more",
		value: "10-20万"
	},
	{
		id: 3,
		key: "much",
		value: "20-30万"
	}
];
