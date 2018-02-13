import * as React from "react";
import { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions } from "react-native";
import * as Constants from "../../../lib/Constants";
const styles = StyleSheet.create({
    containerVisible: {
        flex: 1,
        alignItems: "center"
    },
    containerInvisible: {
        flex: 1,
        alignItems: "center",
        display: "none"
    },
    innerContainer: {
        alignItems: "center"
    },
    roleImg: {
        width: (Constants.SCREEN_WIDTH > 320) ? 110 : 80,
        height: (Constants.SCREEN_WIDTH > 320) ? 110 : 80
    }
});
interface Props {
    role: string;
    onPress: any;
    text: string;
    imageURL: any;
    visible: boolean;
}
class ImageButton extends React.Component<Props, any> {
    public render() {
        return (
            <View style={[this.props.visible ? styles.containerVisible : styles.containerInvisible]}>
                <TouchableOpacity onPress={this.pressEvent.bind(this)} style={styles.innerContainer}>
                    <Image style={styles.roleImg} source={this.props.imageURL} />
                    <Text style={{ fontSize: 12, color: "white", marginTop: -10 }}> {this.props.text} </Text>
                </TouchableOpacity>
            </View>
        );
    }
	private pressEvent(): void {
		this.props.onPress(this);
	}
}
export default ImageButton;
