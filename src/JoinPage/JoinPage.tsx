import React from 'react';
import kbWarriorsLogo from "../resources/keyboardWarriorWhite.png";
import logo from "../resources/keyboardWarriors.png";

import './JoinPage.css';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

export class JoinPage extends React.Component {
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
            <Form>
            <h1>Join A Room</h1>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter Username"/>
              </Form.Group>

              <Form.Group controlId="formRoomCode">
                <Form.Label>Room Code</Form.Label>
                <Form.Control placeholder="Enter Room Code"/>
              </Form.Group>

              <Row>
                <Button variant="danger">Go Back</Button>
                <Button variant="success">Continue</Button>
              </Row>

            </Form>
          </div>
        </div>  
      );
    }
  }