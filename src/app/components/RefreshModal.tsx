import * as React from "react";
import { Component } from "react";
import { ActivityIndicator, Modal } from "react-native";
import globalStyles from "../../app/styles/GlobalStyle";

interface Props {
    visible: boolean;
}

interface State {
    modalVisible: boolean;
}

class RefreshModal extends Component<Props, State> {
    public state: State = {
        modalVisible: this.props.visible
    };
    constructor(props) {
        super(props);
    }

    public componentWillReceiveProps(newProps: Props): void {
        this.setState({ modalVisible: newProps.visible });
    }

    public closeModal() : void {
        this.setState({ modalVisible: true });
    }

    public render(): JSX.Element {
        return <Modal visible={this.state.modalVisible} transparent={true} animationType="none" onRequestClose={() => this.closeModal()}>
            <ActivityIndicator
                animating={this.state.modalVisible}
                style={globalStyles.refreshIndicator}
                size="large"
            />
        </Modal>;
    }
}

export default RefreshModal;
