import * as React from "react";
import { Component } from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Text
} from "react-native";

import { connect, Dispatch } from "react-redux";
import SegmentedControlTab from "react-native-segmented-control-tab";

import styles from "../../styles/waitApprovalTabsStyle";
import ILead from "../../../app/interfaces/lead";
import IPager from "../../../app/interfaces/pager";
import ApprovalItem from "../../../app/components/ApprovalItem";
import { fetchRoleBApproveLeadList } from "../../reducers/waitApproveLead/actions";

//import { fetchCheckitemList } from "../../reducers/waitAprovalLead/actions";

interface Props {
    navigator: any;
    leadList: {
		data: IPager<ILead>
		refresh: boolean
	};
    dispatch: Dispatch<any>;
    fetchRoleBApproveLeadList(page: number, navigator: any, refresh: boolean): void;
}

interface State {
    selectedIndex: number;
}

class WaitApproval extends Component< Props, State> {
    public state: State = {
        selectedIndex: 0
    };
    public componentDidMount() {
        this.props.fetchRoleBApproveLeadList(1, this.props.navigator, true);
    }
    public render() {
        let data = this.props.leadList.data ? this.props.leadList.data.list : [];
        let refresh = this.props.leadList ? this.props.leadList.refresh : false;
        let listArr = this.filterLeadInfo(data);
        return (
            <View style={{ flex: 1 , backgroundColor: "#F9F8F8"}}>
                <SegmentedControlTab
                    values={["待审批", "已审批"]}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    borderRadius={4}
                    tabsContainerStyle={styles.tabContainer}
                    tabStyle={styles.tab}
                    activeTabStyle={{ backgroundColor: "#000" }}
                    tabTextStyle={styles.tabTextStyle}
                    activeTabTextStyle={styles.activeTabTextStyle} />
                {this.state.selectedIndex === 0 &&
                    <View>
                        <View style={{height: 10}} />
                        <FlatList
                            keyExtractor={(item, index) => index}
                            data={listArr[0]}
                            renderItem={({item}) => this.renderItem(item)}
                            refreshing={refresh}
                            onRefresh={() => this.onRefresh()}
                        >
                        </FlatList>
                    </View>
                }
                {this.state.selectedIndex === 1 &&
                    <View>
                        <View style={{height: 10}} />
                            <FlatList
                                keyExtractor={(item, index) => index}
                                data={listArr[1]}
                                renderItem={({item}) => this.renderItem(item)}
                                refreshing={refresh}
                                onRefresh={() => this.onRefresh()}>
                            </FlatList>
                    </View>
                }
            </View>
        );
    }

    private renderItem(item) {
        return(
            <ApprovalItem lead={item} navigator={this.props.navigator}/>
        );
    }

    private filterLeadInfo(list): Array<Array<ILead>> {
        let listArr = [], arr1 = [], arr2 = [];
        list.map((item) => {
            if (item.ApprovalStatus === "待审批") {
                arr1.push(item);
            } else if (item.ApprovalStatus === "已审批") {
                arr2.push(item);
            }
        });
        listArr.push(arr1, arr2);
        return listArr;
    }
    private handleIndexChange = (index) => {
        console.log(index);
        this.setState({
            selectedIndex: index,
        });
    }
    private onRefresh(): void {
        //this.props.fetchCheckitemList(true);
        this.props.fetchRoleBApproveLeadList(1, this.props.navigator, true);
    }
}
function mapStateToProps(state: any) {
	return {
		leadList: state.roleb_approve_lead.leadList,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoleBApproveLeadList: (page: number, navigator: any, refresh: boolean) => {
			dispatch(fetchRoleBApproveLeadList(page, navigator, refresh));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitApproval);
