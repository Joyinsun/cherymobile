import * as React from "react";
import { Component } from "react";
import { View, ScrollView, StyleSheet, Button } from "react-native";
import { connect, Dispatch } from "react-redux";
import Timeline from "../../../app/components/TimeLine/timeline";
import ILeadActivity from "../../../app/interfaces/LeadActivity";
import { fetchLeadActivityListsByLeadID, createLeadActivity } from "../../../app/reducers/leadActivity/actions";
import * as Constants from "../../../lib/Constants";
import TabSelectTable from "../../../app/components/tabSelectTable/tabSelectTable";
import ShowDialog from "../../../app/components/showDialog/showDialog";
import ILead from "../../../app/interfaces/lead";
import ContactType from "../../../app/interfaces/contactType";
import styles from "../../styles/FollowStyle";
interface Props {
	tabLabel?: string;
	navigator?: any;
	defaultShow?: ContactType;
	dispatch: Dispatch<any>;
	lead: ILead;
	leadList: {
		data: Array<ILeadActivity>
		refresh: boolean
	};
	fetchLeadActivityListsByLeadID(iID: number, navigator: any, refresh: boolean): void;
	createLeadActivity(oData, navigator: any): void;
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
		visible: false
	};

	public componentDidMount() {
		var that = this;
		this.props.fetchLeadActivityListsByLeadID(Number.parseInt(this.props.lead.ID), that.props.navigator, true);
		this.checkFunctionButtonGroupEnable(this.props);
	}
	public checkFunctionButtonGroupEnable(oProps) {
		if (oProps.leadList.data && oProps.leadList.data[0]) {
			let sTypes = oProps.leadList.data[0].Purpose;
			if (sTypes.indexOf(Constants.CODE_ACTIVITY_PURPOSE_DEFEAT) > 0
				|| sTypes.indexOf(Constants.CODE_ACTIVITY_PURPOSE_UNSUBSCRIBE) > 0
				|| sTypes.indexOf(Constants.CODE_ACTIVITY_PURPOSE_RETURNEDGOODS) > 0) {
				this.state.bCallEnable = false;
				this.state.bSMSEnable = false;
				this.state.bLocalEnable = false;
				this.state.bWechatEnable = false;
			}
			if (sTypes.indexOf(Constants.CODE_ACTIVITY_PURPOSE_ORDERPLACED) > 0) {
				this.state.bOrderPlaced = true;
				this.state.bCallEnable = false;
				this.state.bSMSEnable = false;
				this.state.bWechatEnable = false;
			}
			if (sTypes.indexOf(Constants.CODE_ACTIVITY_PURPOSE_KNOCKDOWN) > 0) {
				this.state.bKnockdown = true;
				this.state.bCallEnable = false;
				this.state.bSMSEnable = false;
				this.state.bWechatEnable = false;
			}
		}
	}
	public componentWillReceiveProps(nextProps: Props) {
		let newList = nextProps.leadList;
		let bVisible = false;
		if (newList.refresh) {
			this.setState({
				refresh: newList.refresh
			});
		} else {
			this.checkFunctionButtonGroupEnable(nextProps);
			if (this.props.defaultShow && this.props.defaultShow != ContactType.none) {
				bVisible = true;
			}
			this.setState({
				refresh: newList.refresh,
				dataList: newList.data,
				visible: bVisible,
				sType: this.props.defaultShow
			});
			this.showDialog.show();
		}
	}
	public render() {
		return (<ScrollView style={styles.tabView}>
			<Timeline style={styles.list}
				data={(this.state && this.state.dataList && this.state.dataList.length > 0) ? this.state.dataList : []}
				ref={timeLine => {
					this.timeLine = timeLine;
				}}
				roleName="consultant"
				onPressCall={this._pressCall.bind(this)}
				onPressLocal={this._pressLocal.bind(this)}
				onPressSMS={this._pressSMS.bind(this)}
				onPressWeChat={this._pressWeChat.bind(this)}
				bCallEnable={this.state.bCallEnable}
				bSMSEnable={this.state.bSMSEnable}
				bLocalEnable={this.state.bLocalEnable}
				bWechatEnable={this.state.bWechatEnable}
				bKnockdown={this.state.bKnockdown}
				bOrderPlaced={this.state.bOrderPlaced} />
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
						/>
					</ScrollView>
					<View style={styles.buttonVeiwPositon} >
						<Button title="取消" onPress={this.onPressCancel.bind(this)} />
						<Button title="确定" onPress={this.onPressSaveFollow.bind(this)} />
					</View>
				</View>
			</ShowDialog>
		</ScrollView>);
	}
	private _pressCall() {
		this.setState({
			visible: true,
			sType: ContactType.call
		});
	}
	private _pressLocal() {
		this.setState({
			visible: true,
			sType: ContactType.shop
		});
	}
	private _pressSMS() {
		this.setState({
			visible: true,
			sType: ContactType.message
		});
	}
	private _pressWeChat() {
		this.setState({
			visible: true,
			sType: ContactType.wechat
		});
	}

	private onPressCancel() {
		this.showDialog.close();
	}
	private onPressSaveFollow() {
		var that = this;
		var data = this.tabSelectTable.state.data;
		let oSaveData = new Object();
		let formData = new FormData();
		for (var key in data) {
			if (data.hasOwnProperty(key) && (data[key] != "")) {
				if (key === "AppointmentDate" || key === "ArrivalTime" || key === "NextActivityTime" || key === "ActivityTime") {
					oSaveData[key] = "/Date(" + new Date(data[key]).getTime() + ")/";
					formData.append(key, "/Date(" + new Date(data[key]).getTime() + ")/");
				} else {
					oSaveData[key] = data[key];
					formData.append(key, data[key]);
				}
			}
		}
		oSaveData["Purpose"] = this.tabSelectTable.state.aSelectGroups.toString();
		oSaveData["SubjectName"] = this.tabSelectTable.state.aSelectGroups.toString();
		oSaveData["CustomerInternalID"] = "1000000156";
		//data.CustomerInternalID = this.props.lead.CustomerID;
		oSaveData["LeadIDcontent"] = this.props.lead.ID;
		formData.append("Purpose", this.tabSelectTable.state.aSelectGroups.toString());
		formData.append("SubjectName", this.tabSelectTable.state.aSelectGroups.toString());
		formData.append("CustomerInternalID", "1000000156");
		formData.append("LeadIDcontent", this.props.lead.ID);
		this.props.createLeadActivity(oSaveData, that.props.navigator);
		console.log("save");
	}
}
function mapStateToProps(state: any) {
	return {
		leadList: state.leadActivity.leadActivityList
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createLeadActivity(oData, navigator: any) {
			dispatch(createLeadActivity(oData, navigator));
		},
		fetchLeadActivityListsByLeadID: (iID: number, navigator: any, refresh: boolean) => {
			dispatch(fetchLeadActivityListsByLeadID(iID, navigator, refresh));
		}, dispatch
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(FollowInfo);
