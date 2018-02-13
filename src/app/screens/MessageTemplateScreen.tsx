import * as React from "react";
import { Component } from "react";
import { View, ScrollView, Text, Linking, Switch, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import CheckBox from "../../app/components/CheckBox";
import RefreshModal from "../../app/components/RefreshModal";
import Communications from "react-native-communications";
import { connect, Dispatch } from "react-redux";
import globalStyles from "../../app/styles/GlobalStyle";
import messageTemplateScreenStyle from "../../app/styles/MessageTemplateScreenStyle";

import { fetchMessageTemplate, saveMessageTemplate } from "../reducers/message/actions";
import _ from "lodash";

interface Props {
  list: {
      data: any,
      refresh: boolean
   };
  message: any;
  dispatch: Dispatch<any>;
  phone: string;
  navigator: any;
  onSendComplete: any;
  fetchMessageTemplate(navigator: any, refresh: boolean): void;
  saveMessageTemplate(template: any, navigator: any, refresh: boolean);
}

interface State {
  data: any;
  message: string;
  selectIndex: number;
  refresh: boolean;
}
class MessageTemplateScreen extends React.Component<Props, State> {
   public static navigatorButtons = {
      rightButtons: [
        {
          title: "发送",
          id: "sendMessage"
        }
      ]
    };

   public state: State = {
        refresh: this.props.list.refresh,
        message: "",
        selectIndex: 0,
        data: this.props.list.data || []
    };

   public constructor(props) {
     super(props);
     this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
   }

  public componentWillReceiveProps(newProps: Props): void {
    let newLead = newProps.list;
    if (newProps.message) {
      this.props.navigator.showInAppNotification({
        screen: "app.NotificationScreen",
        passProps: {
          content: newProps.message.statusText || "request failed...404 "
        },
        autoDismissTimerSec: 2
      });
      this.setState({
        refresh: false
      });
    } else {
      this.setState({
        data: newLead.data || [],
        refresh: newLead.refresh
      });
    }
  }

   public componentDidMount() {
     this.props.fetchMessageTemplate(this.props.navigator, true);
   }

   public render() : JSX.Element {
     return (
         <ScrollView style={[globalStyles.container, messageTemplateScreenStyle.container]}>
                  { this.state.data.map((item, index ) => {
               return <View key={index} style={messageTemplateScreenStyle.listItemView}>
                        <View style={ messageTemplateScreenStyle.listItemContainer}>
                         <Text style={messageTemplateScreenStyle.titleStyle}>{item.tag}</Text>
                         <CheckBox checked={index === this.state.selectIndex} onClick={(oEvent) => this.onClick(oEvent, index)} />
                        </View>
                         <View style={[globalStyles.line, { marginTop: 10, marginBottom: 10 }]} />
                         <TextInput
                               style={messageTemplateScreenStyle.textInput}
                               multiline = { true }
                               numberOfLines = { 4 }
                               value={ item.content }
                               underlineColorAndroid= "transparent"
                               editable = { true }
                               maxLength = { 200 }
                               onChangeText={(text) => this.onChangeText(text, index)}
                           />
                    </View>;
                  })}
                 <RefreshModal visible={this.state.refresh} />
         </ScrollView>
          );
}

  private onClick(oEvent: any, index: number): void {
    if (index !== this.state.selectIndex) {
      this.setState({ selectIndex: index });
    }
  }

  private onChangeText(text, index: number): void {
      let data =  JSON.parse(JSON.stringify(this.state.data));
      data[index].content = text;
      console.log(data);
      this.setState({ data: data });
  }

  private onNavigatorEvent(event): void {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "sendMessage") {
        //save message
        Communications.textWithoutEncoding(this.props.phone, this.state.data[this.state.selectIndex].content);
        this.saveMessage();
        this.props.onSendComplete();
      }
    }
  }

  private saveMessage() {
    var data = this.props.list.data;
    let needUpdateData = [];
    this.state.data.forEach(function(item, index) {
      if (item.content !== data[index].content) {
        needUpdateData.push(item);
      }
    });
    if (needUpdateData.length > 0) {
      this.props.saveMessageTemplate(needUpdateData, this.props.navigator, true);
    }
  }
}

function mapStateToProps(state: any) {
    return {
      list: state.messageTemplate,
      message: state.app.requestError
    };
}

function mapDispatchToProps(dispatch: any): any {
    return {
        fetchMessageTemplate: (navigator: any, refresh: boolean) => {
           dispatch(fetchMessageTemplate(navigator, refresh));
        },
        saveMessageTemplate: (template: any, navigator: any, refresh: boolean) => {
           dispatch(saveMessageTemplate(template, navigator, refresh));
        },
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageTemplateScreen);
