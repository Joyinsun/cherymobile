import * as React from "react";
import { Component } from "react";
import { View, Text, AlertIOS, ScrollView, ListView, StyleSheet, TouchableOpacity, Image, FlatList, RefreshControl, Alert } from "react-native";
import styles from "../styles/ManagerTabsScreenStyle";
import IConsultant from "../../app/interfaces/consutant";
import IPager from "../../app/interfaces/pager";
import * as Constants from "../../lib/Constants";

import { connect, Dispatch } from "react-redux";

import { fetchRoleBConsultantList } from "../reducers/consultants/actions";
import CheckConsultantCell from "../components/checkConsultantCell";

interface Props {
	navigator: any;
	data: IPager<IConsultant>;
	refresh: boolean;
	error: any;
	dispatch: Dispatch<any>;
	fetchRoleBConsultantList(page: number, navigator: any, refresh: boolean): void;
}

interface State {
	trigerRerender: string;
}

var sID = undefined;

class ConsultantScreen extends Component<any, any> {
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
		trigerRerender: undefined
	};

	constructor(props: Props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}
	public componentDidMount() {
		this.props.fetchRoleBConsultantList(1, this.props.navigator, true);
	}

	public render(): JSX.Element {
		const { data, refresh } = this.props;
		return (
			<FlatList
				keyExtractor={this._keyExtractor}
				data={data ? data.list : []}
				extraData={this.state.trigerRerender}
				renderItem={({ item }) => <CheckConsultantCell consultant={item} selectedID={sID} onClick={(id) => this.onClickSelect(id)} />}
			/>
		);
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
	return {
		data: state.roleb_consultants.data
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoleBConsultantList: (page: number, navigator: any, refresh: boolean) => {
			dispatch(fetchRoleBConsultantList(page, navigator, refresh));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantScreen);
