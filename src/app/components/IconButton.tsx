import * as React from "react";
import { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image
} from "react-native";

import * as Constants from "./../../lib/Constants";
import styles from "../styles/IconButtonStyles";
interface Props {
	badgeCount: number;
	label: string;
	iconSrc: string;
	onClick: any;
}

interface State {
	iconURL: string;
}

export default class IconButton extends Component<Props, State> {
	public state: State = {
		iconURL: this.props.iconSrc//"https://facebook.github.io/react-native/docs/assets/favicon.png"
	};

	constructor(props) {
		super(props);
	}

	public getIcon = (src) => {
		switch (src) {
			case "toBeAssign":
				return { src: require("../../../img/icon_daifenpei@2x.png") };
			case "toBeApprovel":
				return { src: require("../../../img/icon_daishenpi@2x.png") };
			case "toBeUrge":
				return { src: require("../../../img/icon_daiducu@2x.png") };
			case "passengerFlow":
				return { src: require("../../../img/visitor@2x.png") };
			case "newAssign":
				return { src: require("../../../img/newassign@2x.png") };
			case "unfollow":
				return { src: require("../../../img/unfollow@2x.png") };
			case "unreached":
				return { src: require("../../../img/unreached@2x.png") };
			case "newAssign":
				return { src: require("../../../img/newassign@2x.png") };
			case "drive":
				return { src: require("../../../img/drive@2x.png") };
			case "car":
				return { src: require("../../../img/car@2x.png") };
			case "callback":
				return { src: require("../../../img/callback@2x.png") };
			default:
				return { src: "" };
		}
	}
	public render(): JSX.Element {
		return (
			<TouchableOpacity
				onPress={this.props.onClick.bind(this)}
				style={styles.container}
			>
				<View style={styles.icon}>
					<Image source={this.getIcon(this.state.iconURL).src} style={styles.iconImg} />
				</View>
				<View style={styles.rightSide}>
					<Text numberOfLines={1} style={styles.Count}>{this.props.badgeCount > 99 ? "99+" : this.props.badgeCount}</Text>
					<Text numberOfLines={1} style={styles.label}>{this.props.label}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
