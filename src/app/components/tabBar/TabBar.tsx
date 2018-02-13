import * as React from "react";
import { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableHighlight, Dimensions, } from "react-native";
import styles from "./styles";

interface Props {
    style: any;
    defaultPage: number;
    navFontSize: number;
    navTextColor: string;
    navTextColorSelected: string;
    onItemSelected: any;
    badgeStyle?: any;
    children: any;
    point?: any;
}

interface State {
    selectedIndex: number;
}
export default class TabBar extends Component<Props, State> {
    /*static defaultProps = {
        defaultPage: 0,
        navFontSize: 14,
        navTextColor: "black",
        navTextColorSelected: "#FF9100",
    };*/

    public state: State = {
        selectedIndex: this.props.defaultPage
    };

    public render(): JSX.Element {
        let children = this.props.children;
        if (!children.length) {
            throw new Error("at least two child component are needed.");
        }

        //Tab按钮组
        let centerIndex;
        let navs = [];
        let contentViews = [];
        children.forEach(
            (child, i) => {
                navs[i] = this.renderTab(child, i);
                contentViews[i] = this.renderContent(child, i);
                if (child.props.center) {
                    centerIndex = i;
                }
            }
        );

        let centerItem = null;
        if (centerIndex) {
            centerItem = this.renderCenterButton(children[centerIndex], centerIndex);
        }
        return (
            <View style={ [styles.container, this.props.style] }>
              <View style={ styles.content }>
                { contentViews }
              </View>
              <View style={styles.navContainer}>
                  <View style={styles.horizonLine} />
                  <View style={ styles.nav }>
                    { navs }
                  </View>
                  {centerItem}
              </View>
            </View>
        );
    }

    private renderTab(child: any, i: number): JSX.Element {
        const imgSrc = this.state.selectedIndex == i ? child.props.selectedIcon : child.props.icon;
        const color = this.state.selectedIndex == i ? this.props.navTextColorSelected : this.props.navTextColor;
        return (<TouchableHighlight
            key={i}
            underlayColor={"transparent"}
            style={styles.navItem}
            onPress={() => {
                this.itemOnPress(i, child.props.onPress);
            }}>
            <View style={styles.center}>
                <Image
                    style={[styles.navImage, this.stressPoint(child) ? styles.navImageChange : undefined]}
                    resizeMode="cover"
                    source={imgSrc} />
                <Text style={[styles.navText, { color: color, fontSize: this.props.navFontSize }, this.stressPoint(child) ? styles.navTextChange : ""]}>
                    {child.props.title}
                </Text>
                {this.getBadge(child)}
            </View>
        </TouchableHighlight>);
    }

    private renderCenterButton(child: any, i: number) {
        const imgSrc = this.state.selectedIndex == i ? child.props.selectedIcon : child.props.icon;
        return (<TouchableHighlight
            key={i}
            underlayColor={"transparent"}
            style={styles.navCenterItem}
            onPress={() => {
                this.itemOnPress(i, child.props.onPress);
            }}>
            <View style={styles.center}>
                <Image
                    style={styles.navCenterImage}
                    resizeMode="cover"
                    source={imgSrc} />
            </View>
        </TouchableHighlight>);
    }

    private renderContent(child: any, i: number): JSX.Element {
        const style = this.state.selectedIndex === i ? styles.base : [styles.base, styles.gone];
        return <View
            key={"view_" + i}
            style={style}>
            {child}
        </View>;
    }

    private getBadge(child): JSX.Element {
        let value = 0;
        if (typeof child.props.badge == "number") {
            value = child.props.badge;
        }

        if (child.props.badge || value != 0) {
            const _badgeStyle = (typeof child.props.badge == "number") ? styles.badgeWithNumber : styles.badgeNoNumber;

            let valueStr = null;
            if (value > 99) {
                valueStr = 99;
            } else {
                valueStr = child.props.badge;
            }

            return (
                <View style={[_badgeStyle, this.props.badgeStyle]}>
                    <Text style={styles.badgeText}>
                        {valueStr}
                    </Text>
                </View>
            );
        }
    }

    private itemOnPress(index: number, onPress: any) {
        if (onPress) {
            onPress();
        }

        //如果是中间按钮，不用update页面
        let children = this.props.children;
        if (!(children[index].props.center)) {
            this.setState({
                selectedIndex: index,
            });

            if (this.props.onItemSelected) {
                this.props.onItemSelected(index);
            }
        }
    }
    //放大按钮
    private stressPoint(child): number {
        return child.props.point;
    }
}
