import * as React from "react";
import { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: "center"
    }
});
interface Props {
    role: string;
    onPress: any;
    text: string;
    imageURL: any;
}
class ImageButton extends React.Component<Props, any> {
    public render() {
        return (
            <View style={[styles.container]}>
                <TouchableOpacity onPress={this.pressEvent.bind(this)} style={styles.innerContainer}>
                    <Image style={{ width: 100, height: 100 }} source={this.props.imageURL} />
                    <Text style={{ fontSize: 24 }}> {this.props.text} </Text>
                </TouchableOpacity>
            </View>
        );
    }
	private pressEvent(): void {
		this.props.onPress(this);
	}
}
export default ImageButton;
