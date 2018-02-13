import * as React from "react";
import { Component } from "react";
import { View, ScrollView, StyleSheet, Button, ActivityIndicator, Modal, Text, Linking, Alert } from "react-native";
import { connect, Dispatch } from "react-redux";
import Timeline from "../../../app/components/TimeLine/timeline";
import ILeadActivity from "../../../app/interfaces/LeadActivity";
import Communications from "react-native-communications";
import { fetchLeadActivityListsByLeadID, createLeadActivity } from "../../../app/reducers/leadActivity/actions";
import * as Constants from "../../../lib/Constants";
import TabSelectTable from "../../../app/components/tabSelectTable/tabSelectTable";
import ShowDialog from "../../../app/components/showDialog/showDialog";
import ILeadDetail from "../../../app/interfaces/leadDetail";
import CallDetectorManager from "react-native-call-detection";
import ContactType from "../../../app/interfaces/contactType";
import styles from "../../styles/FollowStyle";
import * as GlobalVariable from "../../../lib/global";
import Common from "../../../lib/Common";

interface Props {
	tabLabel?: string;
	navigator?: any;
	defaultShow?: ContactType;
	contactParameter?: any;
	dispatch: Dispatch<any>;
	lead: ILeadDetail;
	createRefresh: any;
	leadList: {
		data: Array<ILeadActivity>
		refresh: boolean
	};
	fetchLeadActivityListsByLeadID(iID: number, refresh: boolean): void;
	createLeadActivity(oData, refresh: boolean): void;
}
interface State {
	refresh: boolean;
	dataList: Array<ILeadActivity>;
	bCallEnable: boolean;
	bSMSEnable: boolean;
	bLocalEnable: boolean;
	bWechatEnable: boolean;
	bKnockdown: boolean;
	bOrderPlaced: boolean;
	visible: boolean;
	iCounts: number;
	sType: ContactType;
}
class FollowInfo extends Component<Props, State> {
	public timeLine: any;
	public showDialog: any;
	public tabSelectTable: any;
	public state: State = {
		refresh: false,
		dataList: [],
		bCallEnable: true,
		bSMSEnable: true,
		bLocalEnable: true,
		bWechatEnable: true,
		bKnockdown: false,
		bOrderPlaced: false,
		sType: ContactType.none,
		visible: false,
		iCounts: 0
	};

