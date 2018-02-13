
import { StyleSheet, Dimensions } from "react-native";

const timelineStyle = StyleSheet.create({
	container: {
		flex: 1
	},
	listview: {
		flex: 1
	},
	title: {
		fontSize: 12
	},
	rowContainer: {
		paddingLeft: 5,
		flexDirection: "row",
		alignItems: "center",
	},
	detailText: { textAlign: "left", },
	titleHeaderIcon: {
		height: 40,
		alignItems: "center",
		width: 60
	},
	toolBar: {
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: "grey",
		borderRadius: 10,
		flex: 1
	},
	toolBarIcon: {
		marginRight: 0,
		fontSize: 20
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
		borderRadius: 10,
		backgroundColor: "grey",
		marginRight: 0,
		marginTop: 5,
		marginBottom: 5,
		flex: 1
	},
	shortDetailBox: {
		borderRadius: 10,
		backgroundColor: "grey",
		marginRight: 0,
		marginTop: 5,
		marginBottom: 5,
		alignItems: "center",
		flex: 1
	},
	detailBox: {
		borderRadius: 10,
		backgroundColor: "grey",
		marginRight: 0,
		alignItems: "center",
		flex: 1
	}

});
export default timelineStyle;
