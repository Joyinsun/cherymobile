import { StyleSheet, Dimensions } from "react-native";
import * as Constants from "./../../lib/Constants";
const managerTabsScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: "center"
    },
    buttonContainer: {
        marginTop: 20,
        height: 40,
        width: 300,
        backgroundColor: "#227622",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#227622",
        borderRadius: 5,
        borderWidth: 1
    },
    textStyle6: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 15,
        fontWeight: "bold"
    },
    form: {
        flex: 1,
        width: Constants.SCREEN_WIDTH,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
    },
    formTitle: {
        width: Constants.SCREEN_WIDTH,
        height: 50,
        justifyContent: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: Constants.COLOR.DIVIDER
        // paddingBottom:10
    },
    formTitleText: {
        width: Constants.SCREEN_WIDTH,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: "#252525",
        // paddingBottom:10
    },
    backgroundImage: {
        flexDirection: "row",
        height: 200,
        width: Constants.SCREEN_WIDTH,
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10
    }
});

export default managerTabsScreenStyle;
