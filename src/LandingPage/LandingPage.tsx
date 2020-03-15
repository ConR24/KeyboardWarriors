import React from "react";
import kbWarriorsLogo from "../resources/keyboardWarriors.png";
import kbWarriorsLightLogo from "../resources/keyboardWarriorWhite.png"
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
      <Container className={"landing-container " + (this.props.dark ? "dark" : "")} tabIndex={1} aria-label="Keyboard Warriors landing page">
        <RoomModal show={this.state.show} />
        {this.props.dark ? <img className="logo" src={kbWarriorsLightLogo} alt="A white and orange helmet"/> : <img className="logo" src={kbWarriorsLogo} alt="A black and orange helmet"/>}
        <h1 className={"title" + (this.props.dark ? " dark-text" : "")} aria-label="Keyboard Warriors">Keyboard Warriors</h1>
        <Row className="justify-content-md-center button-row">
          <Col xs={3} lg={2}>
            <Button className="fight-button landing-button" variant="primary" aria-label="Fight" onClick={() => {this.setState({show: true})}}>
                Fight!
            </Button>
          </Col>
          <Col xs={{span: 3, offset: 1}} lg={{span: 2, offset: 1}}>
            <Link to="/leaderboard" tabIndex={-1}>
              <Button className="leaderboard-button landing-button" variant="primary" aria-label="Leader board">
                Leaderboard
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}
