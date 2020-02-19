import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./FinishModal.css";
import good from "../../resources/goodJob.png";
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
        
    }

    handleFormChange(e: any){
        this.setState({
            name: e.target.value,
        });
    };
    
    render(){
        const {name} = this.state;

        return(
            <Modal show={true}>
                <Modal.Body>
                    <img className="finish"
                        alt="Try harder."
                        src={bad}                    
                    ></img>
                    <h1 className="try-harder">Try Harder.</h1>
                    <Row className="results">
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
                            <Link to="/leaderboard">
                                <Button variant="primary" className="submit-button">Ok</Button>
                            </Link>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}