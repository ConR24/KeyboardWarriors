import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./FinishModal.css";
import bad from "../../resources/badJob.png";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export interface FinishProps{
    speed: number;
    time: string;
}

export interface FinishState{
    name: string;
}

export class FinishModal extends React.Component<FinishProps,FinishState> {
    constructor(props: FinishProps){
        super(props);

        this.state = {
            name: ""
        };
        
        this.sendStats = this.sendStats.bind(this);
    }

    handleFormChange(e: any){
        let playerName: string = e.target.value;
        this.setState({
            name: playerName.substring(0,3).toUpperCase(),
        });
    };

    sendStats() {
        const params: RequestInit = {
            method: "post",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                "name": this.state.name,
                "speed": this.props.speed,
                "date string": new Date().toLocaleDateString("en-US")
            })
        }

        fetch("/player", params);
    }
    
    render(){
        return(
            <Modal show={true}>
                <Modal.Body>
                    <img className="finish"
                        alt="Try harder."
                        src={bad}
                    ></img>
                    <h1 className="try-harder" tabIndex={1}>Try Harder.</h1>
                    <Row className="results"  tabIndex={1} aria-label={"Speed: " + this.props.speed + "characters per second. Time: " + this.props.time}>
                        <Col xs={6}>
                            <h4 className="result-column"><b>Speed:</b> {`${this.props.speed} char/sec`}</h4>
                        </Col>
                        <Col xs={6}>
                            <h4 className="result-column"><b>Time:</b> {this.props.time}</h4>
                        </Col>
                    </Row>
                    <Row className="results">
                        <Col xs={6}>
                            <Form.Control placeholder="Name" onChange={(e: any) => this.handleFormChange(e)} value={this.state.name} />
                        </Col>
                        <Col xs={6}>
                            <Link to="/leaderboard" tabIndex={-1}>
                                <Button onClick={this.sendStats} variant="primary" className="submit-button">Ok</Button>
                            </Link>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}