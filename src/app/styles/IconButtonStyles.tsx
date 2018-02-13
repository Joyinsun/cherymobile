import { StyleSheet } from "react-native";
import * as Constants from "./../../lib/Constants";
const iconWidth = (Constants.SCREEN_WIDTH - 2) / 3;
const iconHeight = (iconWidth * 4 ) / 5;

const iconButtonStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: iconWidth,
        // padding: 5,
        // margin: 5,
        height: iconHeight,
        alignItems: "center",
        // marginTop: 20,
		justifyContent: "space-between",
	},
	icon: {
		flex: 1,
		width: 30,
		marginLeft: 11,
		marginRight: 9,
		marginBottom: 14,
		alignItems: "flex-end",
		//marginTop: 20,
		// alignItems: "center",
		// alignSelf: "center",
	},
	iconImg: {
		// alignItems: "center",
	},
	rightSide: {
		flex: 2,
		flexDirection: "column",
		// paddingTop: 25,
		//justifyContent:"flex-start",
		//top: -10,
		//alignSelf: "flex-start",
		alignItems: "flex-start"
	},
	Count: {
		fontSize: 30,
		color: "#000",
		//fontWeight: "bold",
		textAlign: "left"
	},
	label: {
		//paddingTop: 5,
		marginTop: 5,
		fontSize: 12,
		color: "#000",
		width: 80,
		textAlign: "left"
	}
});

export default iconButtonStyles;
