import React from 'react';
import './InsultsBox.css';

export interface InsultsProps {
    name: String;
    insult: String;
}

export interface InsultsState {
    name: String;
    insult: String;
}

export class InsultsBox extends React.Component<InsultsProps, InsultsState> {
    constructor(props: InsultsProps) {
        super(props);

        this.state = {
            name: this.props.name,
            insult: this.props.insult
        };
    }

    render() {
      return (
        <div className="insults-box">
            <div className="insults-box-content">
                <h4>{ this.state.name } says:</h4>
                <p>{ this.state.insult }</p>
            </div>    
        </div>
      );
    }
}

export default InsultsBox;