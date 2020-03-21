import React from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import kbWarriorsLogo from "../resources/keyboardWarriorWhite.png";
import './JoinPage.css';
import WaitModal from "../components/WaitForPlayer/WaitModal";
import {joinRoom} from '../scripts/socket';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export interface JoinPageProps {
  dark: boolean;
}

export interface JoinPageState {
  room: string;
  error: string;
  wait: boolean;
  redirect: boolean;
}

export class JoinPage extends React.Component<JoinPageProps, JoinPageState> {
    constructor(props: JoinPageProps) {
      super(props);

      this.state = {
        room: "",
        wait: false,
        error: "",
        redirect: false
      };

      this.changeRoom = this.changeRoom.bind(this);
      this.waitForPlayer = this.waitForPlayer.bind(this);
    }

    changeRoom(e: React.FormEvent<HTMLInputElement>) {
      this.setState({room: e.currentTarget.value});
    }

    waitForPlayer() {
      joinRoom(this.state.room, () => { this.setState({ redirect: true }); }, 
        () => {this.setState({wait: true});}, 
        (err: string) => this.err(err));
    }

    err(err: string) {
      // show room is full
      this.setState({error: err});
      setTimeout(() => { this.setState({error: ""}); }, 5000);
    }

    render() {
      if (this.state.redirect === true) {
        return <Redirect to={"/fight/" + this.state.room} />
      }
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
            <WaitModal show={this.state.wait} roomCode={this.state.room} />
            <Form>
            <h1>Join A Room</h1>
              <Form.Group controlId="formRoomCode">
                <Form.Label>Room Code</Form.Label>
                <Form.Control placeholder="Enter Room Code" onChange={this.changeRoom}/>
              </Form.Group>

              <Row className="buttons">
                <Link to="/">
                  <Button variant="danger">Go Back</Button>
                </Link>
                <Button variant="success" onClick={() => { this.waitForPlayer(); }}>Join</Button>
              </Row>

            </Form>
          </div>
        </div>  
      );
    }
  }