import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "../../lib/Constants";
const followStyle = StyleSheet.create({
	containt: {
		flex: 1
	},
    buttonVeiwPositon: {
        backgroundColor: "#000",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        width: Constants.SCREEN_WIDTH,
        height: 80,
        padding: 15
    },
    tabView: {
        flex: 1,
        margin: 10,
        backgroundColor: "rgba(0,0,0,0.01)",
    },
    tabText: {
        fontSize: 12
    },
    list: {
        flex: 1,
        marginBottom: 10
    }
});

export default followStyle;
