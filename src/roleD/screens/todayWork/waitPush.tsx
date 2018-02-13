import * as React from "react";
import { Component } from "react";
import {
    StyleSheet,
    View,
    FlatList
} from "react-native";

import ScrollableTabView , { DefaultTabBar } from "react-native-scrollable-tab-view";
import { connect, Dispatch } from "react-redux";
import { fetchRoleDPushLeadList } from "../../reducers/waitPushLead/actions";

import ILead from "../../../app/interfaces/lead";
import IPager from "../../../app/interfaces/pager";
import LeadItem from "../../../app/components/leadItem";

interface Props {
	leadList: {
		data: IPager<ILead>
		refresh: boolean
	};
	navigator: any;
	dispatch: Dispatch<any>;
	fetchRoleDPushLeadList(navigator: any, page: number, refresh: boolean): void;
}

interface State {
	refresh: boolean;
	dataList: Array<ILead>;
}

class WaitPush extends Component<Props, State> {

	public state: State = {
		refresh: this.props.leadList.refresh,
		dataList: this.props.leadList.data ? this.props.leadList.data.list : []
    };

	public componentDidMount() {
		this.props.fetchRoleDPushLeadList(this.props.navigator, 1, true);
	}

    public render(): JSX.Element {
		let refresh = this.props.leadList ? this.props.leadList.refresh : false;
		let data = this.props.leadList.data ? this.props.leadList.data.list : [];
    	return(
    		<View style = { {flex: 1} }>
    			<ScrollableTabView
                    renderTabBar = {() => <DefaultTabBar />}
                    tabBarBackgroundColor = "#ffffff"
                    tabBarActiveTextColor = "#252525"
                    tabBarInactiveTextColor = "#454545"
                    locked = {false}
                    tabBarUnderlineStyle = { { backgroundColor: "#da3456", height: 2} }>
                    <FlatList tabLabel = "到店超期"
                        keyExtractor = {(item, index) => index}
						data={data}
						refreshing={refresh}
            			onRefresh={() => this.onRefresh()}
                        renderItem={({item}) => <LeadItem lead={item} navigator={this.props.navigator} roleName = "manager2"/>}
                    />
                    <FlatList tabLabel = "试驾超期"
                        keyExtractor = {(item, index) => index}
						data={data}
						refreshing={refresh}
            			onRefresh={() => this.onRefresh()}
                        renderItem={({item}) => <LeadItem lead={item} navigator={this.props.navigator} roleName = "manager2"/>}
                    />
                    <FlatList tabLabel = "跟进超期"
                        keyExtractor = {(item, index) => index}
						data={data}
						refreshing={refresh}
            			onRefresh={() => this.onRefresh()}
                        renderItem={({item}) => <LeadItem lead={item} navigator={this.props.navigator} roleName = "manager2"/>}
                    />
                </ScrollableTabView>
    		</View>
		);
	}

	private onRefresh(): void {
		this.props.fetchRoleDPushLeadList(this.props.navigator, 1, true);
	}
}

function mapStateToProps(state: any) {
	return {
		leadList: state.roled_push_lead.leadList,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoleDPushLeadList: (navigator: any, page: number, refresh: boolean) => {
			dispatch(fetchRoleDPushLeadList(navigator, page, refresh));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitPush);
