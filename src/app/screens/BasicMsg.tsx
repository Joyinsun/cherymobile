"use strict";

import * as React from "react";
import { Component } from "react";
import { Dimensions, Platform, ScrollView, View, Text } from "react-native";
import { connect, Dispatch } from "react-redux";
import { fetchSelfMsg } from "../reducers/aboutMe/actions";
import * as GlobalVariable from "../../lib/global";
import RowAndroid from "../../app/components/row/index.android";
import RowIos from "../../app/components/row/index.ios";

import styles from "../styles/AboutMeStyle";
interface Props {
	userID: number;
	navigator: any;
	basicData: any;
	currentRole: string;
	dispatch: any;
	fetchSelfMsg(userID: number, navigator: any): void;
}

interface State {
}

class BasicMsg extends Component<Props, State> {
	public componentWillMount(): void {
		this.props.fetchSelfMsg(this.props.userID, this.props.navigator);
	}
	public render() {
		return (
			<View style={styles.mainContainer}>
				{this.renderForm()}
			</View>
		);
	}
	private renderForm(): JSX.Element {
		let basicDataList = this.props.basicData;
		if (Platform.OS === "android")
			return (
				<ScrollView>
					<RowAndroid label="姓名" contextType="text" displayValue={basicDataList ? basicDataList.name : null} navigator={this.props.navigator} />
					<RowAndroid label="用户ID" contextType="text" displayValue={basicDataList ? basicDataList.sciUserId : null} navigator={this.props.navigator} />
					<RowAndroid label="手机号码" contextType="text" displayValue={basicDataList ? basicDataList.mobile : null} navigator={this.props.navigator} />
					<RowAndroid label="性别" contextType="text" displayValue={basicDataList ? this.translateSexToCN(basicDataList.gender) : null} navigator={this.props.navigator} />
					<RowAndroid label="出生日期" contextType="text" displayValue={basicDataList ? basicDataList.birthDate : null} navigator={this.props.navigator} />
					<RowAndroid label="身份证号码" contextType="text" displayValue={basicDataList ? basicDataList.idCard : null} navigator={this.props.navigator} />
					<RowAndroid label="入职日期" contextType="text" displayValue={basicDataList ? basicDataList.entryDate : null} navigator={this.props.navigator} />
					<RowAndroid label="微信号" contextType="text" displayValue={basicDataList ? basicDataList.weChatId : null} navigator={this.props.navigator} />
					{(basicDataList && basicDataList.roles) ? (basicDataList.roles.length > 1 ?
						(< RowAndroid label="角色（多个）" contextType="text" navigator={this.props.navigator} />) :
						(< RowAndroid label="角色（单个）" contextType="text" navigator={this.props.navigator} />)
					) :
						< RowAndroid label="角色" contextType="text" navigator={this.props.navigator} />

					}
					{
						this.showRoles()
					}
				</ScrollView>
			);
		else
			return (
				<ScrollView  >
					<RowIos label="姓名" contextType="text" displayValue={basicDataList ? basicDataList.name : null} navigator={this.props.navigator} />
					<RowIos label="用户ID" contextType="text" displayValue={basicDataList ? basicDataList.sciUserId : null} navigator={this.props.navigator} />
					<RowIos label="手机号码" contextType="text" displayValue={basicDataList ? basicDataList.mobile : null} navigator={this.props.navigator} />
					<RowIos label="性别" contextType="text" displayValue={basicDataList ? this.translateSexToCN(basicDataList.gender) : null} navigator={this.props.navigator} />
					<RowIos label="出生日期" contextType="text" displayValue={basicDataList ? basicDataList.birthDate : null} navigator={this.props.navigator} />
					<RowIos label="身份证号码" contextType="text" displayValue={basicDataList ? basicDataList.idCard : null} navigator={this.props.navigator} />
					<RowIos label="入职日期" contextType="text" displayValue={basicDataList ? basicDataList.entryDate : null} navigator={this.props.navigator} />
					<RowIos label="微信号" contextType="text" displayValue={basicDataList ? basicDataList.weChatId : null} navigator={this.props.navigator} />
					<RowIos label="角色" contextType="text" navigator={this.props.navigator} />
					{(basicDataList && basicDataList.roles) ? (basicDataList.roles.length > 1 ?
						(< RowIos label="角色（多个）" contextType="text" navigator={this.props.navigator} />) :
						(< RowIos label="角色（单个）" contextType="text" navigator={this.props.navigator} />)
					) :
						< RowIos label="角色" contextType="text" navigator={this.props.navigator} />

					}
					{
						this.showRoles()
					}
				</ScrollView>
			);
	}
	private showRoles(): JSX.Element {
		let roleName = "";
		return (
			<View style={styles.container}>
				{GlobalVariable.userdetail.roles.map((item, index) => {
					switch (item) {
						case "ROLE_SALE_CONSULTANT":
							roleName = "销售顾问";
							break;
						case "ROLE_DIGITAL_MARKETING_MANAGER":
							roleName = "数字化营销经理";
							break;
						case "ROLE_TEST_DRIVER":
							roleName = "试驾专员";
							break;
						case "ROLE_STORE_MANAGER":
							roleName = "店总";
							break;
						case "ROLE_SHOWROOM_MANAGER":
							roleName = "展厅经理";
							break;
					}
					if (item === this.props.currentRole)
						roleName += "（当前）";
					return (<Text style={styles.textStyle}>{roleName}</Text>);
				})}
			</View>
		);

	}
	private translateSexToCN(genderStr: string): string {
		let sex = "";
		if (genderStr === "female")
			sex = "女";
		else
			sex = "男";
		return sex;
	}
}

function mapStateToProps(state: any) {
	return {
		basicData: state.aboutMe.data.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchSelfMsg: (userID: number, navigator: any) => {
			dispatch(fetchSelfMsg(userID, navigator));
		}, dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicMsg);
