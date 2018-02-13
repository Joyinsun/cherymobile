import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
        overflow: "visible",
        backgroundColor: "transparent",
    },
    content: {
        flex: 1
    },
    base: {
        position: "absolute",
        overflow: "hidden",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    gone: {
        top: Dimensions.get("window").height,
        bottom: -Dimensions.get("window").height,
    },
    navContainer: {
        width: Dimensions.get("window").width,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    nav: {
        flexDirection: "row",
        width: Dimensions.get("window").width,
        height: 49,
        overflow: "visible",
        backgroundColor: "transparent",
    },
    navItem: {
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
        alignItems: "center"
    },
    navCenterItem: {
        top: -17,
        position: "absolute",
        flex: 1,
        width: 59,
        height: 59,
        alignItems: "center",
    },
    center: {
        width: 59,
        alignItems: "center",
        justifyContent: "center",
    },
    navImage: {
        width: 25,
        height: 25,
    },
    navCenterImage: {
        width: 59,
        height: 59,
        overflow: "visible"
    },
    navImageChange: {
        top: -28,
        width: 56,
        height: 56,
        marginBottom: 2,
        position: "absolute",
        borderRadius: 28,
        borderWidth: 3,
        borderColor: "#fff",
        alignSelf: "center"
    },
    navTextChange: {
        marginTop: 30,
        fontSize: 11,
        alignSelf: "center"
    },
    navText: {
        alignSelf: "center",
    },
    horizonLine: {
        backgroundColor: "#dddddd50",
        height: 2,
        opacity: 0.5,
        width: Dimensions.get("window").width,
    },
    badgeNoNumber: {
        flexDirection: "row",
        justifyContent: "center",
        top: -2,
        left: 36,
        position: "absolute",
        width: 10,
        height: 10,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: "center",
        borderColor: "#ffffff",
        backgroundColor: "#ff0000",
    },
    badgeWithNumber: {
        flexDirection: "row",
        justifyContent: "center",
        top: -4,
        left: 36,
        position: "absolute",
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ffffff",
        backgroundColor: "#ff0000",
    },
    badgeText: {
        alignSelf: "center",
        fontSize: 11,
        color: "#ffffff",
        backgroundColor: "transparent",
    },
    weight: {
        flex: 1,
    }
});
export default styles;
