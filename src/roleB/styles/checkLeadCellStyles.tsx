import {
	StyleSheet,
} from "react-native";

import * as Constants from "./../../lib/Constants";

const checkLeadCellStyles = StyleSheet.create({
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
        alignItems: "center"
    },
    LeadCell: {
        flex: 6,
        marginLeft: 30
    },
    row: {
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-around"
    },
    label: {
        fontSize: 16,
    },
    touch: {
        flexDirection: "row",
        justifyContent: "space-around"
    }
});

export default checkLeadCellStyles;
