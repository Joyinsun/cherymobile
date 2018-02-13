import * as React from "react";
import { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
} from "react-native";
import styles from "./styles";

interface Props {
    title?: string;
    center?: boolean;
    children: any;
    icon: any;
    selectedIcon: any;
    onPress: any;
}

interface State {

}

export default class TabBarItem extends Component<Props, State> {

    public render() {
        let child = this.props.children;

        if (child.length && child.length > 0) {
            throw new Error("onlyChild must be passed a children with exactly one child.");
        }

        return (
            <View style={styles.weight}>
                {child}
            </View>
        );
    }
}
