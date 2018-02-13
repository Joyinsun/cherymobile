
import * as React from "react";
import { Component } from "react";
import * as Constants from "../../lib/Constants";

class AppComponent<P, S> extends Component<P, S> {
	public static navigatorStyle = {
		topBarElevationShadowEnabled: false,
		navBarHeight: 44,
		navBarTextColor: Constants.COLOR.DARKGREY,
		navBarBackgroundColor: Constants.COLOR.WHITE,
		navBarTextFontSize: 18,
		navBarTitleTextCentered: true
	};
}
export default AppComponent;
