"use strict";

import * as React from "react";
import { Component } from "react";
import { StyleSheet, ListView, TouchableOpacity, View, Text, TextInput, ScrollView, Dimensions } from "react-native";
import * as Constants from "./../../../lib/Constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../styles/RowStyle";

const { width, height } = Dimensions.get("window");

interface Props {
    navigator: any;
    parentId?: string;
    parent?: any;
    selectKey: string;
    onSelectItem: any;
    secondLevelDataList: object[];
}

interface State {
    selectKey: string;
}

class SecondSimpleSelectScreen extends Component<Props, State> {
    public state: State = {
        selectKey: this.props.selectKey
    };
    public render(): JSX.Element {
        const { secondLevelDataList } = this.props;

        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        }).cloneWithRows(secondLevelDataList);
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
        let newRowData = Object.assign({ "id": rowData.id, "key": rowData.key, "value": rowData.value }, { "parentValue": this.props.parent.value, "parentId": this.props.parent.key });
        this.props.onSelectItem(newRowData);
        this.props.navigator.dismissAllModals();
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

export default SecondSimpleSelectScreen;
