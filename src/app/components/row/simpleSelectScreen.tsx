"use strict";

import * as React from "react";
import { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text, TextInput, ListView, ScrollView, Dimensions } from "react-native";
import * as Constants from "./../../../lib/Constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../styles/RowStyle";

const { width, height } = Dimensions.get("window");

interface Props {
    navigator: any;
    selectKey: string;
    onSelectItem: any;
    dataList: object[];
    hasChild?: boolean;
    childScreenTitle?: string;
}

interface State {
    selectKey: string;
    dataList: object[];
}

class SimpleSelectScreen extends Component<Props, State> {
    public state: State = {
        selectKey: this.props.selectKey,
        dataList: this.props.dataList
    };
    //TODO render之前去检查数据有没有
    public render(): JSX.Element {
        const { dataList } = this.props;
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        }).cloneWithRows(dataList);
        return (
            <ScrollView style={[styles.selectionContainer]}>
                <ListView
                    style={[]}
                    contentContainerStyle={[]}
                    initialListSize={1}
                    dataSource={dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                    enableEmptySections={true}
                    onEndReachedThreshold={10}
                >
                </ListView>
            </ScrollView>
        );
    }
    private selectItem(rowData) {
        if (this.props.hasChild && rowData.secondLevelDataList) {
            console.log("rowData : " + JSON.stringify(rowData));
            this.props.navigator.showModal({
                title: this.props.childScreenTitle,
                screen: "row.SecondSimpleSelectScreen",
                animationType: "slide-horizontal",
                passProps: {
                    parent: rowData,
                    secondLevelDataList: rowData.secondLevelDataList,
                    onSelectItem: (value) => this.props.onSelectItem(value)
                }
            });
        } else {
            this.props.onSelectItem(rowData);
            this.props.navigator.dismissModal();
        }
    }
    private renderRow(rowData): JSX.Element {
            return (
                <TouchableOpacity onPress={() => this.selectItem(rowData)}>
                    <View style={styles.selectItem}>
                        <Text style={styles.selectionText}>{rowData.value}</Text>
                    </View>
                </TouchableOpacity>
            );
    }
}

export default SimpleSelectScreen;
