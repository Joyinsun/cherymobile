import * as React from "react";
import { Component } from "react";

import { Button, Text, TextInput, View, FlatList } from "react-native";
import * as Constants from "../../lib/Constants";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect, Dispatch } from "react-redux";
import { fetchSearchResult } from "../reducers/search/actions";

import ILead from "../../app/interfaces/lead";
import LeadItem from "../../app/components/leadItem";

import globalStyles from "../../app/styles/GlobalStyle";
import styles from "../styles/SearchScreenStyle";

//TODO 1. extend type
enum Type { Lead = "Lead", Drive = "Drive" }

interface Props {
    navigator: any;
    searchFor: {
        type: Type,
        placeholder: string,
        api: string
    };
    search: {
        searchKey: string,
        list: any,
        refresh: boolean
    };
    dispatch: Dispatch<any>;
    fetchSearchResult(api: string, searchKey: number, navigator: any, refresh: boolean): void;
}

interface State {
    first: boolean;
    currentData: any;
    refresh: boolean;
}

class SearchScreen extends Component<Props, State> {
    public input: any = null;
    public state: State = {
        first: true,
        currentData: this.props.search.list || [],
        refresh: this.props.search.refresh === undefined ? false : this.props.search.refresh
    };

    public componentWillReceiveProps(newProps: Props): void {
        let search = newProps.search;
        if (search.refresh) {
            this.setState({
                refresh: search.refresh,
                first: false,
            });
        } else {
            this.setState({
                currentData: search.list || [],
                refresh: search.refresh
            });
        }
    }

    public componentDidMount(): void {
        this.setState({
            currentData: [],
            refresh: false
        });
    }
    public render(): JSX.Element {
        let noData = (null);
        if (!this.state.first && !this.state.refresh && this.state.currentData && this.state.currentData.length == 0) {
            noData = (<View style={[globalStyles.container, styles.noDataContainer]}><Text>很抱歉！没有相关数据！</Text></View>);
        }
        return (<View style={[globalStyles.container, styles.container]}>
            <View style={styles.inputContainer}>
                <TextInput ref={(input) => { this.input = input; }} underlineColorAndroid="transparent" onEndEditing={(event) => { this.searchByKey(event); }} placeholder={this.props.searchFor.placeholder} inlineImageLeft="search_icon" style={styles.searchInput}></TextInput>
                <Text style={styles.cancelButton} onPress={() => { this.backToPreviousPage(); }}>取消</Text>
            </View>
            <View style={styles.line} />
            {noData}
            <FlatList
                keyExtractor={(item, index) => index}
                data={this.state.currentData}
                renderItem={this.renderItem}
                refreshing={this.state.refresh}
                onRefresh={() => this.onRefresh()} />

        </View>
        );
    }
    private backToPreviousPage(): void {
        this.props.navigator.pop();
    }

    private searchByKey(event): void {
        let searchKey = event.nativeEvent.text;
        if (!(searchKey && searchKey.trim())) {
            //弹出提示消息
        } else {
            this.props.fetchSearchResult(this.props.searchFor.api, searchKey, this.props.navigator, true);
        }
    }

    private renderItem = ({ item }) => {
        if (this.props.searchFor.type == Type.Lead) {
            return (<LeadItem lead={item} navigator={this.props.navigator} roleName="consultant" />);
        } else {
            //TODO 2. choose row item by type
            return (<LeadItem lead={item} navigator={this.props.navigator} roleName="consultant" />);
        }
    }

    private onRefresh(): void {
        let searchKey = this.input._getText();
        if (!(searchKey && searchKey.trim())) {
            //弹出提示消息
        } else {
            this.props.fetchSearchResult(this.props.searchFor.api, searchKey, this.props.navigator, true);
        }
    }
}

function mapStateToProps(state: any): any {
    return {
        search: state.rolea_search
    };
}

function mapDispatchToProps(dispatch: any): any {
    return {
        fetchSearchResult: (api: string, searchKey: string, navigator: any, refresh: boolean) => {
            dispatch(fetchSearchResult(api, searchKey, navigator, refresh));
        },
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
