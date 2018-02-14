import * as React from "react";
import { Component } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
} from "react-native";
import styles from "./dashlineStyle";

interface Props {
    style?: any;
    visible?: boolean;
    isTitle?: boolean;
    height?: any;
}

export default class DashLine extends Component<Props, any> {
    public render() {
        var len = this.props.height / 4;
        var arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(i);
        }
        // return (<View style={[styles.titleHeaderIcon,{height:this.props.height}]}>
        //         <View style={[this.props.visible===false?styles.dashLineInvisible:styles.dashLine]}>
        //             {
        //                 arr.map((item, index)=>{
        //                     return <View style={styles.dashItem} key={'dash'+index} />
        //                 })
        //             }
        //         </View>
        //     </View>);
        return(<View style = {[styles.titleHeaderIcon, this.props.style]}>
            <View style={[this.props.visible === false ? styles.dashLineInvisible : styles.fullLine]} />
        </View>);
    }
}
