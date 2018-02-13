"use strict";

import * as React from "react";
import { Component } from "react";
import { TouchableHighlight, View, Text } from "react-native";

import Styles from "../styles/carManagementItemComponentStyle";
import Icon from "react-native-vector-icons/FontAwesome";

import ManagementItem from "../interfaces/carManagement";
import util from "../../lib/util";
interface Props {
	data: ManagementItem;
}

interface State {
	isShow: boolean;
}

class CarManagementItem extends Component<Props, State> {
	public state: State = {
		isShow: false
	};

	public render(): JSX.Element {
		if (!this.props.data || !this.props.data.id) {
			return null;
		}
		let toggleChevron = this.state.isShow ? "chevron-up" : "chevron-down";
		const moment: any = require("moment");
		const formatStatus = util.getCarManagementStatus(this.props.data.status);
		const vinCode = util.getVinCodeLast(this.props.data.vin);
		const showContent = this.state.isShow ? (
			<View style={Styles.listContent}>
				<View style={Styles.listContentRow}>
					<Text style={Styles.listContentRowLabel}>车型</Text>
					<Text style={Styles.listContentRowValue}>{this.props.data.carModel}</Text>
				</View>
				<View style={Styles.listContentRow}>
					<Text style={Styles.listContentRowLabel}>车牌号</Text>
					<Text style={Styles.listContentRowValue}>{this.props.data.numberPlate}</Text>
				</View>
				<View style={Styles.listContentRow}>
					<Text style={Styles.listContentRowLabel}>动总</Text>
					<Text style={Styles.listContentRowValue}>{this.props.data.carType}</Text>
				</View>
				<View style={Styles.listContentRow}>
					<Text style={Styles.listContentRowLabel}>VIN码（后四位）</Text>
					<Text style={Styles.listContentRowValue}>{vinCode}</Text>
				</View>
				<View style={Styles.listContentRow}>
					<Text style={Styles.listContentRowLabel}>当前里程</Text>
					<Text style={Styles.listContentRowValue}>{this.props.data.mileage}</Text>
				</View>
				<View style={Styles.listContentRow}>
					<Text style={Styles.listContentRowLabel}>上传日期</Text>
					<Text style={Styles.listContentRowValue}>{this.props.data.createDate && moment(this.props.data.createDate).format("YYYY/MM/DD")}</Text>
				</View>
				<View style={Styles.listContentRow}>
					<Text style={Styles.listContentRowLabel}>有效期从</Text>
					<Text style={Styles.listContentRowValue}>{this.props.data.validFrom && moment(this.props.data.validFrom).format("YYYY/MM/DD")}</Text>
				</View>
				<View style={Styles.listContentRow}>
					<Text style={Styles.listContentRowLabel}>有效期到</Text>
					<Text style={Styles.listContentRowValue}>{this.props.data.validFrom && moment(this.props.data.validTo).format("YYYY/MM/DD")}</Text>
				</View>
				<View style={Styles.listContentRow}>
					<Text style={Styles.listContentRowLabel}>状态</Text>
					<Text style={Styles.listContentRowValue}>{formatStatus.title}</Text>
				</View>
			</View>) : (null);

		return (
			<View style={Styles.listItem}>
				<TouchableHighlight style={Styles.listHeadTouchBar} onPress={this.onItemPress.bind(this)}>
					<View style={Styles.listHeader}>
						<Text style={Styles.listHeaderConetentLabel}>{this.props.data.carModel + this.props.data.numberPlate}</Text>
						<Icon style={Styles.listHeaderConetentIcon} name={ toggleChevron }></Icon>
					</View>
				</TouchableHighlight>
				{ showContent }
			</View>
		);
	}

	private onItemPress(e) {
		let isShow = this.state.isShow;
		this.setState({
			isShow: !isShow
		});
	}
}
export default CarManagementItem;
