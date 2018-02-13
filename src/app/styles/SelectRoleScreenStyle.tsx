import { StyleSheet, Dimensions, Platform } from "react-native";
import * as Constants from "../../lib/Constants";

const selectRoleScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    headerBar: {
        flex: 1,
        backgroundColor: "transparent",
        position: "absolute",
        top: (Platform.OS === "ios") ? 20 : 0,
        alignItems: "center",
        justifyContent: "center",
        width: Constants.SCREEN_WIDTH,
        height: 44
    },
    btnContainer: {
        backgroundColor: "transparent",
        position: "absolute",
        top: (Constants.SCREEN_WIDTH < 350) ? 350 : 460,
        width: Constants.SCREEN_WIDTH,
        paddingLeft: 25,
        paddingRight: 25,
        flex: 1,
        justifyContent: "space-between",
        flexWrap: "wrap",
        flexDirection: "row"
    },
    bg: {
        width: Constants.SCREEN_WIDTH,
        height: Constants.SCREEN_HEIGHT
    },
    content: {
        flex: 1
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: "center"
    }
});

export default selectRoleScreenStyle;
