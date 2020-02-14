import React from 'react';
import kbWarriorsLogo from "../resources/keyboardWarriorWhite.png";
import { Leaderboard } from '../components/Leaderboard/Leaderboard';
import Navbar from 'react-bootstrap/Navbar';
import './LeaderboardPage.css';

export class LeaderboardPage extends React.Component {
    render() {
      return (
        <div>
          <div className="leaderboard-page-header">
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/">
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
            <Leaderboard/>
          </div>
        </div>  
      );
    }
  }