import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { View, Text, AlertIOS, Image } from "react-native";
// import { fetchRoleDLeadList, fetchFilterData } from "../reducers/lead/actions";

import styles from "../styles/ManagerTabsScreenStyle";
import IconButton from "../../app/components/IconButton";
import * as Constants from "../../lib/Constants";
import { fetchRoleDHomeList } from "../reducers/home/actions";

interface Props {
	navigator: any;
	data: any;
	refresh: boolean;
	// fetchRoleDLeadList(page: number, refresh: boolean): void;
	//fetchFilterData(): void;
	fetchRoleDHomeList(navigator: any, refresh: boolean) : void;
}
interface State {

}
const iconWidth = (Constants.SCREEN_WIDTH - 3) / 3;
const iconHeight = (iconWidth * 4 ) / 5;

class ManagerHomeScreen extends Component<Props, State> {
	public componentDidMount() {
		// this.props.fetchRoleDLeadList(1, true);
		// this.props.fetchFilterData();
		this.props.fetchRoleDHomeList(this.props.navigator, true);
	}
	public render(): JSX.Element {
		return (
			<View>
				<View>
					<Image source={require("../../../img/report_placeholder.png")} style={styles.backgroundImage} />
				</View>
				{this.renderTodayWork()}
			</View>
		);
	}

	private pushWaitAssignmentScreen() {
		this.props.navigator.push({
			title: "待分配",
			screen: "manager2.WaitAssignmentScreen",
			animated: true,
			animationType: "slide-horizontal",
			navigatorStyle: {
				tabBarHidden: true
			}
		});
	}
	 //manager2.WaitApprovalScreen
	private pushWaitApprovalScreen() {
		this.props.navigator.push({
			title: "战败审批",
			screen: "manager2.WaitApprovalScreen",
			animated: true,
			animationType: "slide-horizontal",
			navigatorStyle: {
				tabBarHidden: true
			}
		});
	}

	private pushWaitPushScreen() {
		this.props.navigator.push({
			title: "待督促",
			screen: "manager2.WaitPushScreen",
			animated: true,
			animationType: "slide-horizontal",
			navigatorStyle: {
				tabBarHidden: true
			}
		});
	}
	private renderTodayWork() {
		let results = this.props.data ? this.props.data : {"assign": [], "push": [], "approve": []};
		return (
			<View style= {styles.form}>
				<View style={styles.formTitle}>
					<Text style= {styles.formTitleText}>今日任务</Text>
				</View>
				<IconButton badgeCount={results["assign"].length} label= "待分配"iconSrc="toBeAssign" onClick={this.pushWaitAssignmentScreen.bind(this)} />
				<View style={{height: iconHeight , width: 0.5, backgroundColor: Constants.COLOR.DIVIDER}} />
				<IconButton badgeCount={results["approve"].length} label= "待审批" iconSrc="toBeApprovel" onClick={this.pushWaitApprovalScreen.bind(this)} />
				<View style={{height: iconHeight , width: 0.5, backgroundColor: Constants.COLOR.DIVIDER}} />
				<IconButton badgeCount={results["push"].length} label= "待督促" iconSrc="toBeUrge" onClick={this.pushWaitPushScreen.bind(this)} />
				<View style={{height: 0.5 , width: Constants.SCREEN_WIDTH, backgroundColor: Constants.COLOR.DIVIDER}} />
			</View>
		);
	}
}

function mapStateToProps(state: any) {
	return {
		data: state.roled_home.data,
		refresh: state.roled_home.refresh
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoleDHomeList: (navigator: any, refresh: boolean) => {
			dispatch(fetchRoleDHomeList(navigator, refresh));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)( ManagerHomeScreen );
