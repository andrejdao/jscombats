import React, { Component } from 'react';
import './Hero.css';

class Hero extends Component {
    render() {
        const maxHP = this.props.stats[0].value*10;
        const hpBoxStyle = {
            backgroundColor: "green",
            width: this.props.HP/maxHP*152,
            height: 22,
        }

        return (
            <div>
                <div className="hero__container">
                    {this.props.items.map((item, index) =>
                        <img className={item.zip} key={`hero-items-${index}`} src={item.src} alt={item.name}/>
                    )}
                </div>
                <div className="hero__hp-bar">HP: {this.props.HP}/{maxHP}</div>
                <div style={hpBoxStyle}></div>
                <div className="hero__stats-container">
                    {this.props.stats.map((item, index) =>
                        <div key={`hero-stats-${index}`}> {`${item.text}:${item.value}`}
                        </div>

                    )}
                </div>
            </div>
        );
    }
}

export default Hero;