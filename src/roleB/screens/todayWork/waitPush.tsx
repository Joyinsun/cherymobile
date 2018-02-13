import * as React from "react";
import { Component } from "react";
import {
    StyleSheet,
    View,
    FlatList
} from "react-native";

import ScrollableTabView , { DefaultTabBar } from "react-native-scrollable-tab-view";
import { connect, Dispatch } from "react-redux";
import { fetchRoleBPushLeadList } from "../../reducers/waitPushLead/actions";

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
	fetchRoleBPushLeadList(page: number, navigator: any, refresh: boolean): void;
}

interface State {

}

class WaitPush extends Component<Props, State> {

	public state: State = {

    };

	public componentDidMount() {
		this.props.fetchRoleBPushLeadList(1, this.props.navigator, true);
	}

    public render(): JSX.Element {
		let dataList = this.props.leadList.data ? this.props.leadList.data.list : [];
		console.log("this.props.leadList");
		let refresh = this.props.leadList ? this.props.leadList.refresh : false;
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
						data={dataList}
						refreshing={refresh}
                    	onRefresh={() => this.onRefresh()}
                        renderItem={({item}) => <LeadItem lead={item} navigator={this.props.navigator} roleName = "manager"/>}
                    />
                    <FlatList tabLabel = "试驾超期"
                        keyExtractor = {(item, index) => index}
						data={dataList}
						refreshing={refresh}
                    	onRefresh={() => this.onRefresh()}
                        renderItem={({item}) => <LeadItem lead={item} navigator={this.props.navigator} roleName = "manager"/>}
                    />
                    <FlatList tabLabel = "跟进超期"
                        keyExtractor = {(item, index) => index}
						data={dataList}
						refreshing={refresh}
                    	onRefresh={() => this.onRefresh()}
                        renderItem={({item}) => <LeadItem lead={item} navigator={this.props.navigator} roleName = "manager"/>}
                    />
                </ScrollableTabView>
    		</View>
		);
	}

	private onRefresh(): void {
        this.props.fetchRoleBPushLeadList(1, this.props.navigator, true);
    }
}

function mapStateToProps(state: any) {
	return {
		leadList: state.roleb_push_lead.leadList,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoleBPushLeadList: (page: number, navigator: any, refresh: boolean) => {
			dispatch(fetchRoleBPushLeadList(page, navigator, refresh));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitPush);
