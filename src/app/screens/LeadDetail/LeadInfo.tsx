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
import util from "../../../lib/util";
import RowAndroid from "../../../app/components/row/index.android";
import RowIos from "../../../app/components/row/index.ios";

import * as Constants from "./../../../lib/Constants";
interface Props {
	tabLabel: string;
	navigator: any;
	lead: ILead;
}

interface State {
	use: string;
	purchaseType: string;
	competitiveCar: string;
	focus: string;
	otherDescribe: string;
	verificationDate: string;
	channelCount: string;
	turnoverCarModel: string;
}

export default class CustomerInfo extends Component<Props, State> {
	public state: State = {
		use: "家用",
		purchaseType: "首次购车",
		competitiveCar: "东风标致 suv",
		focus: "品牌/外形/动力",
		otherDescribe: "",
		verificationDate: "2017-12-29",
		channelCount: "4",
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
		let lead = this.props.lead;
		let creationDateTime = util.formatC4CDateToDate(this.props.lead.CreationDateTime);
		let intentionOrderTime = util.formatC4CDateToDate(this.props.lead.IntentionOrderTime);
		let arrageDateTime = util.formatC4CDateToDate(this.props.lead.ArrageDateTime);
		if (Platform.OS === "android")
			return (
				<ScrollView>
					<RowAndroid label="意向信息" isGroupTitle={true} navigator={this.props.navigator} />
					<RowAndroid label="线索来源一级" contextType="text" displayValue={lead.FirstTouch} navigator={this.props.navigator} />
					<RowAndroid label="线索来源二级" contextType="text" displayValue={lead.FirstTouch} navigator={this.props.navigator} />
					<RowAndroid label="意向车型" contextType="text" displayValue={lead.IntentionCarName} dataSource={sexList} navigator={this.props.navigator} />
					<RowAndroid label="颜色" contextType="text" displayValue={lead.IntentionColor} dataSource={colorList} navigator={this.props.navigator} />
					<RowAndroid label="预购时间" contextType="text" displayValue={intentionOrderTime} navigator={this.props.navigator} />
					<RowAndroid label="购车预算" contextType="text" displayValue={lead.Budget} dataSource={budgetList} navigator={this.props.navigator} />
					<RowAndroid label="购车用途" contextType="text" displayValue={this.state.use} dataSource={useList} navigator={this.props.navigator} />
					<RowAndroid label="购买类型" contextType="text" displayValue={this.state.purchaseType} dataSource={purchaseTypeList} navigator={this.props.navigator} />
					<RowAndroid label="电商订单ID" contextType="text" displayValue={lead.ECommerceOrderID} navigator={this.props.navigator} />
					<RowAndroid label="其它重点描述" contextType="text" placeholder="其他重点描述" displayType="column" displayValue={this.state.otherDescribe} displayCounterText={true} maxLength={200} navigator={this.props.navigator} />
					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: "#F0F2F3" }} />
					<RowAndroid label="管理信息" isGroupTitle={true} navigator={this.props.navigator} />
					<RowAndroid label="线索状态" contextType="text" displayValue={lead.UserStatusCode} navigator={this.props.navigator} />
					<RowAndroid label="呼叫中心核验	" contextType="text" displayValue={lead.HasChecked ? "是" : "否"} navigator={this.props.navigator} />
					<RowAndroid label="线索级别" contextType="text" displayValue={lead.LeadLevel} dataSource={leadLevelList} navigator={this.props.navigator} />
					<RowAndroid label="创建时间" contextType="text" displayValue={creationDateTime} navigator={this.props.navigator} />
					<RowAndroid label="分配时间" contextType="text" displayValue={arrageDateTime} navigator={this.props.navigator} />
					<RowAndroid label="电商核销时间" contextType="text" displayValue={this.state.verificationDate} navigator={this.props.navigator} />
					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: "#F0F2F3" }} />
					<RowAndroid label="指标时效信息" isGroupTitle={true} navigator={this.props.navigator} />
					<RowAndroid label="渠道来源次数" contextType="text" displayValue={this.state.channelCount} navigator={this.props.navigator} />
					<RowAndroid label="跟进次数" contextType="text" displayValue={lead.ActionTimes} navigator={this.props.navigator} />
					<RowAndroid label="到店次数" contextType="text" displayValue={lead.ArrivalTimes} navigator={this.props.navigator} />
					<RowAndroid label="成交车型" contextType="text" displayValue={this.state.turnoverCarModel} navigator={this.props.navigator} />
				</ScrollView>
			);
		else
			return (
				<ScrollView  >
					<RowIos label="意向信息" isGroupTitle={true} navigator={this.props.navigator} />
					<RowIos label="线索来源一级" contextType="text" displayValue={lead.FirstTouch} navigator={this.props.navigator} />
					<RowIos label="线索来源二级" contextType="text" displayValue={lead.FirstTouch} navigator={this.props.navigator} />
					<RowIos label="意向车型" contextType="text" displayValue={lead.IntentionCarName} dataSource={sexList} navigator={this.props.navigator} />
					<RowIos label="颜色" contextType="text" displayValue={lead.IntentionColor} dataSource={colorList} navigator={this.props.navigator} />
					<RowIos label="预购时间" contextType="text" displayValue={intentionOrderTime} navigator={this.props.navigator} />
					<RowIos label="购车预算" contextType="text" displayValue={lead.Budget} dataSource={budgetList} navigator={this.props.navigator} />
					<RowIos label="购车用途" contextType="text" displayValue={this.state.use} dataSource={useList} navigator={this.props.navigator} />
					<RowIos label="购买类型" contextType="picker" displayValue={this.state.purchaseType} dataSource={purchaseTypeList} navigator={this.props.navigator} />
					<RowIos label="电商订单ID" contextType="text" displayValue={lead.ECommerceOrderID} navigator={this.props.navigator} />
					<RowIos label="接待结果" contextType="text" placeholder="其他重点描述" displayType="column" displayValue={this.state.otherDescribe} displayCounterText={true} maxLength={200} navigator={this.props.navigator} />
					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: "#F0F2F3" }} />
					<RowIos label="管理信息" isGroupTitle={true} navigator={this.props.navigator} />
					<RowIos label="线索状态" contextType="text" displayValue={lead.UserStatusCode} navigator={this.props.navigator} />
					<RowIos label="呼叫中心核验	" contextType="text" displayValue={lead.HasChecked} navigator={this.props.navigator} />
					<RowIos label="线索级别" contextType="text" displayValue={lead.LeadLevel} dataSource={leadLevelList} navigator={this.props.navigator} />
					<RowIos label="创建时间" contextType="text" displayValue={creationDateTime} navigator={this.props.navigator} />
					<RowIos label="分配时间" contextType="text" displayValue={arrageDateTime} navigator={this.props.navigator} />
					<RowIos label="电商核销时间" contextType="text" displayValue={this.state.verificationDate} navigator={this.props.navigator} />
					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: "#F0F2F3" }} />
					<RowIos label="指标时效信息" isGroupTitle={true} navigator={this.props.navigator} />
					<RowIos label="渠道来源次数" contextType="text" displayValue={this.state.channelCount} navigator={this.props.navigator} />
					<RowIos label="跟进次数" contextType="text" displayValue={lead.ActionTimes} navigator={this.props.navigator} />
					<RowIos label="到店次数" contextType="text" displayValue={lead.ArrivalTimes} navigator={this.props.navigator} />
					<RowIos label="成交车型" contextType="text" displayValue={this.state.turnoverCarModel} navigator={this.props.navigator} />
				</ScrollView>
			);
	}
}

const intentCarModel = [
	{
		id: 1,
		key: "arrizo5",
		value: "艾瑞泽5"
	}, {
		id: 2,
		key: "arrizo7",
		value: "艾瑞泽7"
	}
];
const sexList = [
	{
		id: 1,
		key: "female",
		value: "女"
	}, {
		id: 2,
		key: "male",
		value: "男"
	}
];

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

const useList = [
	{
		id: 1,
		key: "household",
		value: "家用"
	},
	{
		id: 2,
		key: "public",
		value: "公用"
	}
];

const purchaseTypeList = [
	{
		id: 1,
		key: "first",
		value: "首次购买"
	},
	{
		id: 2,
		key: "again",
		value: "再次购买"
	}
];

const focusList = [
	{
		id: 1,
		key: "brand",
		value: "品牌"
	},
	{
		id: 2,
		key: "appearance",
		value: "外形"
	},
	{
		id: 3,
		key: "power",
		value: "动力"
	}
];

const leadLevelList = [
	{
		id: 1,
		key: "H",
		value: "H级"
	},
	{
		id: 2,
		key: "A",
		value: "A级"
	},
	{
		id: 3,
		key: "B",
		value: "B级"
	},
	{
		id: 4,
		key: "C",
		value: "C级"
	}
];
