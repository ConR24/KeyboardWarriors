import React from "react";
import Insult, {InsultState} from "../components/Insult/Insult";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Timer from "../components/Timer/Timer";
import { FinishModal } from "../components/Finish/FinishModal";
import {sendInsult, listenForInsults} from "../scripts/socket";
import { InsultsBox } from "../components/InsultsBox/InsultsBox";

import logo from "../resources/keyboardWarriorWhite.png";

import "./typingPage.css";

export interface TypingProps {
    insults: string[];
    dark: boolean;
}

export interface TypingState {
    currentInsult: number;
    typedText: string;
    isFinished: boolean;
    insult: String;
}

// game page where players type insults as quickly as possible
class TypingPage extends React.Component<TypingProps, TypingState> {
    _timer: React.RefObject<Timer>;

    constructor(props: TypingProps) {
        super(props);

        this.state = {
            currentInsult: 0,
            typedText: "",
            isFinished: false,
            insult: ""
        };

        this._timer = React.createRef();
        this.textChanged = this.textChanged.bind(this);
        this.onReceiveInsult = this.onReceiveInsult.bind(this);

        //setup insult callback
        listenForInsults(this.onReceiveInsult);
    }

    // handles change of text in text box
    textChanged(e: React.FormEvent<HTMLInputElement>) {
        const currentText = e.currentTarget.value;
        const {currentInsult} = this.state;

        this.setState({typedText: currentText});

        // determine if insult is complete
        if(currentText === this.props.insults[currentInsult]) {
            sendInsult("1234", this.props.insults[currentInsult]); // TODO: update when room number is stored
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

    handleCopyAndPaste(e: React.ClipboardEvent<HTMLInputElement>): void {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
    }

    onReceiveInsult(insult:String) {
        this.setState({insult: insult});
        setTimeout(() => { this.setState({insult: ""}); }, 5000);
    }

    render() {
        const {currentInsult, typedText} = this.state;
        
        return (
            <div>
                <Navbar bg="dark" variant="dark" tabIndex={-1}>
                    <Navbar.Brand href={process.env.PUBLIC_URL} tabIndex={1} aria-label="Back to home page">
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
                {this.state.isFinished && <FinishModal 
                    time={this._timer.current!.getTimeString()}
                    dark={this.props.dark}
                    speed={Number((this.props.insults.join().length / (this._timer.current!.getTime() / 100)).toFixed(2))} 
                />}
                <Container className="typing-container">
                    <Timer dark={this.props.dark} ref={this._timer}/>
                    <InsultsBox show={this.state.insult !== ""} name="Opponent" insult={this.state.insult} />
                    {this.props.insults.map((insult, index) => {
                        let state = (index < currentInsult ? InsultState.COMPLETE 
                            : (index === currentInsult ? InsultState.CURRENT : InsultState.UPCOMING));
                        return <Insult key={insult} text={insult} state={state} typedText={typedText}/>
                    })}
                    <Row className="justify-content-md-center input-box" tabIndex={-1}>
                        <input
                            autoFocus
                            className={this.props.dark ? "dark-input" : ""}
                            onChange={this.textChanged}
                            value={typedText}
                            onCopy={this.handleCopyAndPaste} 
                            onPaste={this.handleCopyAndPaste}
                            aria-label={this.props.insults.toString()}
                            tabIndex={1}
                        />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default TypingPage;