	public componentDidMount() {
		this.props.fetchLeadActivityListsByLeadID(Number.parseInt(this.props.lead.ID), true);
		this.checkFunctionButtonGroupEnable(this.props);
	}
	public checkFunctionButtonGroupEnable(oProps) {
		if (oProps.leadList.data && oProps.leadList.data[0]) {
			let sTypes = oProps.leadList.data[0].Purpose;
			if (sTypes.indexOf(Constants.CODE_ACTIVITY_PURPOSE_DEFEAT) > -1
				|| sTypes.indexOf(Constants.CODE_ACTIVITY_PURPOSE_UNSUBSCRIBE) > -1
				|| sTypes.indexOf(Constants.CODE_ACTIVITY_PURPOSE_RETURNEDGOODS) > -1) {
				this.state.bCallEnable = false;
				this.state.bSMSEnable = false;
				this.state.bLocalEnable = false;
				this.state.bWechatEnable = false;
			}
			if (sTypes.indexOf(Constants.CODE_ACTIVITY_PURPOSE_ORDERPLACED) > -1) {
				this.state.bOrderPlaced = true;
				this.state.bCallEnable = false;
				this.state.bSMSEnable = false;
				this.state.bWechatEnable = false;
			}
			if (sTypes.indexOf(Constants.CODE_ACTIVITY_PURPOSE_KNOCKDOWN) > -1) {
				this.state.bKnockdown = true;
				this.state.bCallEnable = false;
				this.state.bSMSEnable = false;
				this.state.bWechatEnable = false;
			}
		}
	}
	public componentWillReceiveProps(nextProps: Props) {
		let newList = nextProps.leadList;
		let bVisible = this.state.visible;
		if (newList.refresh) {
			this.setState({
				refresh: true
			});
		} else {
			this.checkFunctionButtonGroupEnable(nextProps);
			let bRefresh = false;
			if (this.props.defaultShow && this.props.defaultShow != ContactType.none && this.state.iCounts === 0) {
				bVisible = true;
				this.showDialog.show();
			}
			if (nextProps.createRefresh) {
				bRefresh = true;
			} else {
				if (!this.showDialog.state.hide) {
					this.props.fetchLeadActivityListsByLeadID(Number.parseInt(this.props.lead.ID), true);
					this.showDialog.close();
					this.state.visible = false;
					return;
				}
			}
			this.setState({
				refresh: bRefresh ? bRefresh : newList.refresh,
				dataList: newList.data,
				visible: bVisible,
				sType: this.props.defaultShow
			});
		}
	}
	public render() {
		return (<ScrollView style={styles.tabView}>
			<Timeline style={styles.list}
				data={(this.state && this.state.dataList && this.state.dataList.length > 0) ? this.state.dataList : []}
				ref={timeLine => {
					this.timeLine = timeLine;
				}}
				roleName="manager"
				onPressCall={this._pressCall.bind(this)}
				onPressLocal={this._pressLocal.bind(this)}
				onPressSMS={this._pressSMS.bind(this)}
				onPressWeChat={this._pressWeChat.bind(this)}
				bCallEnable={false}
				bSMSEnable={false}
				bLocalEnable={false}
				bWechatEnable={false}
				bKnockdown={false}
				bOrderPlaced={false} />
			<ShowDialog
				ref={showDialog => {
					this.showDialog = showDialog;
				}}
				width={Constants.SCREEN_WIDTH}
				height={Constants.SCREEN_HEIGHT * 0.8}
				visible={this.state.visible}>
				<View style={{ height: Constants.SCREEN_HEIGHT * 0.8 - 40 }}>
					<ScrollView contentContainerStyle={{ height: Constants.SCREEN_HEIGHT * 0.8 - 80 }}>
						<TabSelectTable
							ref={tabSelectTable => {
								this.tabSelectTable = tabSelectTable;
							}}
							type={this.state.sType}
							bKnockdown={this.state.bKnockdown}
							bOrderPlaced={this.state.bOrderPlaced}
							navigator={this.props.navigator}
						/>
					</ScrollView>
					<View style={styles.buttonVeiwPositon} >
						<Button title="取消" onPress={this.onPressCancel.bind(this)} />
						<Button title="确定" onPress={this.onPressSaveFollow.bind(this)} />
					</View>

				</View>
			</ShowDialog>
			<Modal
				visible={this.state.refresh}
				transparent={true}
				animationType="none"
				onRequestClose={() => {
					this._setModalVisible(false);
				}}
			>
				<ActivityIndicator
					animating={this.state.refresh}
					style={{
						height: 80
					}}
					size="large"
				/>
			</Modal>
		</ScrollView>);
	}
	private _setModalVisible(bValue) {
		this.setState({ refresh: false });
	}
	private _pressCall() {
		//TODO
		this.callCustomer();
		Communications.phonecall(this.props.lead.Mobile, false);
		this.setState({
			visible: true,
			sType: ContactType.call
		});
		this.state.iCounts++;
		this.showDialog.show();
	}
	private _pressLocal() {
		this.setState({
			visible: true,
			sType: ContactType.shop
		});
		this.state.iCounts++;
		this.showDialog.show();
	}
	private _pressSMS() {
		this.props.navigator.showModal({
			screen: "app.MessageTemplateScreen",
			title: "选择短信内容",
			animationType: "slide-horizontal",
			passProps: {
				phone: this.props.lead.Mobile,
				onSendComplete: () => {
					this.props.navigator.dismissModal();
					this.setState({
						visible: true,
						sType: ContactType.message
					});
				}
			}
		});
		this.state.iCounts++;
		this.showDialog.show();
	}
	private _pressWeChat() {
		let url = "weixin://";
		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
			} else {
				Alert.alert(
					"提示",
					"请安装微信",
					[
						{ text: "确定", onPress: () => console.log("OK Pressed!") },
					]
				);
			}
		}).then(() => {
			this.setState({
				visible: true,
				sType: ContactType.shop
			});
		});
		this.state.iCounts++;
		this.showDialog.show();
	}

	private callCustomer() {
		let aDataList = [];
		let dialTime = new Date().toLocaleString();
		let data = {
			startDateTime: 0,
			endDateTime: 0,
			callResult: null,
			phoneDuration: 0
		};
		console.log("开始打电话------------------");
		let callDetector = new CallDetectorManager((event) => {
			console.log("状态-------------" + event);
			if (event === "Disconnected") {
				if (callDetector) {
					callDetector.dispose();
				}
				const dialConnectedTime = (new Date().getTime() - data.startDateTime) / 1000;
				let message = "";
				if (data.startDateTime === 0)
					message = "拨号时间:" + dialTime + ", 客户未接";
				else
					message = "通话时间:" + dialTime + ", 共" + dialConnectedTime + "秒";

				aDataList.push({
					history: message
				});
			} else if (event === "Connected") {
				data.startDateTime = new Date().getTime();
			} else if (event === "Offhook") {
				data.callResult = "Offhook";
			}
		},
			false,
			(error) => { Common.showNotification(error, this.props.navigator); },
			{
				title: "Phone State Permission",
				message: "This app needs access to your phone state in order to react and/or to adapt to incoming calls."
			});
		Linking.openURL("tel:" + this.props.lead.Mobile).catch(err => {
			console.log("打电话报错" + err);
			Common.showNotification(err, this.props.navigator);
		});
	}

	private onPressCancel() {
		this.showDialog.close();
	}
	private onPressSaveFollow() {
		let sMsg = this.validationData();
		if (sMsg != "") {
			this.showNotification(sMsg);
			return;
		}
		let data = this.tabSelectTable.state.data;
		let oSaveData = new Object();
		for (var key in data) {
			if (data.hasOwnProperty(key) && (data[key] != "")) {
				if (key === "AppointmentDate" || key === "ArrivalTime" || key === "NextActivityTime" || key === "ActivityTime" || key === "APPActivityDateTime2") {
					oSaveData[key] = "/Date(" + new Date(data[key]).getTime() + ")/";
				} else {
					if (key === "IsCustomerOwn" && this.tabSelectTable.state.aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_TESTDRIVE)) {
						oSaveData[key] = data[key];
					} else {
						oSaveData[key] = data[key];
					}
				}
			}
		}
		oSaveData["Purpose"] = this.tabSelectTable.state.aSelectGroups.toString();
		oSaveData["SubjectName"] = this.tabSelectTable.state.aSelectGroups.toString();
		oSaveData["CustomerInternalID"] = this.props.lead.CustomerID;
		oSaveData["LeadIDcontent"] = this.props.lead.ID;
		if (this.tabSelectTable.state.aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_INVITE)) {
			oSaveData["APPTask"] = "Z2";
			oSaveData["APPActivityDateTime2"] = oSaveData["ArrivalTime"];
		} else if (this.tabSelectTable.state.aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_TESTDRIVE)) {
			oSaveData["APPTask"] = "Z3";
			oSaveData["TestDrivenStatus"] = "01";
			oSaveData["APPActivityDateTime2"] = oSaveData["NextActivityTime"];
		} else if (this.tabSelectTable.state.aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_ORDERPLACED)) {
			oSaveData["APPTask"] = "Z4";
			oSaveData["APPActivityDateTime2"] = oSaveData["NextActivityTime"];
		} else if (this.tabSelectTable.state.aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_KNOCKDOWN)) {
			oSaveData["APPTask"] = "Z5";
			oSaveData["APPActivityDateTime2"] = oSaveData["NextActivityTime"];
		} else {
			oSaveData["APPTask"] = "Z1";
			oSaveData["APPActivityDateTime2"] = oSaveData["NextActivityTime"];
		}
		this.props.createLeadActivity(oSaveData, true);
	}
	private validationData() {
		let sMsg = "";
		let data = this.tabSelectTable.state.data;
		let aSelectGroups = this.tabSelectTable.state.aSelectGroups;
		if (!aSelectGroups || aSelectGroups.length <= 0) {
			sMsg = "请选择跟进类型!";
			return sMsg;
		}
		if (aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_ORDERDRIVE) && data.AppointmentDate === "") {
			sMsg = "请选择预约试驾时间!";
			return sMsg;
		}
		if (aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_INVITE) && data.ArrivalTime === "") {
			sMsg = "请选择下次到店时间!";
			return sMsg;
		}
		if (aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_ORDERPLACED)) {
			if (data.QuoteAmount_content === "") {
				sMsg = "请输入下订金额!";
				return sMsg;
			}
			if (!Constants.FLOAT_REGEX.test(data.QuoteAmount_content)) {
				sMsg = "请输入正确金额!";
				return sMsg;
			}
		}
		if (aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_TESTDRIVE)) {
			if (data.VehicleModel === "") {
				sMsg = "请选择试驾车型!";
				return sMsg;
			}
			// if (data.IsDLScanned === "") {
			// 	sMsg = "请扫描驾照!";
			// 	return sMsg;
			// }
			// if (data.IsIDCScanned === "") {
			// 	sMsg = "请扫描身份证!";
			// 	return sMsg;
			// }
		}
		if (aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_KNOCKDOWN) && data.IsRecepitScanned === "") {
			sMsg = "请扫描身份证!";
			return sMsg;
		}
		if (aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_DEFEAT)
			|| aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_RETURNEDGOODS)
			|| aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_UNSUBSCRIBE)) {

			if (data.Reason1content === "") {
				sMsg = "请选择战败类别!";
				return sMsg;
			}
			if (data.Reason1content === "Z01" && data.Reason1content === "Z02" && data.Reason2content === "") {
				sMsg = "请选择战败原因!";
				return sMsg;
			}
		}
		if (aSelectGroups.includes(Constants.CODE_ACTIVITY_PURPOSE_RETURNVISIT) && data.ActivityTime === "") {
			sMsg = "请选择本次跟进时间!";
			return sMsg;
		} else {
			if (data.ActivityTime === "") {
				sMsg = "请选择本次跟进时间!";
				return sMsg;
			}
			if (data.IntentionLevelText === "") {
				sMsg = "请选择意向级别!";
				return sMsg;
			}
			if (data.IntentModel === "") {
				sMsg = "请选择意向车型!";
				return sMsg;
			}
			if (data.NextActivityTime === "") {
				sMsg = "请选择下次跟进时间!";
				return sMsg;
			}
		}
		return sMsg;
	}
	private showNotification(sMsg: string): void {
		Common.showNotification(sMsg, this.props.navigator);
	}
}
function mapStateToProps(state: any) {
	return {
		leadList: state.leadActivity.leadActivityList,
		createRefresh: state.leadActivity.createLeadActivity.refresh
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createLeadActivity(oData, refresh: boolean) {
			dispatch(createLeadActivity(oData, refresh));
		},
		fetchLeadActivityListsByLeadID: (iID: number, refresh: boolean) => {
			dispatch(fetchLeadActivityListsByLeadID(iID, refresh));
		}, dispatch
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(FollowInfo);
