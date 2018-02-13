"use strict";

import * as GlobalVariable from "./global";
import Common from "./Common";

export default {
	_pressPoints() {
		//积分
		Common.callOnceEvent(() =>
			this.props.navigator.push({
				screen: "app.DefaultPage",
				title: "积分",
				animated: true,
				animationType: "slide-horizontal",
				navigatorStyle: {
					navBarTitleTextCentered: true,
					tabBarHidden: true
				}
			})
		);
	},
	_pressBasicMsg() {
		//基本信息
		Common.callOnceEvent(() =>
			this.props.navigator.push({
				screen: "app.BasicMsg",
				title: "基本信息",
				animated: true,
				animationType: "slide-horizontal",
				passProps: {
					userID: GlobalVariable.userdetail.id,
					currentRole: this.currentRole,
					navigator: this.props.navigator
				},
				navigatorStyle: {
					tabBarHidden: true
				}
			})
		);
	},
	_pressSetting() {
		//设置
		Common.callOnceEvent(() =>
			this.props.navigator.push({
				screen: "app.Setting",
				title: "设置",
				animated: true,
				animationType: "slide-horizontal",
				passProps: {
					navigator: this.props.navigator
				},
				navigatorStyle: {
					navBarTitleTextCentered: true,
					tabBarHidden: true
				}
			})
		);
	},
	_pressChangingRoles() {
		//切换角色
		this.switchRole._switchRole();
	},
	_pressDriverTech() {
		//show TestDrive
		Common.callOnceEvent(() =>
			this.props.navigator.push({
				screen: "app.DefaultPage",
				title: "试乘话术",
				animated: true,
				animationType: "slide-horizontal",
				navigatorStyle: {
					navBarTitleTextCentered: true,
					tabBarHidden: true
				}
			})
		);
	},
	_pressCarType() {
		//车型知识
		Common.callOnceEvent(() =>
			this.props.navigator.push({
				screen: "app.DefaultPage",
				title: "车型知识",
				animated: true,
				animationType: "slide-horizontal",
				navigatorStyle: {
					navBarTitleTextCentered: true,
					tabBarHidden: true
				}
			})
		);
	},
	_pressCarComparing() {
		//车型对比
		Common.callOnceEvent(() =>
			this.props.navigator.push({
				screen: "app.DefaultPage",
				title: "车型对比",
				animated: true,
				animationType: "slide-horizontal",
				navigatorStyle: {
					navBarTitleTextCentered: true,
					tabBarHidden: true
				}
			})
		);
	}
};
