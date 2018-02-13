"use strict";

import * as React from "react";
import { Component } from "react";
import * as Constants from "../../lib/Constants";
import IActivity from "../interfaces/activityItem";
import { StyleSheet, ScrollView, TouchableHighlight, TouchableOpacity, View, Text, Image, Dimensions, Animated, Easing } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Util from "../../lib/util";

interface Props {
    activity: IActivity;
    navigator: any;
}

interface State {
    imageSource: any;
}

class ActivityItem extends Component<Props, State> {
    public state: State = {
        imageSource: require("../../../img/pic_upload.png")
    };

    public componentDidMount(): void {
        const { activity } = this.props;
        Image.getSize(
            activity.imgUrl,
            (width, height) => {
                this.setState({
                    imageSource: { uri: activity.imgUrl }
                });
            },
            (error: any) => {
                this.setState({
                    imageSource: require("../../../img/pic_upload.png")
                });
            }
        );
    }

    public render(): JSX.Element {
        const { activity } = this.props;
        const { imageSource } = this.state;
        return (
            <TouchableOpacity
                onPress={this.onPressEvent.bind(this)}
            >
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={imageSource}
                    />
                    <View style={styles.text_part}>
                        <View style={styles.content}>
                            <Text style={styles.title}>{activity.subject}</Text>
                            <Text style={styles.type}>{activity.dealerId ? "经销商发布" : "主机厂发布"}</Text>
                        </View>
                        <Icon style={styles.right} name="arrow-right" size={15} color="#888" />
                    </View>
                    <Text style={styles.time}>活动时间：{activity.endDate}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    private onPressEvent(): void {
        this.props.navigator.push({
            screen: "consultant.ActivityDetailScreen",
            title: "活动详情",
            animated: true,
            animationType: "slide-horizontal",
            passProps: {
                activity: this.props.activity
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 25,
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ddd",
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    image: {
        marginTop: 10,
        marginRight: 10,
        width: 100,
        height: 70
    },
    text_part: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 15,
        color: Constants.COLOR.DARKGREY,
        includeFontPadding: false,
        lineHeight: 30,
    },
    type: {
        fontSize: 13,
        color: Constants.COLOR.GREY_666
    },
    time: {
        color: Constants.COLOR.GREY,
        fontSize: 12,
        position: "absolute",
        right: 15,
        bottom: 10,
        includeFontPadding: false
    },
    right: {/*  */
        position: "absolute",
        right: -5,
        top: 40
    }
});

export default ActivityItem;
