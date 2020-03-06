import React from "react";
import kbWarriorsLogo from "../resources/keyboardWarriors.png";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from 'react-router-dom';
import "./index.css";

import {RoomModal} from "../components/Room/RoomModal";

export interface LandingPageState{
  show: boolean;
}

export interface LandingPageProps{}

export class LandingPage extends React.Component<LandingPageProps, LandingPageState> {
  constructor(props: LandingPageProps){
    super(props);

    this.state = {
        show: false
    };
}

  componentDidMount() {
    document.title = "Keyboard Warriors";
  }

  render() {
    return (
      <Container className="landing-container">
        <RoomModal show={this.state.show} />
        <img className="logo" src={kbWarriorsLogo} alt="A black and orange helmet"/>
        <h1 className="title">Keyboard Warriors</h1>
        <Row className="justify-content-md-center button-row">
          <Col xs={3} lg={2}>
            <Button className="fight-button landing-button" variant="primary" onClick={() => {this.setState({show: true})}}>
              Fight!
            </Button>
          </Col>
          <Col xs={{span: 3, offset: 1}} lg={{span: 2, offset: 1}}>
            <Link to="/leaderboard">
              <Button className="leaderboard-button landing-button" variant="primary">
                Leaderboard
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}
