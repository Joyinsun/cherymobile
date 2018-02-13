"use strict";

import * as React from "react";
import { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text, TextInput, ListView, ScrollView, Dimensions } from "react-native";
import CheckBox from "../../components/CheckBox";
import * as Constants from "./../../../lib/Constants";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#fff"
    },
    NavRow: {
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        marginRight: -10
    },
    input: {
        width: Constants.SCREEN_WIDTH / 2,
        padding: 0,
        textAlign: "right"
    },
    text: {
        fontSize: 16
    },
    selectItem: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        width: Constants.SCREEN_WIDTH
    }
});

interface Props {
    navigator: any;
    selectKey: string;
    onSelectItem: any;
    dataList: object[];
}

interface State {
    selectKey: string;
    aSelectIndex: any;
    aSelectData: any;
}

class MultiSelectScreen extends Component<Props, State> {
    public static navigatorButtons = {
        rightButtons: [
            {
                id: "submitButton",
                title: "确定",
                buttonColor: "black"
            }
        ]
    };

    public state: State = {
        selectKey: this.props.selectKey,
        aSelectIndex: [],
        aSelectData: []
    };
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    public render(): JSX.Element {
        const { dataList } = this.props;

        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        }).cloneWithRows(dataList);
        return (
            <ScrollView style={[styles.container]}>
                <ListView
                    style={[]}
                    contentContainerStyle={[]}
                    initialListSize={1}
                    dataSource={dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
                    onEndReachedThreshold={10}
                >
                </ListView>
            </ScrollView>
        );
    }
    private renderRow(rowData, sectionID, rowID): JSX.Element {
        return (
            <View style={[styles.selectItem, { flexDirection: "column" }]}>
                <Text>{rowData.value}</Text>
                <CheckBox checked={this.state.aSelectIndex.includes(rowID)} onClick={(oEvent) => this.onClick(rowData, rowID)} />
            </View>
        );
    }
    private onClick(rowData, rowID): void {
        if (this.state.aSelectIndex.includes(rowID)) {
            let aSelectIndex = this.state.aSelectIndex;
            let iIndex = aSelectIndex.indexOf(rowID);
            if (iIndex > -1) {
                aSelectIndex.splice(rowID, 1);
                this.state.aSelectData.splice(rowID, 1);
            }
        } else {
            this.state.aSelectIndex.push(rowID);
            this.state.aSelectData.push(rowData);
        }
        this.setState({
            aSelectIndex: this.state.aSelectIndex
        });
    }
    private onNavigatorEvent(event) {
        if (event.type == "NavBarButtonPress") {
            if (event.id == "submitButton") {
                this.props.onSelectItem(this.state.aSelectData);
                this.props.navigator.dismissAllModals();
            }
        }
    }
}
export default MultiSelectScreen;
