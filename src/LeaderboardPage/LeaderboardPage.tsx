import React from 'react';
import kbWarriorsLogo from "../resources/keyboardWarriors.png";
import kbWarriorsLightLogo from "../resources/keyboardWarriorWhite.png"
import { Leaderboard } from '../components/Leaderboard/Leaderboard';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

import './LeaderboardPage.css';

export interface LeaderboardProps {
  dark: boolean;
}
export class LeaderboardPage extends React.Component<LeaderboardProps> {
    componentWillUpdate(prevProps: any, prevState: any, snapshot: any){
      if(this.props.dark !== prevProps.dark){
        this.forceUpdate();
      }
    }

    render() {
      return (
        <div className={this.props.dark ? "dark" : ""}>
          <Navbar bg="dark" variant="dark" tabIndex={-1}>
            <Navbar.Brand href={process.env.PUBLIC_URL} tabIndex={1} aria-label="Back to home page">
              <img
                alt="Keyboard Warriors"
                src={kbWarriorsLightLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Keyboard Warriors
            </Navbar.Brand>
          </Navbar>
          <div className="leaderboard-page-content">
            <Image className="background-logo" src={this.props.dark ? kbWarriorsLightLogo : kbWarriorsLogo} alt="A black and orange helmet" />
            <Leaderboard dark={this.props.dark}/>
          </div>
        </div>  
      );
    }
  }