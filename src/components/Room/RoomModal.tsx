import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./RoomModal.css";
import logo from "../../resources/keyboardWarriors.png";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export interface RoomState{
    join: boolean;
    make: boolean;
}

export class RoomModal extends React.Component<RoomState> {
    constructor(props: any){
        super(props);

        this.state = {
            join: false,
            create: false
        };
    }

    handleJoinRequest(e: any){
        this.setState({
            join: true,
            create: false
        });
    }

    handleCreateRequest(e: any){
        this.setState({
            make: true,
            create: false
        });
    }

    render(){
        return(
            <Modal show={true}>
                <Modal.Body>
                    <img className="keyboard-logo"
                        alt="Keyboard Warriors Logo."
                        src={logo}
                    ></img>
                    <h1 className="keyboard-warriors">Keyboard Warriors</h1>
                    <Row className="room-selection">
                        <Col xs={6}>
                            <Link to="/join_room">
                                <Button variant="primary" className="join-room-button" onChange={(e: any) => this.handleJoinRequest(e)}>Join Room</Button>
                            </Link>
                        </Col>
                        <Col xs={6}>
                            <Link to="/create_room">
                                <Button variant="primary" className="create-room-button" onChange={(e: any) => this.handleCreateRequest(e)}>Create Room</Button>
                            </Link>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}