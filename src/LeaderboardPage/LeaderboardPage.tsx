import React from 'react';
import kbWarriorsLogo from "../resources/keyboardWarriorWhite.png";
import { Leaderboard } from '../components/Leaderboard/Leaderboard';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

import logo from "../resources/keyboardWarriors.png";

import './LeaderboardPage.css';

export class LeaderboardPage extends React.Component {
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
          <div className="leaderboard-page-content">
            <Image className="background-logo" src={logo} alt="A black and orange helmet" />
            <Leaderboard/>
          </div>
        </div>  
      );
    }
  }