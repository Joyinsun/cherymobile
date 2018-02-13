import * as React from "react";
import { Component } from "react";
import * as Constants from "../../lib/Constants";

import { View, FlatList, Text } from "react-native";

import { connect, Dispatch } from "react-redux";
import { fetchRoleDLeadList, resetFilter, fetchFilterData } from "../reducers/lead/actions";

import ILead from "../../app/interfaces/lead";
import IPager from "../../app/interfaces/pager";
import LeadItem from "../../app/components/leadItem";
import SearchBar from "../../app/components/searchBar";
import FilterMenu from "../../app/components/filterMenu";
import styles from "../styles/LeadPageStyle";

import { userdetail } from "../../lib/global";
import _ from "lodash";
import Utils from "../../lib/util";
interface Props {
	leadList: IPager<ILead>;
	refresh: boolean;
	currentPage: number;
	noMore: boolean;
	message: string;
	filterData: Array<Array<string>>;
	selectIndex: Array<number>;
	navigator: any;
	dispatch: Dispatch<any>;
	fetchRoleDLeadList(navigator: any, page: number, refresh: boolean, params?: any): void;
	fetchFilterData(navigator: any): void;
	resetFilter(filterData: Array<Array<string>>): void;
}

interface State {
	filterParams: any[];
}

class LeadPage extends Component<Props, State> {
	public flatList: any;

	public state: State = {
		filterParams: []
	};

	public componentDidMount() {
		this.props.fetchFilterData(this.props.navigator);
		this.props.fetchRoleDLeadList(this.props.navigator, 1, true);
	}

	public render(): JSX.Element {
		const { leadList, refresh, filterData } = this.props;
		const fd = [["状态"], ["顾问"], ["车型"]];
		return (
			<View style={{ flex: 1, flexDirection: "row", backgroundColor: Constants.COLOR.BG_GREY }} >
				<FilterMenu
					arrowImg={""}
					checkImage={""}
					bgColor={"white"}
					tintColor={Constants.COLOR.TINT_RED}
					selectItemColor={Constants.COLOR.TINT_RED}
					data={filterData.length === 0 ? fd : filterData}
					maxHeight={410}
					onPressReset={this.reset}
					handler={(selectIndex) => { this.onHandleFilterAction(selectIndex); }}
					resetButtonName={"清空"}>
					<FlatList
						ref={(flatList) => { this.flatList = flatList; }}
						keyExtractor={(item, index) => index}
						data={leadList ? leadList : []}
						ListHeaderComponent={() => <SearchBar onClick={this.onSearch.bind(this)} />}
						ListFooterComponent={this._renderFooterComponent}
						renderItem={this.renderItem}
						onEndReached={this.onLoadMore.bind(this)}
						onEndReachedThreshold={0.1}
						refreshing={refresh}
						onRefresh={() => this.onRefresh()}>
					</FlatList>
				</FilterMenu>
			</View>);
	}

	private _renderFooterComponent = (): JSX.Element => {
		let { refresh, noMore } = this.props;
		let tips: string = noMore && !refresh ? "已经木有更多了~" : "正在加载中...";

		return (
		  <View style={styles.tips_box}>
			<View style={styles.line}></View>
			<Text style={styles.tips_text}>{tips}</Text>
			<View style={styles.line}></View>
		  </View>
		);
	}

	private onRefresh(): void {
		this.props.fetchRoleDLeadList(this.props.navigator, 1, true, this.state.filterParams);
	}

	private onLoadMore(): void {
		const { currentPage } = this.props;
		this.props.fetchRoleDLeadList(this.props.navigator, currentPage + 1, true, this.state.filterParams);
	}

	private reset = () => {
		const filterData = this.props.filterData;
		this.setState({
			filterParams: []
		});
		this.props.resetFilter(filterData);
		this.props.fetchRoleDLeadList(this.props.navigator, 1, true);
	}

	private onHandleFilterAction(selectIndex: Array<number>): void {
		let { filterData } = this.props;
		var that = this;
		//alert(JSON.stringify(selectIndex));
		let params = [];

		_.forEach(selectIndex, function (n, key) {
			if (n > 0) {
				//alert(filterData[key][n]);
				if (key === 0)
					params.push("UserStatusCode eq '" + Utils.getUserStatusCode(filterData[key][n]) + "'");
				else if (key === 1)
					params.push("Sales eq '" + filterData[key][n] + "'");
				else if (key === 2)
					params.push("IntentionCarNameLevel2 eq '" + filterData[key][n] + "'");
			}
		});

		//params.filter.push("LeadLevel eq '1'");
		this.props.fetchRoleDLeadList(this.props.navigator, 1, true, params);
		this.setState({
			filterParams: params
		});
		//this.props.fetchFilterData();
	}

	private onSearch(oEvent): void {
		oEvent.preventDefault();
		this.props.navigator.push({
			title: "",
			screen: "consultant.SearchScreen",
			navigatorStyle: { navBarHidden: true },
			animationType: "slide-up",
			passProps: {
				navigator: this.props.navigator,
				searchFor: {
					type: "Lead",
					api: "./leadlist",
					placeholder: "搜索手机号、客户姓名"
				}
			}
		});
	}

	private renderItem = ({ item }) => {
		return (<LeadItem lead={item} navigator={this.props.navigator} roleName="manager2" />);
	}
}

function mapStateToProps(state: any) {
	return {
		leadList: state.roled_lead.leadList,
		selectIndex: state.roled_lead.selectIndex,
		filterData: state.roled_lead.filterData,
		refresh: state.roled_lead.refresh,
		currentPage: state.roled_lead.currentPage,
		noMore: state.roled_lead.noMore,
		message: state.roled_lead.message
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoleDLeadList: (navigator: any, page: number, refresh: boolean, params?: any) => {
			dispatch(fetchRoleDLeadList(navigator, page, refresh, params));
		},
		resetFilter: (filterData: Array<Array<string>>) => {
			dispatch(resetFilter(filterData));
		},
		fetchFilterData: (navigator: any) => {
			dispatch(fetchFilterData(navigator));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadPage);
