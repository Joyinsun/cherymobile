import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../../lib/Constants";

const tabSelectTableStyle = StyleSheet.create({
	tableContaint: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderStyle: "dashed",
		borderColor: "black",
		marginLeft: 5,
		marginRight: 10
	},
	groupContainer: {
		flex: 1,
		alignItems: "baseline",
		borderRadius: 10
	},
	groupDetail: {
		justifyContent: "flex-start",
		width: Constants.SCREEN_WIDTH,
		alignItems: "center",
		flexDirection: "row",
		flexWrap: "wrap",
		flex: 1
	},
	button: {
		paddingLeft: 5,
		paddingRight: 5,
		borderRadius: 5,
		margin: 5,
		// fontSize: 14,
		color: "white"
	},
	enable: {},
	disable: {},
	pressed: { backgroundColor: "black" },
	unpressed: { backgroundColor: "grey" },
	invisible: {}
});
export default tabSelectTableStyle;
