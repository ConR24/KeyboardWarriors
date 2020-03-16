import React from 'react';
import Modal from 'react-bootstrap/Modal';
import "./FinishModal.css";

export interface WaitProps {
    show: boolean;
}

//TODO: update to include room code

export class WaitModal extends React.Component<WaitProps> {
    render() {
        return (
            <Modal show={this.props.show}>
                <h1>Waiting</h1>
                <p>Waiting for opponent to join</p>
            </Modal>
        );
    }
}