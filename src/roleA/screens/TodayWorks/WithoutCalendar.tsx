import * as React from "react";
import { Component } from "react";
import {
	View,
	FlatList
} from "react-native";

import ILead from "../../../app/interfaces/lead";
import IPager from "../../../app/interfaces/pager";
import LeadItem from "../../../app/components/leadItem";
import { connect, Dispatch } from "react-redux";
import { fetchNewAssignList } from "../../reducers/home/actions";
import HomeLeadType from "../../interfaces/HomeLeadType";
import NoMoreView from "../../../app/components/noMoreView";

interface Props {
	type: HomeLeadType;
	list: IPager<ILead>;
	refresh: boolean;
	currentPage: number;
	noMore: boolean;
	navigator: any;
	dispatch: Dispatch<any>;
	fetchNewAssignList(type: HomeLeadType, navigator: any, page: number, refresh: boolean): void;
}

interface State {
}

class WithoutCalendar extends Component<Props, State> {
	constructor(props) {
		super(props);
	}
	public componentDidMount(): void {
		this.props.fetchNewAssignList(this.props.type, this.props.navigator, 1, true);
	}

	public render(): JSX.Element {
		return (
			<View>
				<FlatList
					keyExtractor={(item, index) => index}
					data={this.props.list ? this.props.list : []}
					renderItem={({ item }) => <LeadItem lead={item} navigator={this.props.navigator} roleName="consultant" />}
					onEndReached={this.onLoadMore.bind(this)}
					ListFooterComponent={this._renderNoMore}
					onEndReachedThreshold={0.1}
					refreshing={this.props.refresh}
					onRefresh={() => this.onRefresh()}/>
			</View>
		);
	}
	private _renderNoMore = (): JSX.Element => {
		return (<NoMoreView refresh={this.props.refresh} noMore={this.props.noMore}></NoMoreView>);
	}

	private onRefresh(): void {
		this.props.fetchNewAssignList(this.props.type, this.props.navigator, 1, true);
	}

	private onLoadMore(): void {
		if (!this.props.noMore) {
			let { currentPage } = this.props;
			this.props.fetchNewAssignList(this.props.type, this.props.navigator, currentPage + 1, true);
		}
	}
}

function mapStateToProps(state: any) {
	return {
		list: state.rolea_home.detail.list,
		refresh: state.rolea_home.detail.refresh,
		currentPage: state.rolea_home.detail.currentPage,
		noMore: state.rolea_home.detail.noMore
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchNewAssignList: (type: HomeLeadType, navigator: any, page: number, refresh: boolean) => {
			dispatch(fetchNewAssignList(type, navigator, page, refresh));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WithoutCalendar);
