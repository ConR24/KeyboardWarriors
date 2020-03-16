import React from 'react';
import kbWarriorsLogo from "../resources/keyboardWarriorWhite.png";
import {Link} from 'react-router-dom';
import {createRoom} from '../scripts/socket';
import Alert from 'react-bootstrap/Alert';

import './CreateRoomPage.css';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export interface CreateRoomPageProps {
  dark: boolean;
}

export interface CreateRoomPageState {
  room: string;
  user: string;
  error: string;
  success: string;
}

export class CreateRoomPage extends React.Component<CreateRoomPageProps, CreateRoomPageState> {
    constructor(props: CreateRoomPageProps) {
      super(props);

      this.state = {
        room: "",
        user: "",
        error: "",
        success: ""
      };

      this.changeUsername = this.changeUsername.bind(this);
      this.changeRoom = this.changeRoom.bind(this);
    }

    changeUsername(e: React.FormEvent<HTMLInputElement>) {
      this.setState({user: e.currentTarget.value});
    }

    changeRoom(e: React.FormEvent<HTMLInputElement>) {
      this.setState({room: e.currentTarget.value});
    }

    // show waiting modal
    toWaiting() {
      this.setState({success: "Created the room!"});
      setTimeout(() => { this.setState({success: ""}); }, 5000);

      console.log(this.state.room);
      console.log(this.state.user);
    }

    // send to fight page after storing info ab room and username
    toFight() {

    }

    err(err: string) {
      // show room is full
      this.setState({error: err});
      setTimeout(() => { this.setState({error: ""}); }, 5000);
    }

    render() {
      return (
        <div>
          <div className="leaderboard-page-header">
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href={process.env.PUBLIC_URL}>
                <img
                  alt="Keyboard Warriors"
                  src={kbWarriorsLogo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                Keyboard Warriors
              </Navbar.Brand>
            </Navbar>
          </div>
          <div className="join-page-content">
            {this.state.error ? <Alert variant="warning" className="error"><Alert.Heading>Error!</Alert.Heading>{this.state.error}</Alert> : ""}
            {this.state.success ? <Alert variant="success" className="success"><Alert.Heading>Success!</Alert.Heading>{this.state.success}</Alert> : ""}

            <Form>
            <h1>Create A Room</h1>
              <Form.Group controlId="formRoomCode">
                <Form.Label>Room Code</Form.Label>
                <Form.Control placeholder="Enter Room Code" onChange={this.changeRoom}/>
              </Form.Group>

              <Row className="buttons">
                <Link to="/">
                  <Button variant="danger">Go Back</Button>
                </Link>
                <Button variant="success" onClick={() => { createRoom(this.state.room, () => this.toWaiting(), (err: string) => this.err(err))}}>Create</Button>
              </Row>

            </Form>
          </div>
        </div>
      );
    }
  }