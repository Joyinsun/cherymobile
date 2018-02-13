import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";

//css for all screen files

const sciStyle = StyleSheet.create({
	container: {
		flex: 1
	},
	sciview: {
		marginLeft: -100,
		width: 100,
		height: 100
	},
	horizontal: {
		position: "absolute",
		top: 0,
		width: Constants.SCREEN_WIDTH,
		height: Constants.SCREEN_HEIGHT,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default sciStyle;
