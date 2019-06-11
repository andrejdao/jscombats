import React, { Component } from 'react';
import CheckBox from './CheckBox.js';
import './ControlBox.css';

const attackControlsList = ["Attack head","Attack chest","Attack stomach","Attack crotch","Attack legs"];
const defenceControlsList = ["Defend head, chest and stomach","Defend chest,stomach and crotch","Defend stomach,crotch and legs","Defend crotch, legs and head","Defend legs, head and chest"];

class ControlBox extends Component {
    buttonText = () => {
        if (this.props.gamePhase==="end") {return("The End");} else {
        if (this.props.attackIndex===null || this.props.defenceIndex===null) {return("Choose");}
        else {return("GO!!!");}}
};

    render() {
        return (
                <div className="control-box__button">
                    <div className="control-box">
                        <CheckBox curIndex={this.props.attackIndex} text={attackControlsList} onControlClick={this.props.onAttackControlClick}/>
                        <CheckBox curIndex={this.props.defenceIndex} text={defenceControlsList} onControlClick={this.props.onDefenceControlClick}/>
                    </div>
                    <button
                        key="go-button"
                        disabled={this.props.attackIndex===null || this.props.defenceIndex===null || this.props.gamePhase==="end"}
                        onClick={() => this.props.goButtonClick()}
                    >
                        {this.buttonText()}
                    </button>
                </div>
        );
    }
}

export default ControlBox;