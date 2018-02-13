import * as React from "react";
import { Component } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, DatePickerAndroid, DatePickerIOS, Picker, Platform, Dimensions, TouchableOpacity, Alert, AlertIOS, Image } from "react-native";
import { connect, } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Constants from "../../lib/Constants";
import IActivity from "../interfaces/activityItem";
// const { width, height } = Dimensions.get("window");

interface Props {
    activity: IActivity;
}

interface State {
    imageSource: any;
}

class ActivityDetailScreen extends Component<Props, State> {
    public static navigatorButtons = {
        rightButtons: [
            {
                title: "转发",
                id: "forward",
                buttonFontSize: 14,
                buttonFontWeight: "800"
            }
        ]
    };

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
            <ScrollView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Image
                        style={styles.image}
                        source={imageSource}
                    />
                </View>

                <View style={styles.text_part}>
                    <View>
                        <Text style={styles.subject}>{activity.subject}</Text>
                        <Text style={styles.time}>{activity.endDate}</Text>
                        <Text style={styles.content}>{activity.description}</Text>
                    </View>
                </View>

                <View style={styles.button_box}>
                    <TouchableOpacity
                        onPress={() => { console.log("on press"); }}
                        style={styles.button}
                    >
                        <Text style={styles.btn_text}>立刻生成二维码</Text>
                    </TouchableOpacity>
                    <View><Text style={styles.tips}>生成二维码,用户扫描留资</Text></View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    text_part: {
        paddingHorizontal: 15,
    },
    subject: {
        fontSize: 17,
        lineHeight: 30,
        color: Constants.COLOR.DARKGREY
    },
    time: {
        fontSize: 13,
        color: "#999",
        marginVertical: 7
    },
    content: {
        fontSize: 16,
        color: "#333",
        lineHeight: 28
    },
    image: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: 210
    },
    button_box: {
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: 170,
        height: 44,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        borderColor: Constants.COLOR.DARKGREY,
        borderRadius: 22,
        borderWidth: 0.5,
        marginTop: 34,
        marginBottom: 10
    },
    btn_text: {
        fontSize: 16,
        color: Constants.COLOR.DARKGREY,
        textAlign: "center"
    },
    tips: {
        fontSize: 13,
        color: Constants.COLOR.GREY_666,
        marginBottom: 22,
        textAlign: "center"
    }
});

export default ActivityDetailScreen;
