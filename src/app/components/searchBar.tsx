import * as React from "react";
import { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Constants from "../../lib/Constants";
interface Props {
    onClick: any;
}

interface State {

}

class SearchBar extends Component<Props, State> {
    public render(): JSX.Element {
        return (<TouchableOpacity
            style={styles.container}
            onPress={(oEvent) => { this.props.onClick(oEvent); }}>
            <View style={styles.bar}>
                <Image
                    style={styles.searchIcon}
                    source={require("../../../img/search.png")}
                />
                <Text style={styles.searchText}>搜索</Text>
            </View>
        </TouchableOpacity>);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constants.COLOR.BG_GREY,
        width: Constants.SCREEN_WIDTH,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    bar: {
        height: 33,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
    },
    searchIcon: {
        height: 24,
        width: 24
    },
    searchText: {
        color: Constants.COLOR.GREY_999,
        fontSize: 14
    }
});

export default SearchBar;
