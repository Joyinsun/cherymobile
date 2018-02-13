import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { View, Text, AlertIOS, Image, ScrollView } from "react-native";
import styles from "../styles/ManagerTabsScreenStyle";
import IconButton from "../../app/components/IconButton";
import * as Constants from "../../lib/Constants";
import { fetchRoleBHomeList } from "../reducers/home/actions";

interface Props {
	navigator: any;
	data: any;
	refresh: boolean;
	fetchRoleBHomeList(navigator: any, refresh: boolean) : void;
}
interface State {}

const iconWidth = (Constants.SCREEN_WIDTH - 3) / 3;
const iconHeight = (iconWidth * 4 ) / 5;

class ManagerHomeScreen extends Component<Props, State> {
	public componentDidMount() {
		this.props.fetchRoleBHomeList(this.props.navigator, true);
	}

	public render(): JSX.Element {
		return(
		  <ScrollView>
			<View>
			  <Image source= {require("../../../img/report_placeholder.png")} style= {styles.backgroundImage} />
			</View>
			{this.renderTodayWork()}
		  </ScrollView>
		);
	  }
 	//manager.WaitApprovalScreen
	private pushWaitApprovalScreen() {
		this.props.navigator.push({
			title: "战败审批",
			screen: "manager.WaitApprovalScreen",
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
			screen: "manager.WaitPushScreen",
			animated: true,
			animationType: "slide-horizontal",
			navigatorStyle: {
				tabBarHidden: true
			}
		});
	}

	private renderTodayWork() {
		let results = this.props.data ? this.props.data : {"push": [], "approve": []};
		return (
			<View style= {styles.form}>
				<View style={styles.formTitle}>
					<Text style= {styles.formTitleText}>今日任务</Text>
				</View>
				<View style={{flexWrap: "wrap", flexDirection: "row"}}>
					<IconButton badgeCount= {results["approve"].length} label=  "待审批" iconSrc =  "toBeApprovel" onClick= { this.pushWaitApprovalScreen.bind(this) } />
					<View style={{height: iconHeight , width: 0.5, backgroundColor: Constants.COLOR.DIVIDER}} />
					<IconButton badgeCount= {results["push"].length} label = "待督促" iconSrc =  "toBeUrge" onClick= {this.pushWaitPushScreen.bind(this) } />
					<View style={{height: iconHeight , width: 0.5, backgroundColor: Constants.COLOR.DIVIDER}} />
					<View style={{height: 0.5 , width: Constants.SCREEN_WIDTH, backgroundColor: Constants.COLOR.DIVIDER}} />
				</View>
			</View>
		);
	}
}

function mapStateToProps(state: any) {
	return {
		data: state.roleb_home.data,
		refresh: state.roleb_home.refresh
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoleBHomeList: (navigator: any, refresh: boolean) => {
			dispatch(fetchRoleBHomeList(navigator, refresh));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerHomeScreen);
