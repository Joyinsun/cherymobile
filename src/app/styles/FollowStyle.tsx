import { StyleSheet, Dimensions } from "react-native";
const followStyle = StyleSheet.create({
	containt: {
		flex: 1
	},
    buttonVeiwPositon: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection: "row",
        flex: 1,
        height: 40
    },
    tabView: {
        flex: 1,
        marginVertical: 10,
        marginRight: 15,
        marginLeft: 8,
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
