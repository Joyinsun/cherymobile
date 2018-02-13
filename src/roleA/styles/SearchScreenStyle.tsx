import { StyleSheet, Dimensions } from "react-native";

const searchScreenStyle = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column"
    },
    listContainer: {
        backgroundColor: "#fff"
    },
    noDataContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        justifyContent: "space-around",
        backgroundColor: "white",
        padding: 10,
        alignItems: "flex-start",
        flexDirection: "row"
    },
    searchInput: {
        flex: 4,
        height: 40,
        borderWidth: 1,
        marginLeft: 10,
        paddingLeft: 10,
        borderColor: "#ccc",
        borderRadius: 4,
        textDecorationLine: "none",
        backgroundColor: "lightgray",
    },
    cancelButton: {
        flex: 1,
        padding: 10,
        fontSize: 16
    },
    line: {
        height: 2,
        backgroundColor: "lightgray",
        width: "100%"
    }
});

export default searchScreenStyle;
