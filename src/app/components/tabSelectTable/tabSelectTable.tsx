import * as React from "react";
import { Component } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	Platform,
	Text
} from "react-native";
import RowAndroid from "../row/index.android";
import RowIos from "../row/index.ios";
import Buttton from "./button";
import * as Constants from "../../../lib/Constants";
import styles from "./tabSelectTableStyle";
import ILeadActivity from "../../../app/interfaces/LeadActivity";
import ContactType from "../../../app/interfaces/contactType";
import * as GlobalVariable from "../../../lib/global";

interface Props {
	type: ContactType;
	navigator?: any;
	bKnockdown?: boolean;
	bOrderPlaced?: boolean;
}
   // 报价
   //bQuote:boolean,
   //bQuoteEnable:boolean,
interface State {
	bOrderDrive: boolean;
	bInvite: boolean;
	bOrderPlaced: boolean;
	bTestDrive: boolean;
	bKnockdown: boolean;
	bDefeat: boolean;
	bReturnVisit: boolean;
	bOrderDriveEnable: boolean;
	bInviteEnable: boolean;
	bOrderPlacedEnable: boolean;
	bTestDriveEnable: boolean;
	bKnockdownEnable: boolean;
	bDefeatEnable: boolean;
	bReturnVisitEnable: boolean;
	bUnsubscribe: boolean;
	bReturnedGoods: boolean;
	aSelectGroups: Array<any>;
	data: ILeadActivity;
	Reason2contentTexts: string;
	Reason2contentEditable: boolean;
}
export default class TabSelectTable extends Component<Props, State> {
	public aCallGroup: any;
	public aSMSGroup: any;
	public aLocalGroup: any;
	public state: State = {
		bOrderDrive: false,
		bInvite: false,
		bOrderPlaced: false,
		bTestDrive: false,
		bKnockdown: false,
		bDefeat: false,
		bReturnVisit: false,
		bUnsubscribe: false,
		bReturnedGoods: false,

		bOrderDriveEnable: true,
		bInviteEnable: true,
		bOrderPlacedEnable: true,
		bTestDriveEnable: true,
		bKnockdownEnable: true,
		bDefeatEnable: true,
		bReturnVisitEnable: true,

		Reason2contentTexts: "请选择",
		Reason2contentEditable: false,
		aSelectGroups: [],
		data: {
			Purpose: "", //跟进小类
			GroupCode: "", //跟进大类
			QuoteAmount_content: "", //下订金额
			AppointmentDate: "", //预约试驾时间
			ArrivalTime: "", //下次到店时间
			NextActivityTime: "", //下次跟进时间
			VehicleModel: "请选择", //试驾车型
			VehicleModeID: "", //试驾车型id
			DriverID: "", //试驾员ID
			IsCustomerOwn: true, //是否客户本人试驾
			IsDLScanned: "", //驾照扫描
			IsIDCScanned: "", //身份证扫描
			OtherVehicleModelID: "", //试驾超过一辆车型
			OtherVehicleModel: "请选择",
			IsRecepitScanned: "", //发票扫描
			CampaignName: "请选择", //活动
			CampaignID: "",
			PhoneDuration: "",
			ActivityTime: "", //本次跟进时间
			IntentModeID: "", //意向车型
			IntentModel: "请选择", //意向车型
			CustomerResponse: "", //客户反馈
			IntentionLevel: "", //意向等级
			IntentionLevelText: "请选择",
			Reason1content: "请选择", //战败/流失原因一类
			Reason2content: "", //战败/流失原因二类
			Reason1contentText: "",
			Reason2contentText: ""
		}
	};

