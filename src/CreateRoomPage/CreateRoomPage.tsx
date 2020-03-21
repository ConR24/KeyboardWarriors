import React from 'react';
import {Redirect} from 'react-router';
import kbWarriorsLogo from "../resources/keyboardWarriorWhite.png";
import {createRoom} from '../scripts/socket';
import WaitModal from "../components/WaitForPlayer/WaitModal";

import './CreateRoomPage.css';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';

export interface CreateRoomPageProps {
  dark: boolean;
}

export interface CreateRoomPageState {
  room: string;
  redirect: boolean;
}

export class CreateRoomPage extends React.Component<CreateRoomPageProps, CreateRoomPageState> {
    constructor(props: CreateRoomPageProps) {
      super(props);

      this.state = {
        room: "",
        redirect: false
      };

      this.makeRoom = this.makeRoom.bind(this);
    }

    componentDidMount() {
      this.makeRoom();
    }

    // create a room code
    makeRoom() {
      // create random code
      let roomCode = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      for(let i = 0; i < 5; i++) {
        roomCode += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      //try code
      createRoom(roomCode, () => {
        //opponent joined
        this.setState({redirect: true})
      }, () => {this.setState({room: roomCode});}, this.makeRoom);
    }

    // send to fight page after storing info ab room and username
    toFight() {

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
            <Form>
              <h1>Create A Room</h1>
              <WaitModal show={true} roomCode={this.state.room}/>
            </Form>
          </div>
        </div>
      );
    }
  }