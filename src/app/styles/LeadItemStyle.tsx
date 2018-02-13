import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";

//css for all screen files

const leadItemStyle = StyleSheet.create({
	thumbnail: {
		width: Constants.SCREEN_WIDTH,
		marginBottom: 10,
		flexDirection: "column",
		borderBottomWidth: 1,
		borderBottomColor: Constants.COLOR.DIVIDER,
	},
	whiteMask: {
		backgroundColor: "#fff",
		opacity: 0.5,
	},
	touchable: {
		width: "100%"
	},
	container: {
		padding: 15,
		backgroundColor: "white"
	},
	base: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row"
	},
	labelsContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-end",
		marginTop: 15,
		marginBottom: 20
	},
	title: {
		// flex: 1,
		fontSize: 18
	},
	tintText: {
		// flex: 1,
		height: 30,
		color: Constants.COLOR.DARKRED,
		fontSize: 18,
		marginRight: 9
	},
	time: {
		// flex: 1,
		textAlign: "right",
		fontSize: 15,
		color: Constants.COLOR.GREY_999
	},
	iconStyle: {
		width: 25,
		height: 25,
		marginRight: 30
	},
	markLabel: {
		position: "absolute",
		right: 0,
		bottom: 0,
		width: 55,
		height: 60
	},
	sourceLevel: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	itemText: {
		height: 34,
		lineHeight: 30,
		// paddingBottom: 2,
		fontSize: 14,
		color: Constants.COLOR.GREY_666,
		marginRight: 14
	}
});

export default leadItemStyle;
