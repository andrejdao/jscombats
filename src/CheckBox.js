import React, { Component } from 'react';
import './CheckBox.css';

class CheckBox extends Component {
    render() {
        return (
            <div className='control-container'>{this.props.text.map((text, index) => <label
                    key={`input-${index}`}>
                    <input
                        type="checkbox"
                        checked={index === this.props.curIndex}
                        onChange={() => this.props.onControlClick(index)}
                    />
                    {text}
                </label>
            )}</div>
        )
    }
}

export default CheckBox;