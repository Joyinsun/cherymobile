
import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../../lib/Constants";

const timelineStyle = StyleSheet.create({
	container: {
		flex: 1,
	},
	listview: {
		flex: 1
	},
	title: {
		fontSize: 16,
		color: Constants.COLOR.GREY_666
	},
	subTitle: {
		fontSize: 13,
		color: Constants.COLOR.GREY_999
	},
	leftTimeline: {
		flex: 1,
		alignItems: "center"
	},
	leftTimelineIcon: {
		width: 28,
		height: 28,
		marginBottom: 5
	},
	rowContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	detailText: {
		textAlign: "left"
	},
	titleHeaderIcon: {
		alignItems: "center",
		width: 28,
		marginRight: 4,
		// flex: 1,
		// borderWidth: 1,
		// borderColor: "#000",
		justifyContent: "flex-start"
	},
	itemContentCard: {
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: Constants.COLOR.WHITE,
		width: Constants.SCREEN_WIDTH - 55,
		marginBottom: 55
	},
	toolBar: {
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
	},
	toolBarIcon: {
		width: 25,
		height: 25,
		marginRight: 30
	},
	ellipseIcon: {
		width: 15,
		height: 15,
		marginBottom: 5
	},
	feedbackDetail: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderStyle: "dashed",
		borderColor: "black",
		height: 48,
		marginLeft: 5,
		marginRight: 10
	},
	feedbackDetailBox: {
		// flex: 1
	},
	shortDetailBox: {
		borderRadius: 10,
		marginRight: 0,
		marginTop: 5,
		marginBottom: 5,
		alignItems: "center",
		flex: 1
	},
	detailBox: {
		// marginLeft: 14
		flex: 1
	}

});
export default timelineStyle;
