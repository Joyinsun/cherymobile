import * as React from "react";
import { Component } from "react";
import { View, Text, TouchableHighlight, Image, TouchableOpacity, ScrollView, Animated, Easing, StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";
import styles from "../styles/FilterMenuComponentStyle";
import _ from "lodash";

interface Props {
    bgColor?: string;
    tintColor?: string;
    selectItemColor?: string;
    arrowImg?: string;
    checkImage?: string;
    data: Array<Array<string>>;
    bannerAction?: Function;
    maxHeight?: number;
    handler?: Function;
    onPressReset: Function;
    resetButtonName?: string;
}

interface State {
    activityIndex: number;
    selectIndex: Array<number>;
    rotationAnims: Array<any>;
    selected: boolean;
}

class FilterMenu extends Component<Props, State> {
    public state: State = {
        activityIndex: -1,
        selectIndex: this.initSelectedIndex(),
        rotationAnims: this.props.data.map(() => new Animated.Value(0)),
        selected: false
    };

    public defaultConfig = {
        bgColor: "grey",
        tintColor: "white",
        selectItemColor: "red",
        arrowImg: "../../img/dropdown_arrow.png",
        checkImage: "../../img/menu_check.png"
    };

    public initSelectedIndex(): Array<number> {
        let selectIndex = new Array(this.props.data.length);
        for (let i = 0; i < this.props.data.length; i++) {
            selectIndex[i] = 0;
        }
        return selectIndex;
    }

    constructor(props) {
        super(props);
    }
    public renderCheck(index: number, title: string): JSX.Element {
        let activityIndex = this.state.activityIndex;
        if (this.state.selectIndex[activityIndex] === index) {
            let checkImage = this.props.checkImage ? this.props.checkImage : require("../../../img/menu_check.png");
            return (
                <View style={styles.itemContainer}>
                    <Text style={{ color: this.props.selectItemColor ? this.props.selectItemColor : this.defaultConfig.selectItemColor }}>
                        {title}
                    </Text>
                    <Image source={checkImage} />
                </View>
            );
        } else {
            return (
                <View style={styles.itemContainer}>
                    <Text style={{ color: "black" }}>
                        {title}
                    </Text>
                </View>
            );
        }
    }

    public renderActivityPanel(): JSX.Element {
        if (this.state.activityIndex >= 0) {
            let currentTitles = this.props.data[this.state.activityIndex];
            let heightStyle = { height: (currentTitles.length - 1) * 44 };
            if (this.props.maxHeight && this.props.maxHeight < (currentTitles.length - 1) * 44) {
                heightStyle.height = this.props.maxHeight;
            }
            return (
                <View style={[styles.panelContainerBase, { top: 46, bottom: 0 }]}>
                    <TouchableOpacity
                        onPress={() => this.openOrClosePanel(this.state.activityIndex)}
                        activeOpacity={1}
                        style={[styles.panelContainerBase, { top: 0, bottom: 0 }]}>
                        <View style={styles.panelBackground} />
                    </TouchableOpacity>
                    <ScrollView style={[{ top: 0, backgroundColor: "white"}, styles.panelContainerBase, heightStyle]}>
                        {currentTitles.map((title, index) => {
                            if (index !== 0) {
                                return (<TouchableOpacity
                                    key={index}
                                    activeOpacity={1}
                                    style={styles.panelItem}
                                    onPress={this.itemOnPress.bind(this, index)}>
                                    {this.renderCheck(index, title)}
                                    <View style={styles.panelItemBottomLine} />
                                </TouchableOpacity>);
                            }
                        }
                        )}
                    </ScrollView>
                </View>);
        } else {
            return (null);
        }
    }

    public openOrClosePanel(index: number): void {
        if (this.props.bannerAction)
            this.props.bannerAction();

        if (this.state.activityIndex === index) {
            this.closePanel(index);
            this.setState({
                activityIndex: -1
            });
        } else {
            if (this.state.activityIndex > -1) {
                this.closePanel(this.state.activityIndex);
            }
            this.openPanel(index);
            this.setState({
                activityIndex: index
            });
        }
    }

    public openPanel(index: number): void {
        Animated.timing(
            this.state.rotationAnims[index],
            {
                toValue: 0.5,
                duration: 300,
                easing: Easing.linear
            }
        ).start();
    }

    public closePanel(index: number): void {
        Animated.timing(
            this.state.rotationAnims[index],
            {
                toValue: 0,
                duration: 300,
                easing: Easing.linear
            }
        ).start();
    }

    public onReset(): void {
        this.props.onPressReset();
        this.setState({
            selectIndex: this.initSelectedIndex(),
            selected: false
        });
    }

    public itemOnPress(index: number): void {
        if (this.state.activityIndex > -1) {
            let selectIndex = this.state.selectIndex;
            selectIndex[this.state.activityIndex] = index;
            this.setState({
                selectIndex: selectIndex,
                selected: true
            });
            if (this.props.handler) {
                this.props.handler(this.state.selectIndex);
            }
        }
        this.openOrClosePanel(this.state.activityIndex);
    }

    public renderDropDownArrow(index: number): JSX.Element {
        const icon = this.props.arrowImg ? this.props.arrowImg : require("../../../img/dropdown_arrow.png");
        if (this.state.rotationAnims && this.state.rotationAnims.length > 0) {
            return (
                <Animated.Image
                    source={icon}
                    style={[styles.dropDownIcon, { transform: [{ rotateZ: this.state.rotationAnims[index].interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] }) }] }]} />
            );
        } else {
            return <View />;
        }
    }

    public render(): JSX.Element {
        const { selected, selectIndex } = this.state;
        const { data } = this.props;
        // const { width } = Dimensions.get("window");
        // const itemWidth = (width - 30 - 10 - 14 * 2) / (data.length);
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row", backgroundColor: this.props.bgColor ? this.props.bgColor : this.defaultConfig.bgColor, paddingHorizontal: 15}}>
                    {data.map((rows, index) => {
                        let titleText = rows[selectIndex[index]];
                        if (selectIndex[index] !== 0 && rows[selectIndex[index]].length > 3) {
                            titleText = rows[selectIndex[index]].substr(0, 3) + "...";
                        }
                        return (<TouchableOpacity
                            activeOpacity={1}
                            onPress={this.openOrClosePanel.bind(this, index)}
                            key={index}
                            style={[styles.touchableItem, { marginRight: data && data.length === 4 ? 25 : 60}]}>
                            <View style={styles.titleContainer}>
                                {
                                selectIndex[index] != 0  ?
                                <Text style={{ color: this.props.tintColor, fontSize: 14 }}>
                                    {titleText}
                                </Text> :
                                <Text style={{ color: Constants.COLOR.DARKGREY, fontSize: 14 }}>
                                    {titleText}
                                </Text>
                                }
                                {this.renderDropDownArrow(index)}
                            </View>
                        </TouchableOpacity>);
                    }
                    )}
                    <View style={styles.resetPart}>
                        <View style={styles.splitLine}>
                        </View>
                        {
                            selected ?
                            <TouchableOpacity
                                onPress={this.onReset.bind(this)}
                            >
                                <Text style={[styles.resetText, { color: Constants.COLOR.DARKGREY}]}>
                                    {this.props.resetButtonName ? this.props.resetButtonName : "清空"}
                                </Text>
                            </TouchableOpacity> :
                            <View>
                                <Text style={[styles.resetText, { color: Constants.COLOR.GREY_999}]}>
                                    {this.props.resetButtonName ? this.props.resetButtonName : "清空"}
                                </Text>
                            </View>
                        }
                    </View>
                </View>
                <View style={styles.bottomLine} />
                {this.props.children}
                {this.renderActivityPanel()}
            </View>
        );
    }
}

export default FilterMenu;
