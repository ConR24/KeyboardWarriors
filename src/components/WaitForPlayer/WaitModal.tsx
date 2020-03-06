import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./FinishModal.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export interface WaitProps {
    show: boolean;
}

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