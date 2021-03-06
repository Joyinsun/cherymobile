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

import ILead from "../../../app/interfaces/lead";
import ILeadDetail from "../../../app/interfaces/leadDetail";
import RowAndroid from "../../../app/components/row/index.android";
import RowIos from "../../../app/components/row/index.ios";
import _ from "lodash";

import * as Constants from "./../../../lib/Constants";
import Utils from "../../../lib/util";
interface Props {
	tabLabel: string;
	navigator: any;
	lead: ILeadDetail;
}

interface State {
	srcLevelFst: string;
	use: string;
	purchaseType: string;
	competitiveCar: string;
	focus: string;
	otherDescribe: string;
	leadStatus: string;
	verificationDate: string;
	channelCount: string;
	followUpCount: string;
	arrivalCount: string;
	turnoverCarModel: string;
}

export default class CustomerInfo extends Component<Props, State> {
	public state: State = {
		srcLevelFst: "电商平台",
		use: "家用",
		purchaseType: "首次购车",
		competitiveCar: "东风标致 suv",
		focus: "品牌/外形/动力",
		otherDescribe: "",
		leadStatus: "已分配",
		verificationDate: "2017-12-29",
		channelCount: "4",
		followUpCount: "4",
		arrivalCount: "4",
		turnoverCarModel: "艾瑞泽5",
	};
	public render() {
		return (
			<View>
				{this.renderForm()}
			</View>
		);
	}
	private renderForm() {
		const { lead } = this.props;
		const info = {
			LeadSource1Name: lead.LeadSource1Name || "未填写",
			LeadSource2Name: lead.LeadSource2Name || "未填写",
			IntentionCarName: lead.IntentionCarName || "未填写",
			IntentionColor: lead.IntentionColor || "未填写",
			IntentionOrderTime: Utils.formatC4CDateToDate(lead.IntentionOrderTime, "YYYY/MM/DD") || "未填写",
			Budget: _.round(lead.Budget) > 0 ? _.round(lead.Budget) + "万" : "未填写",
			GroupCodeText: lead.GroupCodeText || "未填写",
			BuyMethod2Text: lead.BuyMethod2Text || "未填写",
			CompetitorNotes: lead.CompetitorNotes || "未填写",
			MainPurchaseFocuscontentText: lead.MainPurchaseFocuscontentText || "未填写",
			ECommerceOrderID: lead.ECommerceOrderID || "未填写",
			Note: lead.Note || "未填写",

			UserStatusCodeText: lead.UserStatusCodeText || "未填写",
			HasChecked: lead.HasChecked ? "是" : "否",
			LeadLevelText: lead.LeadLevelText ? lead.LeadLevelText + "级" : "未填写",
			CreationDateTime: Utils.formatC4CDateToDate(lead.CreationDateTime, "YYYY/MM/DD") || "未填写",
			ArrageDateTime: Utils.formatC4CDateToDate(lead.ArrageDateTime, "YYYY/MM/DD") || "未填写",
			ECommerceCheckTime: Utils.formatC4CDateToDate(lead.ECommerceCheckTime, "YYYY/MM/DD") || "未填写",

			InteractionTimes: _.round(lead.InteractionTimes),
			ActionTimes: _.round(lead.ActionTimes),
			ArrivalTimes: _.round(lead.ArrivalTimes),
			InvoiceCar: _.round(lead.InvoiceCar)
		};
		if (Platform.OS === "android")
			return (
				<ScrollView>
					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: "#F0F2F3" }} />
						<RowAndroid label="意向信息" isGroupTitle={true}/>
						<RowAndroid label="线索来源一级" contextType="text" displayValue={info.LeadSource1Name}/>
						<RowAndroid label="线索来源二级" contextType="text" displayValue={info.LeadSource2Name}/>
						<RowAndroid label="意向车型" contextType="text" displayValue={info.IntentionCarName}/>
						<RowAndroid label="颜色" contextType="text" displayValue={info.IntentionColor}/>
						<RowAndroid label="预购时间" contextType="text" displayValue={info.IntentionOrderTime}/>
						<RowAndroid label="购车预算" contextType="text" displayValue={info.Budget}/>
						<RowAndroid label="购车用途" contextType="text" displayValue={info.GroupCodeText}/>
						<RowAndroid label="购买类型" contextType="text" displayValue={info.BuyMethod2Text}/>
						<RowAndroid label="竞品车型" contextType="text" displayValue={info.CompetitorNotes}/>
						<RowAndroid label="电商订单ID" contextType="text" displayValue={info.ECommerceOrderID}/>
						<RowAndroid label="其它重点描述" contextType="text" placeholder="其他重点描述" displayType="column" displayValue={info.Note}/>

					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: "#F0F2F3" }} />
						<RowAndroid label="管理信息" isGroupTitle={true}/>
						<RowAndroid label="线索状态" contextType="text" displayValue={info.UserStatusCodeText}/>
						<RowAndroid label="呼叫中心核验	" contextType="text" displayValue={info.HasChecked}/>
						<RowAndroid label="线索级别" contextType="text" displayValue={info.LeadLevelText}/>
						<RowAndroid label="创建时间" contextType="text" displayValue={info.CreationDateTime}/>
						<RowAndroid label="分配时间" contextType="text" displayValue={info.ArrageDateTime}/>
						<RowAndroid label="电商核销时间" contextType="text" displayValue={info.ECommerceCheckTime}/>

					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: "#F0F2F3" }} />
						<RowAndroid label="指标时效信息" isGroupTitle={true}/>
						<RowAndroid label="渠道来源次数" contextType="text" displayValue={info.InteractionTimes}/>
						<RowAndroid label="跟进次数" contextType="text" displayValue={info.ActionTimes}/>
						<RowAndroid label="到店次数" contextType="text" displayValue={info.ArrivalTimes}/>
						<RowAndroid label="成交车型" contextType="text" displayValue={info.InvoiceCar}/>
				</ScrollView>
			);
		else
			return (
				<ScrollView>
					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: "#F0F2F3" }} />
						<RowIos label="意向信息" isGroupTitle={true}/>
						<RowIos label="线索来源一级" contextType="text" displayValue={info.LeadSource1Name}/>
						<RowIos label="线索来源二级" contextType="text" displayValue={info.LeadSource2Name}/>
						<RowIos label="意向车型" contextType="text" displayValue={info.IntentionCarName}/>
						<RowIos label="颜色" contextType="text" displayValue={info.IntentionColor}/>
						<RowIos label="预购时间" contextType="text" displayValue={info.IntentionOrderTime}/>
						<RowIos label="购车预算" contextType="text" displayValue={info.Budget}/>
						<RowIos label="购车用途" contextType="text" displayValue={info.GroupCodeText}/>
						<RowIos label="购买类型" contextType="text" displayValue={info.BuyMethod2Text}/>
						<RowIos label="竞品车型" contextType="text" displayValue={info.CompetitorNotes}/>
						<RowIos label="电商订单ID" contextType="text" displayValue={info.ECommerceOrderID}/>
						<RowIos label="其它重点描述" contextType="text" placeholder="其他重点描述" displayType="column" displayValue={info.Note}/>

					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: "#F0F2F3" }} />
						<RowIos label="管理信息" isGroupTitle={true}/>
						<RowIos label="线索状态" contextType="text" displayValue={info.UserStatusCodeText}/>
						<RowIos label="呼叫中心核验	" contextType="text" displayValue={info.HasChecked}/>
						<RowIos label="线索级别" contextType="text" displayValue={info.LeadLevelText}/>
						<RowIos label="创建时间" contextType="text" displayValue={info.CreationDateTime}/>
						<RowIos label="分配时间" contextType="text" displayValue={info.ArrageDateTime}/>
						<RowIos label="电商核销时间" contextType="text" displayValue={info.ECommerceCheckTime}/>

					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: "#F0F2F3" }} />
						<RowIos label="指标时效信息" isGroupTitle={true}/>
						<RowIos label="渠道来源次数" contextType="text" displayValue={info.InteractionTimes}/>
						<RowIos label="跟进次数" contextType="text" displayValue={info.ActionTimes}/>
						<RowIos label="到店次数" contextType="text" displayValue={info.ArrivalTimes}/>
						<RowIos label="成交车型" contextType="text" displayValue={info.InvoiceCar}/>
				</ScrollView>
			);
	}
}
