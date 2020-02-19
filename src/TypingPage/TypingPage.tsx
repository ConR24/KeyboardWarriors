import React from "react";
import Insult, {InsultState} from "../components/Insult/Insult";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Timer from "../components/Timer/Timer";
import { FinishModal } from "../components/Finish/FinishModal";

import logo from "../resources/keyboardWarriorWhite.png";

import "./typingPage.css";

export interface TypingProps {
    insults: string[];
}

export interface TypingState {
    currentInsult: number;
    typedText: string;
    isFinished: boolean;
}

// game page where players type insults as quickly as possible
class TypingPage extends React.Component<TypingProps, TypingState> {
    _timer: React.RefObject<Timer>;

    constructor(props: TypingProps) {
        super(props);

        this.state = {
            currentInsult: 0,
            typedText: "",
            isFinished: false
        };

        this._timer = React.createRef();
        this.textChanged = this.textChanged.bind(this);
    }

    // handles change of text in text box
    textChanged(e: React.FormEvent<HTMLInputElement>) {
        const currentText = e.currentTarget.value;
        const {currentInsult} = this.state;

        this.setState({typedText: currentText});

        // determine if insult is complete
        if(currentText === this.props.insults[currentInsult]) {
            this.setState({
                currentInsult: currentInsult + 1,
                typedText: ""
            });

            // stop timer if the last insult was completed
            if(this.props.insults.length === currentInsult + 1) {
                this._timer.current!.stop();
                this.setState({
                    isFinished: true,
                });
            }
        }
    }

    render() {
        const {currentInsult, typedText} = this.state;
        
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href={process.env.PUBLIC_URL}>
                        <img
                            alt="Keyboard Warriors"
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Keyboard Warriors
                    </Navbar.Brand>
                </Navbar>
                {/* Calculate typing speed by joining array into string and dividing it by time */}
                {this.state.isFinished && <FinishModal time={this._timer.current!.getTime()} speed={Number((this.props.insults.join().length / this._timer.current!.getTime()).toFixed(2))} />}
                <Container className="typing-container">
                    <Timer ref={this._timer}/>
                    {this.props.insults.map((insult, index) => {
                        let state = (index < currentInsult ? InsultState.COMPLETE 
                            : (index === currentInsult ? InsultState.CURRENT : InsultState.UPCOMING));
                        return <Insult key={insult} text={insult} state={state} typedText={typedText} />
                    })}
                    <Row className="justify-content-md-center input-box">
                        <input onChange={this.textChanged} value={typedText} />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default TypingPage;
