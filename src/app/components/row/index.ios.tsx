"use strict";

import * as React from "react";
import { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Image, Dimensions, DatePickerIOS, PixelRatio } from "react-native";
import * as Constants from "./../../../lib/Constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Navigation } from "react-native-navigation";
import styles from "../../styles/RowStyle";
import DatePicker from "react-native-datepicker";

const { width, height } = Dimensions.get("window");

interface Props {
    navigator?: Navigation;
    label: string;
    name?: string;
    contextType?: "text" | "input" | "datepicker" | "picker" | "textarea" | "multiSelect" | "datetimepicker";
    fontSize?: number;
    placeholder?: string;
    displayValue?: any;
    dataSource?: object[];
    displayType?: string;
    maxLength?: number;
    displayCounterText?: boolean;
    editable?: boolean;
    onChangeEvent?: any;
    isGroupTitle?: boolean;
    visible?: boolean;
    rootScreenTitle?: string;
    hasChild?: boolean;
    childScreenTitle?: string;
}

interface State {
    displayValue: any;
    editable: boolean;
    showDatePicker: boolean;
    displayValueLabel: string;
}

class Row extends Component<Props, State> {
    public dateTime: any;
    public state: State = {
        displayValue: this.props.displayValue,
        showDatePicker: false,
        editable: this.props.editable ? this.props.editable : false,
        displayValueLabel: ""
    };
    public componentWillReceiveProps(newProps: Props): void {
        this.setState({
            displayValue: newProps.displayValue,
            editable: newProps.editable
        });
    }
    public render(): JSX.Element {
        if (this.props.displayType && this.props.displayType === "column") {
            return (
                <View style={[this.props.visible === false ? styles.inVisible : {}]}>
                    <View style={[styles.containerColumn]}>
                        {this.renderComponentLabel()}
                        {this.renderContextChild()}
                    </View>
                    {this.renderSegLineComponent()}
                </View>
            );
        } else if (this.props.isGroupTitle && this.props.isGroupTitle == true) {
            return (
                <View style={[{ flexDirection: "column" }, this.props.visible === false ? styles.inVisible : {}]}>
                    <View style={[styles.container]}>
                        <Text style={{ fontSize: 13, fontWeight: "bold", color: "#252525" }}>{this.props.label}</Text>
                    </View>
                    {this.renderSegLineComponent()}
                </View>
            );
        } else {
            return (
                <View style={[{ flexDirection: "column" }, this.props.visible === false ? styles.inVisible : {}]}>
                    <View style={[styles.container]}>
                        <Text style={[styles.text, {color: Constants.COLOR.GREY_252525}]}>{this.props.label}</Text>
                        {this.renderContextChild()}
                    </View>
                    {this.renderDatePicker()}
                    {this.renderSegLineComponent()}
                    {this.renderDateTimePicker()}
                    <View style={[styles.container, this.state.displayValueLabel === "" || this.props.editable === false ? styles.inVisible : {}]}>
                        <Text style={styles.text}>{this.state.displayValueLabel}</Text>
                    </View>
                </View>
            );
        }
    }
    private openPicker() {
        if (this.props.editable) {
            this.props.navigator.showModal({
                title: this.props.rootScreenTitle,
                screen: "row.SimpleSelectScreen",
                animationType: "slide-horizontal",
                passProps: {
                    selectKey: this.state.displayValue,
                    onSelectItem: (value) => this.onSelectItem(value),
                    dataList: this.props.dataSource,
                    hasChild: this.props.hasChild,
                    childScreenTitle: this.props.childScreenTitle
                }
            });
        }
    }
    private onSelectItem(oValue) {
        this.setState({
            displayValue: oValue.value
        });
        if (this.props.onChangeEvent) {
            if (this.props.name) {
                let labelName = this.props.name;
                let displayInfo = new Object();
                displayInfo[labelName] = oValue;
                this.props.onChangeEvent(displayInfo);
            } else {
                this.props.onChangeEvent(oValue);
            }
        }
    }
    private onChange(displayValue) {
        this.setState({ displayValue });
        if (this.props.onChangeEvent) {
            if (this.props.name) {
                let labelName = this.props.name;
                let displayInfo = new Object();
                displayInfo[labelName] = displayValue;
                this.props.onChangeEvent(displayInfo);
            } else {
                this.props.onChangeEvent(displayValue);
            }
        }
    }
    private renderPickerComponent(): JSX.Element {
        let displayStyle = new Object();
        displayStyle["display"] = this.state.editable ? "flex" : "none";
        let color = this.state.editable ? Constants.COLOR.GREY_888 : Constants.COLOR.GREY_ccc;
        return (
            <TouchableOpacity onPress={() => this.openPicker()}>
                <View style={styles.NavRow}>
                    <Text style={[styles.text, styles.margin, { color: color }]}>{this.state.displayValue}</Text>
                    <Icon style={displayStyle} name="navigate-next" size={30} color={color} />
                </View>
            </TouchableOpacity>
        );
    }
    private renderTextInputComponent(): JSX.Element {
        return (<TextInput underlineColorAndroid="transparent" editable={this.props.hasOwnProperty("editable") ? this.props.editable : this.state.editable} maxLength={this.props.maxLength > 0 ? this.props.maxLength : null} placeholder={this.props.placeholder} style={styles.input} onChangeText={(displayValue) => this.onChange(displayValue)} value={this.state.displayValue}></TextInput>);
    }
    private renderTextComponent(): JSX.Element {
        return (<Text style={styles.text}>{this.props.displayValue}</Text>);
    }
    private renderTextAreaComponent(): JSX.Element {
        if (this.props.displayCounterText) {
            return this.renderTextAreaInputWithCounter();
        } else {
            return this.renderTextAreaInputComponent();
        }
    }
    private renderTextAreaInputComponent(): JSX.Element {
        return (<TextInput underlineColorAndroid="transparent"
            editable={this.props.hasOwnProperty("editable") ? this.props.editable : this.state.editable}
            maxLength={this.props.maxLength > 0 ? this.props.maxLength : null}
            placeholder={this.props.placeholder}
            placeholderTextColor={Constants.COLOR.GREY_ccc}
            multiline={true} style={styles.textArea}
            onChangeText={(displayValue) => this.onChange(displayValue)}
            value={this.state.displayValue}></TextInput>);
    }
    private renderTextAreaInputWithCounter(): JSX.Element {
        return (<View style={{ flexDirection: "column" }}>
            <TextInput
                underlineColorAndroid="transparent"
                editable={this.props.hasOwnProperty("editable") ? this.props.editable : this.state.editable}
                maxLength={this.props.maxLength > 0 ? this.props.maxLength : null}
                placeholder={this.props.placeholder}
                placeholderTextColor={Constants.COLOR.GREY_ccc}
                multiline={true} style={styles.textArea}
                onChangeText={(displayValue) => this.onChange(displayValue)}
                value={this.state.displayValue}>
            </TextInput>
            <Text style={styles.counterText}>{this.state.displayValue.length}/{this.props.maxLength}</Text>
        </View>);

    }
    private renderComponentLabel(): JSX.Element {
        if (this.props.label) {
            return (<Text style={styles.componentLabel}>{this.props.label}</Text>);
        }
    }
    private onDateChange(d) {
        let showYear = new Date(d).getFullYear();
        let showMonth = new Date(d).getMonth() + 1;
        let showDate = new Date(d).getDate();
        //alert(showYear+"-"+showMonth+"-"+showDate);
        let labelName = this.props.name;
        let displayInfo = new Object();
        displayInfo[labelName] = showYear + "-" + showMonth + "-" + showDate;
        this.setState({
            displayValue: displayInfo[labelName]
        });
        this.props.onChangeEvent(displayInfo);
    }
    private renderDatePicker(): JSX.Element {
        if (this.state.showDatePicker) {
            let selectedDay = this.state.displayValue;
            let showYear = new Date(selectedDay).getFullYear();
            let showMonth = new Date(selectedDay).getMonth();
            let showDate = new Date(selectedDay).getDate() + 1;

            return <DatePickerIOS
                date={new Date(showYear, showMonth, showDate)}
                mode="date"
                onDateChange={(d) => this.onDateChange(d)}
            />;
        } else {
            return null;
        }
    }
    private renderMultiSelectComponent(): JSX.Element {
        let displayStyle = new Object();
        displayStyle["display"] = this.state.editable ? "flex" : "none";
        let color = this.state.editable ? Constants.COLOR.GREY_888 : Constants.COLOR.GREY_ccc;
        return (
            <TouchableOpacity onPress={() => this.openMultiSelected()}>
                <View style={styles.NavRow}>
                    <Text style={[styles.text, styles.margin, { color: color }]}>{this.props.editable ? this.state.displayValue : ""}</Text>
                    <Icon style={displayStyle} name="navigate-next" size={30} color={color} />
                </View>
            </TouchableOpacity>
        );
    }
    private openMultiSelected() {
        if (this.props.editable) {
            this.props.navigator.showModal({
                title: "",
                screen: "row.MultiSelectScreen",
                passProps: {
                    onSelectItem: (value) => this.onSelectItems(value),
                    dataList: this.props.dataSource
                }
            });
        }
    }
    private onSelectItems(aValues) {
        if (aValues.length === 1) {
            this.setState({
                displayValue: aValues[0].value,
                displayValueLabel: ""
            });
        } else {
            let aStr = [];
            aValues.forEach(function(value) {
                aStr.push(value.value);
            });
            let displayValueLabel = JSON.stringify(aStr).replace(new RegExp("\",\"", "gm"), "/").split("[\"")[1].split("\"]")[0];
            this.setState({
                displayValue: "多个",
                displayValueLabel: displayValueLabel
            });
        }
        if (this.props.onChangeEvent) {
            if (this.props.name) {
                let labelName = this.props.name;
                let displayInfo = new Object();
                displayInfo[labelName] = aValues;
                this.props.onChangeEvent(displayInfo);
            } else {
                this.props.onChangeEvent(aValues);
            }
        }
    }
    private onDatePress() {
        if (this.props.editable) {
            this.setState({
                showDatePicker: (this.state.showDatePicker ? false : true)
            });
        }
    }
    private onDateTimePress() {
        this.dateTime.onPressDate();
    }
    private renderDatePickerText(): JSX.Element {
        return <TouchableOpacity onPress={this.onDatePress.bind(this)}>
            <View>
                <Text>
                    {this.state.displayValue}
                </Text>
            </View>
        </TouchableOpacity>;
    }
    private renderDateTimePickerText(): JSX.Element {
        let displayStyle = new Object();
        displayStyle["display"] = this.state.editable ? "flex" : "none";
        let color = this.state.editable ? Constants.COLOR.GREY : Constants.COLOR.LIGHTGREY;
        return (
            <TouchableOpacity onPress={() => this.onDateTimePress()}>
                <View style={styles.NavRow}>
                    <Text style={[styles.text, styles.margin, { color: color }]}>{this.props.editable ? this.state.displayValue : ""}</Text>
                    <Icon style={displayStyle} name="navigate-next" size={30} color={color} />
                </View>
            </TouchableOpacity>
        );
    }
    private renderContextChild(): JSX.Element {
        switch (this.props.contextType) {
            case "text": return this.renderTextComponent();
            case "input": return this.renderTextInputComponent();
            case "datepicker": return this.renderDatePickerText();
            case "picker": return this.renderPickerComponent();
            case "multiSelect": return this.renderMultiSelectComponent();
            case "textarea": return this.renderTextAreaComponent();
            case "datetimepicker": return this.renderDateTimePickerText();
            default: return; //当displayValue没有时，右侧不渲染任何组件
        }
    }
    private renderDateTimePicker(): JSX.Element {
        return (<View style={styles.inVisible}>
            <DatePicker ref={dateTime => {
                this.dateTime = dateTime;
            }}
                style={{ width: 200 }}
                date={new Date()}
                mode="datetime"
                format="YYYY-MM-DD HH:mm"
                confirmBtnText="确定"
                cancelBtnText="取消"
                minuteInterval={10}
                showIcon={false}
                onDateChange={(value) => this.onDateTimeChange(value)}
            />
        </View>);
    }
    private onDateTimeChange(displayValue) {
        this.setState({ displayValue });
        if (this.props.onChangeEvent) {
            if (this.props.name) {
                let labelName = this.props.name;
                let displayInfo = new Object();
                displayInfo[labelName] = displayValue;
                this.props.onChangeEvent(displayInfo);
            } else {
                this.props.onChangeEvent(displayValue);
            }
        }
    }
    private renderSegLineComponent(): JSX.Element {
        return (
            <View style={{ borderColor: Constants.COLOR.BG_COLOR, borderBottomWidth: 0.5, width: Constants.SCREEN_WIDTH }} />
        );
    }
}

export default Row;
