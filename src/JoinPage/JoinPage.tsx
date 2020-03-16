import React from 'react';
import kbWarriorsLogo from "../resources/keyboardWarriorWhite.png";
import logo from "../resources/keyboardWarriors.png";
import {Link} from 'react-router-dom';
import {joinRoom} from '../scripts/socket';

import './JoinPage.css';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export interface JoinPageProps {
  dark: boolean;
}

export interface JoinPageState {
  room: string;
  user: string;
  error: string;
}

export class JoinPage extends React.Component<JoinPageProps, JoinPageState> {
    constructor(props: JoinPageProps) {
      super(props);

      this.state = {
        room: "",
        user: "",
        error: ""
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

    // send to waiting page after storing info ab room and username
    toWaiting() {
      console.log(this.state.room);
      console.log(this.state.user);
    }

    err() {
      // show room is full
      this.setState({error: "The selected room is full."});
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
            {this.state.error ? <div className="error">{this.state.error}</div> : ""}
            <Form>
            <h1>Join A Room</h1>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter Username" onChange={this.changeUsername}/>
              </Form.Group>

              <Form.Group controlId="formRoomCode">
                <Form.Label>Room Code</Form.Label>
                <Form.Control placeholder="Enter Room Code" onChange={this.changeRoom}/>
              </Form.Group>

              <Row className="buttons">
                <Link to="/">
                  <Button variant="danger">Go Back</Button>
                </Link>
                <Button variant="success" onClick={() => { joinRoom(this.state.room, this.toWaiting, this.err); }}>Join</Button>
              </Row>

            </Form>
          </div>
        </div>  
      );
    }
  }