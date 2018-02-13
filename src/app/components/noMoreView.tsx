import * as React from "react";
import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    refresh: boolean;
    noMore: boolean;
}

interface State {

}

class NoMoreView extends Component<Props, State> {
    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        let tips: string = "正在加载中...";
        let { refresh, noMore } = this.props;
        if (noMore) {
            tips = "已经木有更多了~";
        }

        let cotent = null;
        if (refresh || noMore) {
            cotent = (
                <View style={styles.tips_box}>
                    <View style={styles.line}></View>
                    <Text style={styles.tips_text}>{tips}</Text>
                    <View style={styles.line}></View>
                </View>
            );
        } else {
            cotent = (<Text></Text>);
        }

        return cotent;
    }
}

const styles = StyleSheet.create({
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

export default NoMoreView;
