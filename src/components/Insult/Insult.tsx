import React from 'react';
import "./Insult.css";

export interface InsultProps {
    text: string;
    typedText: string;
    state: InsultState;
}

// state indicating whether or not an insult has been typed yet
export enum InsultState {
    COMPLETE,
    CURRENT,
    UPCOMING 
}

// class representing an insult that a player is asked to type
class Insult extends React.Component<InsultProps, {state: InsultState}> {
    render() {
        const {state} = this.props;
        let tags = <></>;
        
        switch(state) {
            case(InsultState.COMPLETE): {
                // strikethrough
                tags = <div><s>{this.props.text}</s></div>;
                break;
            }
            case(InsultState.UPCOMING): {
                // greyed out
                tags = <div className="greyed">{this.props.text}</div>;
                break;
            }
            case(InsultState.CURRENT): {
                let strikethrough = "", error = "", i;
                let {typedText, text} = this.props;

                // loop over typed insult
                for(i = 0; i < typedText.length; i++)
                {
                    // if difference, display error character and exit loop
                    if(typedText.charAt(i) !== text.charAt(i))
                    {
                        error = text.charAt(i);
                        i++;
                        break;
                    }
                    else { // if correct, add to strikethrough
                        strikethrough += text.charAt(i);
                    }
                }

                // create tags
                tags = <div className="orngBorder">
                    <b>
                        <s>{strikethrough}</s>
                        <span className={error === ' ' ? "redSpace" : "red"}>{error}</span>
                        {text.substring(i)}
                    </b>
                </div>;
                break;
            }
        }

        return (
            <div className="insult">
                {tags}
            </div>
        );
    }
}

export default Insult;
