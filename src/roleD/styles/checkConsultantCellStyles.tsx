import {
	StyleSheet,
} from "react-native";

import * as Constants from "./../../lib/Constants";

const checkConsultantCellStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: Constants.SCREEN_WIDTH,
        height: 50,
        borderBottomColor: Constants.COLOR.DIVIDER,
        borderBottomWidth: 1,
    },
    CheckBox: {
        flex: 1,
        width: 80,
        alignItems: "flex-end",
        paddingRight: 15
    },
    ConsultantCell: {
        flex: 5,
        paddingLeft: 15
    },
    ConsultantLabel: {
        fontSize: 16,
        color: "#252525"
    }
});

export default checkConsultantCellStyles;
