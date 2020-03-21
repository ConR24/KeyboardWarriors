import React from 'react';
import Modal from 'react-bootstrap/Modal';
import "./WaitModal.css";
import { leaveRoom } from "../../scripts/socket";

import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export interface WaitProps {
    show: boolean;
    roomCode: string;
}

export default class WaitModal extends React.Component<WaitProps> {
    render() {
        return (
            <Modal className="wait" show={this.props.show}>
                <h1>Waiting</h1>
                <p>Your room code is:</p>
                <b>{this.props.roomCode}</b>
                <p>Waiting for opponent to join</p>
                <Link to="/" onClick={() => { leaveRoom(this.props.roomCode); }}>
                  <Button variant="danger">Go Back</Button>
                </Link>
            </Modal>
        );
    }
}