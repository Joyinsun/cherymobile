import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";

const filterMenuComponentStyle = StyleSheet.create({
	container: {
		flexDirection: "column",
		flex: 1,
	},
	itemContainer: {
		// flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		marginLeft: 15,
		flexDirection: "row",
		height: 44,
		borderBottomWidth: 1,
		borderBottomColor: Constants.COLOR.DIVIDER
	},
	dropDownIcon: {
		width: 10,
		height: 10,
		marginLeft: 2,
		marginTop: 4,
		alignSelf: "center"
	},
	panelContainerBase: {
		position: "absolute",
		left: 0,
		right: 0
	},
	panelItemBottomLine: {
		backgroundColor: "#F6F6F6",
		height: 1,
		marginLeft: 15
	},
	panelItem: {
		// flex: 1,
		height: 44
	},
	panelBackground: {
		opacity: 0.4,
		backgroundColor: "black",
		flex: 1
	},
	touchableItem: {
		// flex: 1,
		height: 45,
		alignItems: "flex-start",
		justifyContent: "center",
		// marginRight: 25
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "flex-start"
	},
	splitLine: {
		height: 19,
		width: 1,
		borderWidth: 0.5,
		borderColor: Constants.COLOR.GREY_999,
		alignSelf: "center"
	},
	resetPart: {
		width: 40,
		position: "absolute",
		right: 15,
		flexDirection: "row",
		justifyContent: "flex-end"
	},
	resetText: {
		paddingVertical: 14,
		marginLeft: 10,
		fontSize: 13,
		textAlign: "center"
	},
	bottomLine: {
		backgroundColor: Constants.COLOR.LIGHTGREY,
		height: 1
	}
});

export default filterMenuComponentStyle;
