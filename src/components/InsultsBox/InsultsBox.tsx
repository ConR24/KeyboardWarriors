import React from 'react';
import './InsultsBox.css';

export interface InsultsProps {
    name: String;
    insult: String;
    show: boolean;
}

export class InsultsBox extends React.Component<InsultsProps> {
    render() {
      const show:boolean = this.props.show;
      return (
        <div className={"insults-box " + (show ? "show" : "")}>
            {this.props.show ? (
                <div className="insults-box-content">
                    <h4>{ this.props.name } says:</h4>
                    <p>{ this.props.insult }</p>
                </div> )   
            : (<></>) }
        </div>
    );
    }
}

export default InsultsBox;