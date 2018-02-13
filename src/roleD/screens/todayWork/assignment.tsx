import * as React from "react";
import { Component } from "react";
import { View, Text, AlertIOS, ScrollView, ListView, StyleSheet, TouchableOpacity, Image, FlatList, RefreshControl, Alert } from "react-native";
import styles from "../../styles/ManagerTabsScreenStyle";
import IConsultant from "../../../app/interfaces/consutant";
import IPager from "../../../app/interfaces/pager";
import * as Constants from "../../../lib/Constants";

import { connect, Dispatch } from "react-redux";

import { fetchRoleDConsultantList } from "../../reducers/consultants/actions";
import CheckConsultantCell from "../../components/checkConsultantCell";

interface Props {
	navigator: any;
	consultants: {
		data: IPager<IConsultant>
		refresh: boolean
	};
	dispatch: Dispatch<any>;
	fetchRoleDConsultantList (navigator: any, page: number, refresh: boolean): void;
}

interface State {
	//isChecked:boolean
	dataList: any;
	trigerRerender: string;
	refresh: boolean;
}

var sID = undefined;

class Assignment extends Component<any, any> {
	public static navigatorButtons = {
		rightButtons: [
			{
				id: "confirm-button",
				title: "确认",
				buttonColor: "black"
			}
		]
	};

	public state: State = {
		refresh: false,
		dataList: [],
		trigerRerender: undefined,
	};

	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}
	public componentWillMount() {
		this.props.fetchRoleDConsultantList(this.props.navigator, 1, true);
	}
	// public componentWillReceiveProps(newProps: Props): void {
	// 	let consultant = newProps.consultants;
	// 	// console.log(newProps)
	// 	let refreshedDataList = [];
	// 	if (consultant.refresh) {
	// 		this.setState({
	// 			refresh: consultant.refresh
	// 		});
	// 	} else if (consultant.data) {
	// 		if (consultant.data.currentPage != 1) {
	// 			refreshedDataList = consultant.data.list;
	// 		} else {
	// 			refreshedDataList = this.state.dataList.concat(consultant.data.list);
	// 		}
	// 		this.setState({
	// 			dataList: refreshedDataList,
	// 			refresh: consultant.refresh
	// 		});
	// 	}
	// }
	public render() {
		//const { dataList, refresh } = this.state;
		let dataList = this.props.consultants.data ? this.props.consultants.data.list : [];
		let refresh = this.props.consultants ? this.props.consultants.refresh : false;
		console.log(this.props.consultants);
		// alert(JSON.stringify(this.props))
		return (
			<View style = {{borderTopColor: "#ddd", borderTopWidth: 0.5}}>
				<FlatList
					keyExtractor={this._keyExtractor}
					data={dataList}
					extraData={this.state.trigerRerender}
					refreshing={refresh}
					onRefresh={() => this.onRefresh()}
					renderItem={({ item }) => <CheckConsultantCell consultant={item} selectedID={sID} onClick={(id) => this.onClickSelect(id)} />}
				/>
			</View>
		);
	}
	private onRefresh(): void {
		this.props.fetchRoleDConsultantList(this.props.navigator, 1, true);
	}
	private onNavigatorEvent(event) {
		if (event.type == "NavBarButtonPress") {
			if (event.id == "confirm-button") {
				console.log("【空缺】需与后台完成分配操作");
				//AlertIOS.alert("指派成功！");
				Alert.alert("指派成功");
				setTimeout(() => {
					this.props.navigator.popToRoot({
						animated: true,
						animationType: "slide-horizontal",
					});
				}, 1000);
			}
		}
	}

	private onClickSelect(id: any) {
		sID = id;
		this.setState({
			trigerRerender: id
		});
		console.log("【空缺】需要对选择id进行处理, 被选中的consultant id 是" + id);
	}

	private _keyExtractor = (item, index) => index;
}

function mapStateToProps(state: any) {
	console.log(state.consultants);
	return {
		consultants: state.roled_consultants.consultants
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoleDConsultantList: (navigator: any, page: number, refresh: boolean) => {
			dispatch(fetchRoleDConsultantList(navigator, page, refresh));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignment);
