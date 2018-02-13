"use strict";

import * as React from "react";
import { Component } from "react";
import { Text, StyleSheet, View, Button, ScrollView, FlatList, ActivityIndicator } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { connect, Dispatch } from "react-redux";
import { fetchCheckitemList } from "../../reducers/check/actions";
import CheckItem from "../../../app/components/aboutMe/CheckItem";
import HigherTabStyles from "../../styles/HigherTabStyles";
import globalStyles from "../../../app/styles/GlobalStyle";
import * as Constants from "../../../lib/Constants";

interface Props {
    navigator: any;
    data: any;
    refresh: boolean;
    dispatch: Dispatch<any>;
    fetchCheckitemList(navigator: any, refresh: boolean): void;
}

interface State {
    selectedIndex: number;
}

class HigherApproTab extends Component<Props, State> {
    public state: State = {
        selectedIndex: 0
    };
    public componentDidMount(): void {
        this.props.fetchCheckitemList(navigator, true);
    }

    public render(): JSX.Element {
        let list = this.props.data ? this.props.data : [];
        let listArr = this.filterCheckInfo(list);
        return (<View style={HigherTabStyles.container}>
            <SegmentedControlTab
                values={["待审批", "已通过", "未通过"]}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
                borderRadius={4}
                tabsContainerStyle={HigherTabStyles.tabContainer}
                tabStyle={HigherTabStyles.tab}
                activeTabStyle={{ backgroundColor: "#000" }}
                tabTextStyle={HigherTabStyles.tabTextStyle}
                activeTabTextStyle={HigherTabStyles.activeTabTextStyle} />
            {this.state.selectedIndex === 0 &&
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={listArr[0]}
                    renderItem={(item) => this.renderItem(item)}
                    refreshing={false}
                    onRefresh={() => this.onRefresh()}
                >
                </FlatList>}
            {this.state.selectedIndex === 1 &&
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={listArr[1]}
                    renderItem={(item) => this.renderItem(item)}
                    refreshing={false}
                    onRefresh={() => this.onRefresh()}
                >
                </FlatList>}
            {this.state.selectedIndex === 2 &&
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={listArr[2]}
                    renderItem={(item) => this.renderItem(item)}
                    refreshing={false}
                    onRefresh={() => this.onRefresh()}
                >
                </FlatList>}
            {this.props.refresh ?
                (<View visible={this.props.refresh} style={ globalStyles.horizontal }>
                    <ActivityIndicator
                        animating={this.props.refresh}
                        style={{
                            height: 80
                        }}
                        size="large"
                    />
                </View>) : null
            }
        </View>);
    }
    private renderItem = ({ item }) => {
        return (<CheckItem check={item} navigator={this.props.navigator} />);
    }
    private filterCheckInfo(list): Array<Array<object>> {
        let listArr = [], arr1 = [], arr2 = [], arr3 = [];
        if (list) {
            list.map((item) => {
                switch (item.ApprovalStatus) {
                    case "1":
                        arr1.push(item);
                        break;
                    case "3":
                        arr2.push(item);
                        break;
                    case "4":
                        arr3.push(item);
                        break;
                }
            });
            listArr.push(arr1, arr2, arr3);
        }
        return listArr;
    }
    private handleIndexChange = (index) => {
        console.log(index);
        this.setState({
            selectedIndex: index,
        });
    }
    private onRefresh(): void {
        this.props.fetchCheckitemList(this.props.navigator, true);
    }
}

function mapStateToProps(state: any): any {
    return {
        refresh: state.rolea_check.refresh,
        data: state.rolea_check.data
    };
}
function mapDispatchToProps(dispatch): any {
    return {
        fetchCheckitemList: (navigator: any, refresh: boolean) => {
           dispatch(fetchCheckitemList(navigator, refresh));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HigherApproTab);
