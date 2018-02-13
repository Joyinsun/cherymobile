import {
	StyleSheet,
} from "react-native";

import * as Constants from "./../../lib/Constants";

const checkConsultantCellStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: Constants.SCREEN_WIDTH,
        borderBottomColor: "#F0F2F3",
        borderBottomWidth: 2,
        paddingTop: 10
    },
    CheckBox: {
        flex: 1,
        width: 80,
        alignItems: "flex-end",
        paddingRight: 10
    },
    ConsultantCell: {
        flex: 5,
        marginLeft: 10,
    },
    ConsultantLabel: {
        fontSize: 16
    }
});

export default checkConsultantCellStyles;
