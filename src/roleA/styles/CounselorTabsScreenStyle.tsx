import { StyleSheet, Dimensions } from "react-native";

const counselorTabsScreenStyle = StyleSheet.create({
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
    }
});

export default counselorTabsScreenStyle;
