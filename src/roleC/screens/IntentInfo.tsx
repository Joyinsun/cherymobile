import * as React from "react";
import { Component } from "react";
import {
	Platform,
	ScrollView,
	View,
	Image,
	Text
} from "react-native";

import { connect, Dispatch } from "react-redux";
import * as Constants from "./../../lib/Constants";
import RowAndroid from "../../app/components/row/index.android";
import RowIos from "../../app/components/row/index.ios";
import IDriveInfo from "../interfaces/driveInfo";
interface Props {
	navigator: any;
	tabLabel: string;
	driver: IDriveInfo;
}
interface State {}

export default class IntentInfo extends Component<Props, State> {
	public render() {
		if (this.props.driver == undefined) {
			return (
				<View>
					<Text>尚未取到数据</Text>
				</View>
			);
		}
		return (
			<View>
				{this.renderForm()}
			</View>
		);
	}
	private renderForm() {
		let driver = this.props.driver;

		if (Platform.OS === "android") {
			return (
				<ScrollView>
					<RowAndroid label="意向车型" contextType="text" displayValue={driver.intentionCarType} navigator={this.props.navigator} />
					<RowAndroid label="是否本人试驾" contextType="text" displayValue={driver.IsCustomerOwn ? "是" : "否"} navigator={this.props.navigator} />
					<RowAndroid label="试驾人姓名" contextType="text" displayValue={driver.DriverID} navigator={this.props.navigator} />
					<RowAndroid label="客户姓名" contextType="text" displayValue={driver.CustomerName} navigator={this.props.navigator} />
					<RowAndroid label="驾龄" contextType="text" displayValue={Number.parseInt(driver.DrivenExperience)} navigator={this.props.navigator} />
					<RowAndroid label="到店次数" contextType="text" displayValue={Number.parseInt(driver.ArrivalTimes)} navigator={this.props.navigator} />
					<RowAndroid label="购车关注点" contextType="text" displayValue={driver.MainPurchaseFocuscontent} navigator={this.props.navigator} />
					<RowAndroid label="购车用途" contextType="text" displayValue={driver.GroupCode} navigator={this.props.navigator} />
					<RowAndroid label="竞品车型" contextType="text" displayValue={driver.CompetitorNotes} navigator={this.props.navigator} />
					<RowAndroid label="身份证地址" contextType="text" displayValue={driver.Address} navigator={this.props.navigator} />
					<RowAndroid label="客户电话" contextType="text" displayValue={driver.mobile} navigator={this.props.navigator} />
				</ScrollView>
			);
		} else {
			return (
				<ScrollView>
					<RowIos label="意向车型" contextType="text" displayValue={driver.intentionCarType} navigator={this.props.navigator} />
					<RowIos label="是否本人试驾" contextType="text" displayValue={driver.IsCustomerOwn ? "是" : "否"} navigator={this.props.navigator} />
					<RowIos label="试驾人姓名" contextType="text" displayValue={driver.DriverID} navigator={this.props.navigator} />
					<RowIos label="客户姓名" contextType="text" displayValue={driver.CustomerName} navigator={this.props.navigator} />
					<RowIos label="驾龄" contextType="text" displayValue={Number.parseInt(driver.DrivenExperience)} navigator={this.props.navigator} />
					<RowIos label="到店次数" contextType="text" displayValue={Number.parseInt(driver.ArrivalTimes)} navigator={this.props.navigator} />
					<RowIos label="购车关注点" contextType="text" displayValue={driver.MainPurchaseFocuscontent} navigator={this.props.navigator} />
					<RowIos label="购车用途" contextType="text" displayValue={driver.GroupCode} navigator={this.props.navigator} />
					<RowIos label="竞品车型" contextType="text" displayValue={driver.CompetitorNotes} navigator={this.props.navigator} />
					<RowIos label="身份证地址" contextType="text" displayValue={driver.Address} navigator={this.props.navigator} />
					<RowIos label="客户电话" contextType="text" displayValue={driver.mobile} navigator={this.props.navigator} />
				</ScrollView>
			);
		}
	}
}
