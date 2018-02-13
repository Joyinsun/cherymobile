import * as React from "react";
import { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { connect, Dispatch } from "react-redux";
import { fetchCarManagementList } from "../reducers/drive/actions";
import Style from "../styles/carManagementItemComponentStyle";
import CarManagementItem from "../components/carManagementItem";
import * as GlobalVariable from "../../lib//global";

interface Props {
    navigator: any;
    cars: {
        data: any;
        refreshing: boolean;
    };
    refreshing: boolean;
    dispatch: Dispatch<any>;
    // userDetail: any;
    fetchCarManagementList(navigator: any, params: any);
}

interface State {
    dataList: any;
}
class CarManagementScreen extends Component<Props, State> {

    public state: State = {
        dataList: []
    };
    constructor(props) {
        super(props);
    }
    public componentDidMount() {
        this.loadData({
            uid: GlobalVariable.userdetail && GlobalVariable.userdetail.sciUserId,
            page: 0
        });
    }
    public render(): JSX.Element {
        let list = this.props.cars && this.props.cars.data && this.props.cars.data.list || [];
        let refreshing = this.props.cars && this.props.refreshing || false;
        return (
            <View style={Style.container}>
                <FlatList
                    style={Style.flatList}
                    data={list}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) => this.renderListItem(item) }
                    ListEmptyComponent = {() => (<Text> 尚未有车辆 </Text>)}
                    onRefresh={this.onRefresh.bind(this)}
                    refreshing={refreshing}
                    onEndReached={this.onLoadMore.bind(this)}
                    onEndReachedThreshold={0.25}
                    ListFooterComponent={this.renderFooter.bind(this)}/>
            </View>);
    }

    private renderListItem (item): JSX.Element {
        if (!item) {
            return null;
        }
        return (<CarManagementItem data={item} />);
    }

    private renderFooter (): JSX.Element {
        if (!this.props.refreshing) {
            return (<Text style={Style.footerLine}> -- 木有更多了~ --</Text>);
        } else {
            return (null);
        }
    }

    private loadData (params: any) {
        this.props.fetchCarManagementList(this.props.navigator, params);
    }

    private onRefresh () {
        this.loadData({
            uid: GlobalVariable.userdetail && GlobalVariable.userdetail.sciUserId,
            page: 0
        });
    }

    private onLoadMore () {
        if (this.props.cars && this.props.cars.data && this.props.cars.data.list && this.props.cars.data.list.length >= 10) {
            this.loadData({
                uid: GlobalVariable.userdetail && GlobalVariable.userdetail.sciUserId,
                page: this.props.cars.data.currentPage + 1
            });
        }
    }
}

function mapStateToProps(state: any) {
    return {
        cars: state.rolec_drive.cars
        // userDetail: state.app.userDetail
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCarManagementList: (navigator: any, params: any) => {
            dispatch(fetchCarManagementList(navigator, params));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CarManagementScreen);
