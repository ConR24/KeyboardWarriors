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
    create: boolean;
}

export interface RoomProps{
    show: boolean;
}

export class RoomModal extends React.Component<RoomProps, RoomState> {
    constructor(props: RoomProps){
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
            create: true,
            join: false
        });
    }
    

    render(){
        return(
            <Modal show={this.props.show}>
                <Modal.Body>
                    <img className="keyboard-logo"
                        alt="Keyboard Warriors Logo."
                        src={logo}
                    ></img>
                    <h1 className="keyboard-warriors">Keyboard Warriors</h1>
                    <Row className="room-selection">
                        <Col className="join-container" xs={{span: 4, offset: 3}}>
                            <Link to="/join">
                                <Button variant="primary" className="join-room-button" onChange={(e: any) => this.handleJoinRequest(e)}>Join Room</Button>
                            </Link>
                        </Col>
                        <Col className="create-container" xs={{span: 5, offset: 0}} >
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