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
        marginTop: 10,
        //height: 100,
        backgroundColor: "transparent"
    },
    CheckBox: {
        width: 22,
        height: 22,
        marginLeft: 15,
        alignItems: "center"
    },
    LeadCell: {
        width: 310,
        height: 100,
        marginLeft: 12,
        backgroundColor: "#fff",
        justifyContent: "center",
       //alignItems: "flex-start",
        borderRadius: 5,
    },
    row: {
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        paddingTop: 15
    },
    label: {
        fontSize: 16,
    },
    labelGrey: {
        fontSize: 16,
        color: "#666666"
    },
    touch: {
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start"
    },
    row2: {
        marginLeft: 12,
        marginTop: 5,
        marginRight: 15,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    row3: {
        marginRight: 15,
        marginTop: 5,
        alignItems: "flex-end",
        paddingBottom: 10
    }
});

export default checkLeadCellStyles;