	public render() {
		let that = this;
		switch (this.props.type) {
			case ContactType.call:
				that.state.data.GroupCode = Constants.CODE_ACTIVITY_GROUPCODE_CALL;
				break;
			case ContactType.shop:
				that.state.data.GroupCode = Constants.CODE_ACTIVITY_GROUPCODE_LOCAL;
				break;
			case ContactType.wechat:
				that.state.data.GroupCode = Constants.CODE_ACTIVITY_GROUPCODE_WECHAT;
				break;
			case ContactType.message:
				that.state.data.GroupCode = Constants.CODE_ACTIVITY_GROUPCODE_SMS;
				break;
			default:
				break;
		}
		if (this.props.type === ContactType.none) {
			return (<View>
			</View>);
		}
		return (<ScrollView>
			{this._renderButtonGroup()}
			{this._renderTable()}
		</ScrollView>);
	}
	private _renderButtonGroup() {
		if (this.props.type === ContactType.call) {
			return (<View style={[styles.groupContainer]}>
				<View style={[styles.groupDetail]}>
					<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_ORDERDRIVE} label="bOrderDrive" title={Constants.CN_ORDERDRIVE} pressed={this.state.bOrderDrive} enabled={this.state.bOrderDriveEnable} onPress={this._select.bind(this)} />
					<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_INVITE} label="bInvite" title={Constants.CN_INVITE} pressed={this.state.bInvite} enabled={this.state.bInviteEnable} onPress={this._select.bind(this)} />
					<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_DEFEAT} label="bDefeat" title={Constants.CN_DEFEAT} pressed={this.state.bDefeat} enabled={this.state.bDefeatEnable} onPress={this._select.bind(this)} />
					<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_RETURNVISIT} label="bReturnVisit" title={Constants.CN_RETURNVISIT} pressed={this.state.bReturnVisit} enabled={this.state.bReturnVisitEnable} onPress={this._select.bind(this)} />
				</View>
			</View>);

		} else if (this.props.type === ContactType.message) {
			return (<View style={[styles.groupContainer]}>
				<View style={[styles.groupDetail]}>
					<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_INVITE} label="bInvite" title={Constants.CN_INVITE} pressed={this.state.bInvite} enabled={this.state.bInviteEnable} onPress={this._select.bind(this)} />
				</View>
			</View>);
		} else if (this.props.type === ContactType.shop) {
			if (this.props.bKnockdown) {
				return (<View style={[styles.groupContainer]}>
					<View style={[styles.groupDetail]}>
						<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_ORDERDRIVE} label="bOrderDrive" title={Constants.CN_ORDERDRIVE} pressed={this.state.bOrderDrive} enabled={false} onPress={this._select.bind(this)} />
						<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_INVITE} label="bInvite" title={Constants.CN_INVITE} pressed={this.state.bInvite} enabled={false} onPress={this._select.bind(this)} />
						<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_ORDERPLACED} label="bOrderPlaced" title={Constants.CN_ORDERPLACED} pressed={false} enabled={false} onPress={this._select.bind(this)} />
						<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_TESTDRIVE} label="bTestDrive" title={Constants.CN_TESTDRIVE} pressed={false} enabled={false} onPress={this._select.bind(this)} />
					</View>
					<View style={[styles.groupDetail]}>
						<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_RETURNVISIT} label="bReturnVisit" title={Constants.CN_RETURNVISIT} pressed={this.state.bReturnVisit} enabled={false} onPress={this._select.bind(this)} />
						<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_RETURNEDGOODS} label="bReturnedGoods" title={Constants.CN_RETURNEDGOODS} pressed={this.state.bReturnedGoods} enabled={true} onPress={this._select.bind(this)} />
					</View>
				</View>);
			}
			if (this.props.bOrderPlaced) {
				return (<View style={[styles.groupContainer]}>
					<View style={[styles.groupDetail]}>
						<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_ORDERDRIVE} label="bOrderDrive" title={Constants.CN_ORDERDRIVE} pressed={false} enabled={false} onPress={this._select.bind(this)} />
						<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_INVITE} label="bInvite" title={Constants.CN_INVITE} pressed={false} enabled={false} onPress={this._select.bind(this)} />
						<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_ORDERPLACED} label="bOrderPlaced" title={Constants.CN_ORDERPLACED} pressed={false} enabled={false} onPress={this._select.bind(this)} />
						<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_TESTDRIVE} label="bTestDrive" title={Constants.CN_TESTDRIVE} pressed={false} enabled={false} onPress={this._select.bind(this)} />
					</View>
					<View style={[styles.groupDetail]}>
						<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_KNOCKDOWN} label="bKnockdown" title={Constants.CN_KNOCKDOWN} pressed={this.state.bKnockdown} enabled={true} onPress={this._select.bind(this)} />
						<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_UNSUBSCRIBE} label="bUnsubscribe" title={Constants.CN_UNSUBSCRIBE} pressed={this.state.bUnsubscribe} enabled={true} onPress={this._select.bind(this)} />
					</View>
				</View>);
			}
			return (<View style={[styles.groupContainer]}>
				<View style={[styles.groupDetail]}>
					<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_ORDERDRIVE} label="bOrderDrive" title={Constants.CN_ORDERDRIVE} pressed={this.state.bOrderDrive} enabled={this.state.bOrderDriveEnable} onPress={this._select.bind(this)} />
					<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_INVITE} label="bInvite" title={Constants.CN_INVITE} pressed={this.state.bInvite} enabled={this.state.bInviteEnable} onPress={this._select.bind(this)} />
					<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_ORDERPLACED} label="bOrderPlaced" title={Constants.CN_ORDERPLACED} pressed={this.state.bOrderPlaced} enabled={this.state.bOrderPlacedEnable} onPress={this._select.bind(this)} />
					<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_TESTDRIVE} label="bTestDrive" title={Constants.CN_TESTDRIVE} pressed={this.state.bTestDrive} enabled={this.state.bTestDriveEnable} onPress={this._select.bind(this)} />
				</View>
				<View style={[styles.groupDetail]}>
					<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_KNOCKDOWN} label="bKnockdown" title={Constants.CN_KNOCKDOWN} pressed={this.state.bKnockdown} enabled={this.state.bKnockdownEnable} onPress={this._select.bind(this)} />
					<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_DEFEAT} label="bDefeat" title={Constants.CN_DEFEAT} pressed={this.state.bDefeat} enabled={this.state.bDefeatEnable} onPress={this._select.bind(this)} />
				</View>
			</View>);
		} else if (this.props.type === "wechat") {
			return (<View style={[styles.groupContainer]}>
				<View style={[styles.groupDetail]}>
					<Buttton type={Constants.CODE_ACTIVITY_PURPOSE_INVITE} label="bInvite" title={Constants.CN_INVITE} pressed={this.state.bInvite} enabled={this.state.bInviteEnable} onPress={this._select.bind(this)} />
				</View>
			</View>);
		}
	}
	private _select(oElement): any {
		let oState = this.state;
		oState[oElement.props.label] = !oState[oElement.props.label];
		if (oState[oElement.props.label]) {
			this.state.aSelectGroups.push(oElement.props.type);
		} else {
			let iIndex = this.state.aSelectGroups.indexOf(oElement.props.type);
			if (iIndex > -1) {
				this.state.aSelectGroups.splice(iIndex, 1);
			}
		}
		switch (oElement.props.label) {
			case "bOrderDrive":
				if (oState.bOrderDrive) {
					oState.bOrderPlacedEnable = false;
					oState.bKnockdownEnable = false;
					oState.bReturnVisitEnable = false;
					oState.bOrderPlaced = false;
					oState.bKnockdown = false;
					oState.bReturnVisit = false;
				} else {
					oState.bOrderPlacedEnable = true;
					oState.bKnockdownEnable = true;
					oState.bReturnVisitEnable = true;
				}
				break;
			case "bInvite":
				if (oState.bInvite) {
					oState.bOrderPlacedEnable = false;
					oState.bKnockdownEnable = false;
					oState.bReturnVisitEnable = false;
					oState.bOrderPlaced = false;
					oState.bKnockdown = false;
					oState.bReturnVisit = false;
				} else {
					oState.bOrderPlacedEnable = true;
					oState.bKnockdownEnable = true;
					oState.bReturnVisitEnable = true;
				}
				break;
			case "bOrderPlaced":
				if (oState.bOrderPlaced) {
					oState.bOrderDriveEnable = false;
					oState.bInviteEnable = false;
					oState.bKnockdownEnable = false;
					oState.bDefeatEnable = false;
					oState.bOrderDrive = false;
					oState.bInvite = false;
					oState.bKnockdown = false;
					oState.bDefeat = false;
				} else {
					oState.bOrderDriveEnable = true;
					oState.bInviteEnable = true;
					oState.bKnockdownEnable = true;
					oState.bDefeatEnable = true;
				}
				break;
			case "bTestDrive":
				if (oState.bTestDrive) {
					oState.bOrderDriveEnable = true;
					oState.bInviteEnable = true;
					//oState.bQuoteEnable = true;
					oState.bOrderPlacedEnable = true;
					oState.bTestDriveEnable = true;
					oState.bKnockdownEnable = true;
					oState.bDefeatEnable = true;
				}
				break;
			case "bKnockdown":
				if (oState.bKnockdown) {
					oState.bOrderDriveEnable = false;
					oState.bInviteEnable = false;
					oState.bOrderPlacedEnable = false;
					oState.bDefeatEnable = false;
					oState.bOrderDrive = false;
					oState.bInvite = false;
					oState.bOrderPlaced = false;
					oState.bDefeat = false;
				} else {
					oState.bOrderDriveEnable = true;
					oState.bInviteEnable = true;
					oState.bOrderPlacedEnable = true;
					oState.bDefeatEnable = true;
				}
				break;
			case "bDefeat":
				if (oState.bDefeat) {
					oState.bOrderDriveEnable = false;
					oState.bInviteEnable = false;
					//oState.bQuoteEnable = false;
					oState.bOrderPlacedEnable = false;
					oState.bTestDriveEnable = false;
					oState.bKnockdownEnable = false;
					oState.bOrderDrive = false;
					oState.bInvite = false;
					//oState.bQuote = false;
					oState.bOrderPlaced = false;
					oState.bTestDrive = false;
					oState.bKnockdown = false;
					oState.bReturnVisitEnable = false;
					oState.bReturnVisit = false;
				} else {
					oState.bOrderDriveEnable = true;
					oState.bInviteEnable = true;
					//oState.bQuoteEnable = true;
					oState.bOrderPlacedEnable = true;
					oState.bTestDriveEnable = true;
					oState.bKnockdownEnable = true;
					oState.bReturnVisitEnable = true;
				}
				break;
			case "bReturnVisit":
				if (oState.bReturnVisit) {
					oState.bOrderDriveEnable = false;
					oState.bInviteEnable = false;
					oState.bOrderPlacedEnable = false;
					oState.bTestDriveEnable = false;
					oState.bKnockdownEnable = false;
					oState.bDefeatEnable = false;
					oState.bOrderDrive = false;
					oState.bInvite = false;
					oState.bOrderPlaced = false;
					oState.bTestDrive = false;
					oState.bKnockdown = false;
					oState.bDefeat = false;
				} else {
					oState.bOrderDriveEnable = true;
					oState.bInviteEnable = true;
					oState.bOrderPlacedEnable = true;
					oState.bTestDriveEnable = true;
					oState.bKnockdownEnable = true;
					oState.bDefeatEnable = true;
				}
				break;
			default:
				break;
		}
		if (oState.bOrderDrive) {
			oState.bOrderPlacedEnable = false;
			oState.bKnockdownEnable = false;
		}
		if (oState.bInvite) {
			oState.bOrderPlacedEnable = false;
			oState.bKnockdownEnable = false;
		}
		if (oState.bOrderPlaced) {
			oState.bOrderDriveEnable = false;
			oState.bInviteEnable = false;
			oState.bKnockdownEnable = false;
			oState.bDefeatEnable = false;
		}
		if (oState.bTestDrive) {
			oState.bOrderDriveEnable = true;
			oState.bInviteEnable = true;
			oState.bOrderPlacedEnable = true;
			oState.bTestDriveEnable = true;
			oState.bKnockdownEnable = true;
			oState.bDefeatEnable = true;
		}
		if (oState.bKnockdown) {
			oState.bOrderDriveEnable = false;
			oState.bInviteEnable = false;
			oState.bOrderPlacedEnable = false;
			oState.bDefeatEnable = false;
		}
		if (oState.bDefeat) {
			oState.bOrderDriveEnable = false;
			oState.bInviteEnable = false;
			oState.bOrderPlacedEnable = false;
			oState.bTestDriveEnable = false;
			oState.bKnockdownEnable = false;
		}
		if (oState.bReturnVisit) {
			oState.bOrderDriveEnable = false;
			oState.bInviteEnable = false;
			oState.bOrderPlacedEnable = false;
			oState.bTestDriveEnable = false;
			oState.bKnockdownEnable = false;
		}
		this.setState(oState);
	}
	private _renderTable() {
		let aIsCustomerOwn = [
			{
				id: 0,
				key: true,
				value: "是"
			},
			{
				id: 2,
				key: false,
				value: "否"
			},
		];
		if (!this.state)
			return;
		if (Platform.OS === "android")
			return (
				<View style={styles.tableContaint}>
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="AppointmentDate" label="预约试驾时间*" contextType="datepicker" visible={this.state.bOrderDrive} displayValue={this.state.data.AppointmentDate} navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="ArrivalTime" label="下次到店时间*" contextType="datetimepicker" visible={this.state.bInvite} displayValue={this.state.data.ArrivalTime} navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="QuoteAmount_content" label="下订金额*" contextType="input" visible={this.state.bOrderPlaced} displayValue={this.state.data.QuoteAmount_content} navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="VehicleModel" label="试驾车型*" dataSource={GlobalVariable.metadata.activityTestCarList.data} contextType="picker" visible={this.state.bTestDrive} displayValue={this.state.data.VehicleModel} navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IsCustomerOwn" dataSource={aIsCustomerOwn} label="是否客户本人试驾" contextType="picker" visible={this.state.bTestDrive} displayValue={this.state.data.IsCustomerOwn ? "是" : "否"} navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IsDLScanned" label="驾照扫描" contextType="text" visible={this.state.bTestDrive} displayValue="功能开发中..." navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IsIDCScanned" label="身份证扫描*" contextType="text" visible={this.state.bTestDrive} displayValue="功能开发中..." navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OtherVehicleModel" label="试驾超过一辆车型*" dataSource={GlobalVariable.metadata.activityTestCarList.data} contextType="picker" visible={this.state.bTestDrive} displayValue={this.state.data.OtherVehicleModel} navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IsRecepitScanned" label="发票扫描*" contextType="input" visible={this.state.bKnockdown} displayValue="功能开发中..." navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="Reason1contentText" label="战败类别*" dataSource={GlobalVariable.metadata.activityReason1List.data} contextType="picker" visible={this.state.bDefeat || this.state.bUnsubscribe || this.state.bReturnedGoods} displayValue={this.state.data.Reason1contentText} navigator={this.props.navigator} />
					<RowAndroid editable={this.state.Reason2contentEditable} onChangeEvent={this.onValueChange.bind(this)} name="Reason2contentText" label="战败原因*" dataSource={GlobalVariable.metadata.activityReason2List.data} contextType="multiSelect" visible={this.state.bDefeat || this.state.bUnsubscribe || this.state.bReturnedGoods} displayValue={this.state.Reason2contentTexts} navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="CampaignName" label="活动" dataSource={GlobalVariable.metadata.activityCampaignList.data} contextType="picker" visible={!this.state.bReturnVisit} displayValue={this.state.data.CampaignName} navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="ActivityTime" label="本次跟进时间*" contextType="datetimepicker" displayValue={this.state.data.ActivityTime} navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IntentionLevelText" label="意向等级*" dataSource={GlobalVariable.metadata.activityIntentionLevelList.data} contextType="picker" visible={!this.state.bReturnVisit} displayValue={this.state.data.IntentionLevelText} navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IntentModel" rootScreenTitle={Constants.CN_INTENTCARMODEL}  hasChild={true} childScreenTitle="品种/动总/型号" dataSource={GlobalVariable.metadata.carTypeList.data} label="意向车型*" contextType="picker" visible={!this.state.bReturnVisit} displayValue={this.state.data.IntentModel} navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="NextActivityTime" label="下次跟进时间*" contextType="datetimepicker" visible={!this.state.bReturnVisit} displayValue={this.state.data.NextActivityTime} navigator={this.props.navigator} />
					<RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="CustomerResponse" label="客户反馈" contextType="textarea" displayValue={this.state.data.CustomerResponse} displayType="column" displayCounterText={true} maxLength={200} navigator={this.props.navigator} />
				</View>
			);
		else
			return (
				<View style={styles.tableContaint}>
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="AppointmentDate" label="预约试驾时间*" contextType="datepicker" visible={this.state.bOrderDrive} displayValue={this.state.data.AppointmentDate} navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="ArrivalTime" label="下次到店时间*" contextType="datetimepicker" visible={this.state.bInvite} displayValue={this.state.data.ArrivalTime} navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="QuoteAmount_content" label="下订金额*" contextType="input" visible={this.state.bOrderPlaced} displayValue={this.state.data.QuoteAmount_content} navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="VehicleModel" label="试驾车型*" dataSource={GlobalVariable.metadata.activityTestCarList.data} contextType="picker" visible={this.state.bTestDrive} displayValue={this.state.data.VehicleModel} navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IsCustomerOwn" dataSource={aIsCustomerOwn} label="是否客户本人试驾" contextType="picker" visible={this.state.bTestDrive} displayValue={this.state.data.IsCustomerOwn ? "是" : "否"} navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IsDLScanned" label="驾照扫描" contextType="text" visible={this.state.bTestDrive} displayValue="功能开发中..." navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IsIDCScanned" label="身份证扫描*" contextType="text" visible={this.state.bTestDrive} displayValue="功能开发中..." navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OtherVehicleModel" label="试驾超过一辆车型*" dataSource={GlobalVariable.metadata.activityTestCarList.data} contextType="picker" visible={this.state.bTestDrive} displayValue={this.state.data.OtherVehicleModel} navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IsRecepitScanned" label="发票扫描*" contextType="input" visible={this.state.bKnockdown} displayValue="功能开发中..." navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="Reason1contentText" label="战败类别*" dataSource={GlobalVariable.metadata.activityReason1List.data} contextType="picker" visible={this.state.bDefeat || this.state.bUnsubscribe || this.state.bReturnedGoods} displayValue={this.state.data.Reason1contentText} navigator={this.props.navigator} />
					<RowIos editable={this.state.Reason2contentEditable} onChangeEvent={this.onValueChange.bind(this)} name="Reason2contentText" label="战败原因*" dataSource={GlobalVariable.metadata.activityReason2List.data} contextType="multiSelect" visible={this.state.bDefeat || this.state.bUnsubscribe || this.state.bReturnedGoods} displayValue={this.state.Reason2contentTexts} navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="CampaignName" label="活动" contextType="picker" dataSource={GlobalVariable.metadata.activityCampaignList.data} visible={!this.state.bReturnVisit} displayValue={this.state.data.CampaignName} navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="ActivityTime" label="本次跟进时间*" contextType="datetimepicker" displayValue={this.state.data.ActivityTime} navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IntentionLevelText" label="意向等级*" dataSource={GlobalVariable.metadata.activityIntentionLevelList.data} contextType="picker" visible={!this.state.bReturnVisit} displayValue={this.state.data.IntentionLevelText} navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IntentModel" rootScreenTitle={Constants.CN_INTENTCARMODEL} hasChild={true} childScreenTitle="品种/动总/型号" dataSource={GlobalVariable.metadata.carTypeList.data} label="意向车型*" contextType="picker" visible={!this.state.bReturnVisit} displayValue={this.state.data.IntentModel} navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="NextActivityTime" label="下次跟进时间*" contextType="datetimepicker" visible={!this.state.bReturnVisit} displayValue={this.state.data.NextActivityTime} navigator={this.props.navigator} />
					<RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="CustomerResponse" label="客户反馈" contextType="textarea" displayValue={this.state.data.CustomerResponse} displayType="column" displayCounterText={true} maxLength={200} navigator={this.props.navigator} />
				</View>
			);
	}
	private onValueChange(displayInfo: any): void {
		let oData = this.state.data;
		let that = this;
		for (var key in displayInfo) {
			if (displayInfo.hasOwnProperty(key)) {
				switch (key) {
					case "CampaignName":
						oData[key] = displayInfo[key].value;
						oData["CampaignID"] = displayInfo[key].key;
						break;
					case "Reason1contentText":
						oData[key] = displayInfo[key].value;
						oData["Reason1content"] = displayInfo[key].key;
						if (oData["Reason1content"] === "Z01" || oData["Reason1content"] === "Z01") {
							that.state.Reason2contentEditable = true;
						} else {
							oData.Reason2content = "";
							that.state.Reason2contentTexts = "";
							that.state.Reason2contentEditable = false;
						}
						break;
					case "Reason2contentText":
						let aValues = displayInfo[key];
						if (aValues.length === 1) {
							// oData["Reason2content"] = aValues[0].key;
							// that.state.Reason2contentTexts = aValues[0].value;
							oData["Reason2Text"] = aValues[0].value;
						} else {
							let aStr = [];
							aValues.forEach(function(value) {
								aStr.push(value.value);
							});
							let sKey = JSON.stringify(aStr).replace(new RegExp("\",\"", "gm"), "/").split("[\"")[1].split("\"]")[0];
							that.state.Reason2contentTexts = "多选";
							oData["Reason2Text"] = sKey;
						}
						break;
					case "IntentionLevelText":
						oData[key] = displayInfo[key].value;
						oData["IntentionLevel"] = displayInfo[key].key;
						break;
					case "VehicleModel":
						oData[key] = displayInfo[key].value;
						oData["VehicleModeID"] = displayInfo[key].key;
						oData["DriverID"] = displayInfo[key].id;
						break;
					case "IntentModel":
						oData[key] = displayInfo[key].value;
						oData["IntentModeID"] = displayInfo[key].key.toString();
						break;
					case "IsCustomerOwn":
						oData[key] = displayInfo[key].key;
						break;
					case "OtherVehicleModel":
						oData[key] = displayInfo[key].value;
						oData["OtherVehicleModelID"] = displayInfo[key].key;
						oData["DriverID"] = displayInfo[key].id;
						break;
					default:
						oData[key] = displayInfo[key];
						break;
				}
			}
		}
		this.setState({
			Reason2contentTexts: this.state.Reason2contentTexts,
			Reason2contentEditable: this.state.Reason2contentEditable,
			data: oData
		});
	}
}
