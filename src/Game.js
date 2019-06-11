import React, { Component } from 'react';
import './Game.css';
import Hero from './Hero.js';
import ControlBox from './ControlBox.js';
import src from './items/logo.svg';
import empty from './items/empty.svg';
import amulet from './items/amulet.svg';
import head from './items/head.svg';
import ring from './items/ring.svg';
import shield from './items/shield.svg';
import armor from './items/armor.svg';
import sword from './items/sword.svg';
import belt from './items/belt.svg';
import boots from './items/boots.svg';
import gauntlet from './items/gauntlet.svg';

const heroItems = [
    { name: "Amulet", zip: "common" , src},
    { name: "Head", zip: "common"  , src},
    { name: "Ring", zip: "common"  , src},
    { name: "LeftHand", zip: "common"  , src: shield},
    { name: "Armor", zip: "common"  , src},
    { name: "RightHand", zip: "relict"  , src: sword},
    { name: "Belt", zip: "common"  , src},mainu.html
    { name: "Boots", zip: "common"  , src},
    { name: "Gauntlels", zip: "common"  , src},
    { name: "Item1", zip: "common"  , src: empty},
    { name: "Item2", zip: "common"  , src: empty},
    { name: "Item3", zip: "common"  , src: empty},
];
const enemyItems = [
    { name: "Amulet", zip: "common" , src: amulet},
    { name: "Head", zip: "uncommon"  , src: head},
    { name: "Ring", zip: "rare"  , src: ring},
    { name: "LeftHand", zip: "heroic"  , src: shield},
    { name: "Armor", zip: "uncommon"  , src: armor},
    { name: "RightHand", zip: "epic"  , src: sword},
    { name: "Belt", zip: "uncommon"  , src: belt},
    { name: "Boots", zip: "uncommon"  , src: boots},
    { name: "Gauntlels", zip: "legendary"  , src: gauntlet},
    { name: "Item1", zip: "common"  , src: empty},
    { name: "Item2", zip: "common"  , src: empty},
    { name: "Item3", zip: "common"  , src: empty},
];

const heroStats = [
    {text: "Endurance", value: Math.round(1 + Math.random() * 19)},
    {text: "Strength", value: Math.round(1 + Math.random() * 19)},
    {text: "Dexterity", value: Math.round(1 + Math.random() * 19)},
    {text: "Intuition", value: Math.round(1 + Math.random() * 19)},
];

const enemyStats = [
    {text: "Endurance", value: Math.round(1 + Math.random() * 19)},
    {text: "Strength", value: Math.round(1 + Math.random() * 19)},
    {text: "Dexterity", value: Math.round(1 + Math.random() * 19)},
    {text: "Intuition", value: Math.round(1 + Math.random() * 19)},
];

const bodyParts = ["head","chest","stomach","crotch","legs"];

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            heroAttackControlIndex: null,
            heroDefenceControlIndex: null,
            goButtonDisabled: true,
            heroHP: heroStats[0].value*10,
            enemyHP: enemyStats[0].value*10,
            gameLogs: "Game Start!",
            gamePhase: "start"
        };
    }

    onAttackControlClick = index => {
        this.setState({heroAttackControlIndex:index});
    };

    onDefenceControlClick = index => {
        this.setState({heroDefenceControlIndex:index});
    };

    goButtonClick = () => {
        let newHeroHP = this.state.heroHP;
        let newEnemyHP = this.state.enemyHP;
        let damageToHero = 0;
        let damageToEnemy = 0;
        let enemyAttackBox = Math.round(Math.random()*4);
        let enemyDefenceBox = Math.round(Math.random()*4);
        let currentLogs = "";
        let heroCrit = false;
        let enemyCrit = false;
        let heroDodge = false;
        let enemyDodge = false;

        if (heroStats[3].value>Math.random()*100) {heroCrit=true;}
        if (enemyStats[3].value>Math.random()*100) {enemyCrit=true;}
        if (heroStats[2].value>Math.random()*100) {heroDodge=true;}
        if (enemyStats[2].value>Math.random()*100) {enemyDodge=true;}

        if ((enemyAttackBox-this.state.heroDefenceControlIndex+4)%5%4>1) {
            if (heroDodge) {currentLogs += "Enemy attacked "+bodyParts[enemyAttackBox]+" but you dodged it.\n";} else {
            damageToHero = enemyStats[1].value;
            if (enemyCrit) {
            damageToHero*=2;
            currentLogs += "Enemy attacked "+bodyParts[enemyAttackBox]+" and dealt "+damageToHero+" damage. (Critical Hit!)\n";
            } else {currentLogs += "Enemy attacked "+bodyParts[enemyAttackBox]+" and dealt "+damageToHero+" damage.\n";}}
        } else {
            currentLogs += "Enemy attacked "+bodyParts[enemyAttackBox]+" but you blocked it.\n";
        }
        newHeroHP -= damageToHero;
        if (newHeroHP < 0) {newHeroHP = 0;}

        if ((this.state.heroAttackControlIndex-enemyDefenceBox+4)%5%4>1) {
            if (enemyDodge) {currentLogs += "You attacked "+bodyParts[this.state.heroAttackControlIndex]+" but enemy dodged it.\n";} else {
            damageToEnemy = heroStats[1].value;
            if (heroCrit) {
            damageToEnemy*=2;
            currentLogs += "You attacked "+bodyParts[this.state.heroAttackControlIndex]+" and dealt "+damageToEnemy+" damage. (Critical Hit!)\n";
            } else {currentLogs += "You attacked "+bodyParts[this.state.heroAttackControlIndex]+" and dealt "+damageToEnemy+" damage.\n";}}
        } else {
           currentLogs += "You attacked "+bodyParts[this.state.heroAttackControlIndex]+" but enemy blocked it.\n";
        }
        newEnemyHP -= damageToEnemy;
        if (newEnemyHP < 0) {newEnemyHP = 0;}

        if (newHeroHP === 0 && newEnemyHP === 0) {currentLogs += "You killed each other!\n"; this.setState({gamePhase:"end"});}
        else {
        if (newHeroHP === 0) {currentLogs += "You Lose!\n"; this.setState({gamePhase:"end"});}
        if (newEnemyHP === 0) {currentLogs += "You Win!\n"; this.setState({gamePhase:"end"});}
        }

        this.setState({heroHP:newHeroHP});
        this.setState({enemyHP:newEnemyHP});
        this.setState({heroAttackControlIndex:null});
        this.setState({heroDefenceControlIndex:null});
        this.setState({goButtonDisabled: true});
        this.setState({gameLogs: currentLogs});
    };

    render() {
        return (
            <div>
            <div className="Game">
                <Hero
                    items={heroItems}
                    stats={heroStats}
                    HP={this.state.heroHP}
                />
                <ControlBox
                    attackIndex={this.state.heroAttackControlIndex}
                    defenceIndex={this.state.heroDefenceControlIndex}
                    gamePhase={this.state.gamePhase}
                    onAttackControlClick={this.onAttackControlClick}
                    onDefenceControlClick={this.onDefenceControlClick}
                    goButtonClick={this.goButtonClick}
                />
                <Hero
                    items={enemyItems}
                    stats={enemyStats}
                    HP={this.state.enemyHP}
                />
            </div>
            <div className="Logs">
                {this.state.gameLogs}
            </div>
            </div>
        );
    }
}

export default Game;
