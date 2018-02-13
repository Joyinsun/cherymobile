/**
 * 数字化营销经理（网销经理）
 */

import * as React from "react";
import { Component } from "react";
import { View, Text, AlertIOS, ScrollView, ListView, StyleSheet, TouchableOpacity, Image, FlatList, RefreshControl } from "react-native";
import styles from "../../styles/ManagerTabsScreenStyle";
import ILead from "../../../app/interfaces/lead";
import IPager from "../../../app/interfaces/pager";
import * as Constants from "../../../lib/Constants";

import { connect, Dispatch } from "react-redux";
import { fetchAssignLeadList } from "../../reducers/waitAssignmentLead/actions";

import CheckLeadCell from "../../components/checkLeadCell";
interface Props {
	navigator: any;
	data: any;
	refresh: any;
	// lead: {
	// 	data: IPager<any>,
	// 	refresh: boolean
	// };
	dispatch: Dispatch<any>;
	fetchAssignLeadList(navigator: any, refresh: boolean): void;
}

interface State {
	isChecked: boolean;
	dataList: Array<ILead>;
	refresh: boolean;
}

var items = [];
var selectionsMap = new Map();
var isClickAll = false;
class WaitAssignment extends Component<Props, State> {
	public state: State = {
		refresh: false,
		isChecked: false,
		dataList: []
	};

	public componentDidMount() {
		this.props.fetchAssignLeadList(this.props.navigator, true);
		console.log("this.prop.data------------------------------");
			console.log(this.props.data);
	}

	public componentWillReceiveProps(newProps: Props): void {

		let refreshedDataList = newProps.data ? newProps.data : [];
		 console.log("------------------componentWillReceiveProps");
		// console.log(refreshedDataList);
		if (refreshedDataList) {
			console.log("refreshedDataList[i].ID");
			for (let i = 0; i < refreshedDataList.length; i++) {
				items.push(refreshedDataList[i].ID);
				console.log("refreshedDataList[i].ID");
				console.log(refreshedDataList[i].ID);
				selectionsMap.set(refreshedDataList[i].ID, false); //如果字段更改，一定要注意匹配
			}
		}

	}

	public componentWillUnmount() {
		items = [];
		selectionsMap = new Map();
		isClickAll = false;
	}
	public render() {
		//const { dataList, refresh } = this.state;
		let dataList = this.props.data ? this.props.data : [];
		let refresh = this.props.refresh ? this.props.refresh : false;
		let i = 1;
		i++;
		console.log("--------------------this.props.data" + i);
		console.log(this.props.data);
		console.log("--------------------this.props.refresh" + i);
		console.log(this.props.refresh);
		return (
			<View style={[styles.container, {backgroundColor: Constants.COLOR.BG_GREY}]}>
				<FlatList
					keyExtractor={(item, index) => index}
					data={this.props.data || []}
					extraData={this.state}
					renderItem={this._renderItem}
					refreshing={refresh}
					onRefresh={() => this.onRefresh()}
				/>
				{this.renderFooter()}
			</View>
		);
	}
	private onRefresh(): void {
		this.props.fetchAssignLeadList(this.props.navigator, true);
	}

	private renderFooter() {
		if (this.state.isChecked) {
			return (
				<View style={myStyles.footer}>
					<TouchableOpacity
						style={{ flexDirection: "row" }}
						onPress={this.onClickAllSelect.bind(this)}
					>
						<Image source={require("../../../../img/manager/waitAssignment/icon_select@3x.png")} />
						<Text style={{ paddingLeft: 10, color: Constants.COLOR.GREY }}>全选</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.pushAssignmentScreen.bind(this)}
					>
						<Text>分配给</Text>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View style={myStyles.footer}>
					<TouchableOpacity
						style={{ flexDirection: "row" }}
						onPress={this.onClickAllSelect.bind(this)}
					>
						<Image source={require("../../../../img/manager/waitAssignment/icon_no_select@3x.png")} />
						<Text style={{ paddingLeft: 10 }}>全选</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.pushAssignmentScreen.bind(this)}
					>
						<Text>分配给</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}

	private pushAssignmentScreen() {
		var leadList = [];
		for (var [key, value] of selectionsMap) {
			if (value) {
				leadList.push(key);
			}
		}
		console.log(leadList);
		//将leadList传给下个screen
		this.props.navigator.push({
			title: "选择顾问",
			screen: "manager2.AssignmentScreen",
			animated: true,
			animationType: "slide-horizontal",
			navigatorStyle: {
				tabBarHidden: true
			}
		});

	}

	private setAll(b: boolean) {
		for (var i = 0; i < items.length; i++) {
			selectionsMap.set(items[i], b);
		}
	}

	private onClickAllSelect() {
		if (this.state.isChecked) {
			this.setAll(false);
			isClickAll = false;
		} else {
			this.setAll(true);
			isClickAll = true;
		}
		this.setState({
			isChecked: !this.state.isChecked
		});
	}

	private checkChange(check: boolean) {
		if (isClickAll) {
			if (check) {
				for (var [k, v] of selectionsMap) {
					if (v != check) {
						this.setState({
							isChecked: !check
						});
						isClickAll = false;
						break;
					}
				}
			} else {
				var countEqual = 0;
				for (var [kk, vv] of selectionsMap) {
					if (vv != check) {
						countEqual++;
					}
				}
				if (i == items.length) {
					this.setState({
						isChecked: !check
					});
					isClickAll = false;
				}
			}
		} else {
			var i = 0;
			for (var [key, value] of selectionsMap) {
				if (value != check) {
					i++;
				}
			}
			if (i == items.length) {
				this.setState({
					isChecked: !this.state.isChecked
				});
				isClickAll = true;
			}
		}

	}

	private _onSelectionsChange = (id) => {
		const selected = new Map(selectionsMap);
		selected.set(id, !selectionsMap.get(id));
		selectionsMap = selected;
		console.log("state isChecked:" + this.state.isChecked + "   001:" + selectionsMap.get("001"));
		this.checkChange(this.state.isChecked);
	}

	private _renderItem = ({ item }) => {
		return (
			<CheckLeadCell
				lead={item}
				isChecked={this.state.isChecked}
				onSelectionsChange={this._onSelectionsChange}
				selectionMap={selectionsMap}
				navigator={this.props.navigator}
			/>
		);
	}
}

const myStyles = StyleSheet.create({
	container: {
		flex: 1,
		width: Constants.SCREEN_WIDTH,
		backgroundColor: "#fff"
	},
	footer: {
		bottom: 0,
		width: Constants.SCREEN_WIDTH,
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		backgroundColor: "#fff"
	}
});

function mapStateToProps(state: any) {
	return {
		// lead: state.roled_waitAssignmentLead.lead
		data: state.roled_waitAssignmentLead.data,
		refresh: state.roled_waitAssignmentLead.refresh
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchAssignLeadList: (navigator: any, refresh: boolean) => {
			dispatch(fetchAssignLeadList(navigator, refresh));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitAssignment);
