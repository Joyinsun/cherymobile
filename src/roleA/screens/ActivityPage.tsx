import * as React from "react";
import { Component } from "react";
import * as Constants from "../../lib/Constants";

import { View, Text, RefreshControl, StyleSheet, Dimensions, TouchableOpacity, FlatList, Alert } from "react-native";

import { connect, Dispatch } from "react-redux";
import { fetchActivityList } from "../reducers/activity/actions";

import IActivity from "../interfaces/activityItem";
import IPager from "../../app/interfaces/pager";
import ActivityItem from "../components/activityItem";
// import styles from "../styles/LeadPageStyle";

interface Props {
    activityList: IPager<IActivity>;
    currentPage: number;
    refresh: boolean;
    noMore: boolean;
    error: any;
    navigator: any;
    dispatch: Dispatch<any>;
    fetchActivityList(page: number, navigator: any, refresh: boolean): void;
}

interface State {}

class ActivityPage extends Component<Props, State> {

    public componentDidMount() {
        this.props.fetchActivityList(1, this.props.navigator, true);
    }

    public render(): JSX.Element {
        const { activityList, refresh } = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    refreshControl={<RefreshControl
                        refreshing={refresh}
                        onRefresh={this._onRefresh}
                        tintColor="#000"
                        colors={["#eee"]}
                        progressBackgroundColor="#fff"
                    />}
                    data={activityList}
                    onEndReached={this._onLoadMore}
                    onEndReachedThreshold={0.1}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ListFooterComponent={this._renderNoMore}
                />
            </View>
        );
    }

    private _keyExtractor = (item, index) => item.campaignNumber;
    // private _keyExtractor = (item, index) => index; //mock data

    private _renderItem = ({ item }) => {
        return (
            <ActivityItem
                activity={item} navigator={this.props.navigator} />
        );
    }

    private _onRefresh = () => {
        this.props.fetchActivityList(1, this.props.navigator, true);
    }

    private _onLoadMore = () => {
        const { currentPage } = this.props;
		this.props.fetchActivityList(currentPage + 1, this.props.navigator, true);
    }

    private _renderNoMore = (): JSX.Element => {
        let tips: string = "";

        if (!this.props.noMore) {
            tips = "正在加载中...";
        } else {
            tips = "已经木有更多了~";
        }
        return (
            <View style={styles.tips_box}>
                <View style={styles.line}></View>
                <Text style={styles.tips_text}>{tips}</Text>
                <View style={styles.line}></View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.COLOR.BG_GREY
    },
    tips_box: {
        marginVertical: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    line: {
        width: 50,
        height: 1,
        backgroundColor: "#d9d9d9"
    },
    tips_text: {
        fontSize: 10,
        color: "#999",
        marginHorizontal: 5
    }
});

function mapStateToProps(state: any) {
    return {
        activityList: state.rolea_activity.activityList,
        refresh: state.rolea_activity.refresh,
        currentPage: state.rolea_activity.currentPage,
        error: state.rolea_activity.error,
        noMore: state.rolea_activity.noMore
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchActivityList: (page: number, navigator: any, refresh: boolean) => {
            dispatch(fetchActivityList(page, navigator, refresh));
        }, dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPage);
