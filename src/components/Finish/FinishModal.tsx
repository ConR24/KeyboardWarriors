import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./FinishModal.css";
import good from "../../resources/goodJob.png";
import bad from "../../resources/badJob.png";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

export interface FinishProps{
    active: boolean;
    speed: number;
    time: number;
}

export interface FinishState{
    active: boolean;
    name: string;
}

export class FinishModal extends React.Component<FinishProps,FinishState> {
    constructor(props: FinishProps){
        super(props);

        this.state = {
            active: props.active,
            name: ""
        };
        
    }

    handleFormChange(e: any){
        this.setState({
            name: e.target.value,
        });
    };

    handleSubmit(e: any){
        this.setState({
            active: false
        })
    }

    convertToMMSS(seconds: number): string{
        let hours = Math.floor(seconds / 3600);
        seconds = seconds % 3600;
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return hours+":"+minutes+":"+seconds;
    }
    
    render(){
        const {active, name} = this.state;

        return(
            <Modal show={active}>
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
                            <h4 className="result-column"><b>Time:</b> {this.convertToMMSS(this.props.time)}</h4>
                        </Col>
                    </Row>
                    <Row className="results">
                        <Col xs={6}>
                            <Form.Control placeholder="Name" onChange={(e: any) => this.handleFormChange(e)} value={this.state.name} />
                        </Col>
                        <Col xs={6}>
                            <Button variant="primary" onClick={(e: any) => this.handleSubmit(e)}className="submit-button">Ok</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}