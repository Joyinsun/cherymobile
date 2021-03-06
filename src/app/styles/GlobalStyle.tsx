import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";

//css for all screen files

const globalStyle = StyleSheet.create({
    container: {
        width: Constants.SCREEN_WIDTH,
        height: Constants.SCREEN_HEIGHT
    },
    line: {
		height: 2,
		backgroundColor: "lightgray",
		width: "100%"
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
	},
	refreshIndicator: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		width: Constants.SCREEN_WIDTH,
		height: Constants.SCREEN_HEIGHT
	}
});

export default globalStyle;
