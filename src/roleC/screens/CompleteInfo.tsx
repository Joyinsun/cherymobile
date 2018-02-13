import * as React from "react";
import { Component } from "react";
import {
	Platform,
	ScrollView,
	View,
	Image,
	Text,
	TouchableHighlight
} from "react-native";

import { connect, Dispatch } from "react-redux";
import * as Constants from "./../../lib/Constants";
import RowAndroid from "../../app/components/row/index.android";
import RowIos from "../../app/components/row/index.ios";
import Common from "../../lib/Common";

interface Props {
	navigator: any;
	tabLabel: string;
	driver: any;
	ObjectID: string;
	updateMileage (navigator: any, params: any): void;
}

interface State {
	Mileage_a_content: string;
	Mileage_b_content: string;
	imgSrc: string;
}

export default class IntentInfo extends Component<Props, State> {
	public state: State = {
		Mileage_a_content: Number.parseInt(this.props.driver.Mileage_a_content).toString(),
		Mileage_b_content: Number.parseInt(this.props.driver.Mileage_b_content).toString(),
		imgSrc: "https://facebook.github.io/react-native/docs/assets/favicon.png"
	};

	constructor(props) {
		super(props);
	}

	public render() {
		return (
			<View>
				{this.renderForm()}
			</View>
		);
	}

	private onUpdateMileage (e) {
		//Common.callOnceEvent(() => {
			this.props.updateMileage(this.props.navigator, {
				objectId: this.props.ObjectID,
				body: {
					Mileage_a_content: this.state.Mileage_a_content,
                	Mileage_b_content: this.state.Mileage_b_content
				}
            });
		//});
	}

	private renderForm() {
		if (Platform.OS === "android") {
			return (
				<ScrollView>
					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: Constants.COLOR.BG_COLOR }} />
					<RowAndroid label="试驾前里程（单位km）" contextType="input" displayValue={this.state.Mileage_a_content} editable={true} navigator={this.props.navigator} />
					<RowAndroid label="试驾后里程（单位km）" contextType="input" displayValue={this.state.Mileage_b_content} editable={true} navigator={this.props.navigator} />
					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: Constants.COLOR.BG_COLOR }} />
					<RowAndroid label="试乘试驾评估" navigator={this.props.navigator} />
					<View style={{ alignItems: "center", padding: 30, backgroundColor: Constants.COLOR.WHITE, borderColor: "#ddd"}}>
						<Image source={{ uri: this.state.imgSrc }} style={{ width: 148, height: 148 }} />
						<Text style={{ paddingTop: 20, fontSize: 16 }}>请试驾客户微信扫码完成评估</Text>
					</View>
					<TouchableHighlight style={{width: "90%", marginTop: 50, marginLeft: "auto", marginRight: "auto", height: 44, borderRadius: 10}} onPress={this.onUpdateMileage.bind(this)}>
						<View style={{width: "100%", height: 44, borderRadius: 10, backgroundColor: Constants.COLOR.DARKGREY, justifyContent: "center"}}>
							<Text style={{color: Constants.COLOR.WHITE, fontSize: 16, textAlign: "center", width: "100%"}}>
								提交
							</Text>
						</View>
					</TouchableHighlight>
				</ScrollView>
			);
		} else {
			return (
				<ScrollView>
					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: Constants.COLOR.BG_COLOR }} />
					<RowIos label="试驾前里程（单位km）" contextType="input" displayValue={this.state.Mileage_a_content} editable={true} navigator={this.props.navigator} />
					<RowIos label="试驾后里程（单位km）" contextType="input" displayValue={this.state.Mileage_b_content} editable={true} navigator={this.props.navigator} />
					<View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: Constants.COLOR.BG_COLOR }} />
					<RowIos label="试乘试驾评估" navigator={this.props.navigator} />
					<View style={{ alignItems: "center", padding: 30, backgroundColor: Constants.COLOR.WHITE, borderColor: "#ddd"}}>
						<Image source={{ uri: this.state.imgSrc }} style={{ width: 148, height: 148 }} />
						<Text style={{ paddingTop: 20, fontSize: 16 }}>请试驾客户微信扫码完成评估</Text>
					</View>
					<TouchableHighlight style={{width: "90%", marginTop: 50, marginLeft: "auto", marginRight: "auto", height: 44, borderRadius: 10}} onPress={this.onUpdateMileage.bind(this)}>
						<View style={{width: "100%", height: 44, borderRadius: 10, backgroundColor: Constants.COLOR.DARKGREY, justifyContent: "center"}}>
							<Text style={{color: Constants.COLOR.WHITE, fontSize: 16, textAlign: "center", width: "100%"}}>
								提交
							</Text>
						</View>
					</TouchableHighlight>
				</ScrollView>
			);
		}
	}
}
