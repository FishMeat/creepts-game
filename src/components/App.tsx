import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Game } from "../Game";
import Index from "./Index";
import Tournaments from "./Tournaments";
import Tournament from "./Tournament";
import GameContainer from "./GameContainer";
import { GameManager } from "../GameManager";

interface IState { gameOn: boolean }
interface IProps {}

export default class App extends Component<IProps, IState> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            gameOn: false
        }
    }

    play(mapIndex: number) {
        const selectMap = (map: number) => {
            setTimeout(() => {
                if (Game.currentInstance.isBooted) GameManager.mapSelected(map);
                else selectMap(map);
            }, 200);
        }

        selectMap(mapIndex);
        // GameManager.mapSelected(mapIndex);
        this.setState({ gameOn: true });
    }

    menu() {
        this.setState({ gameOn: false });
    }

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact component={Index} />
                    <Route path="/tournaments" exact component={Tournaments} />
                    <Route path="/tournaments/:id" exact render={routeProps =>
                        <Tournament {...routeProps} onLoad={this.play.bind(this)} onUnload={this.menu.bind(this)} />}
                    />
                    <GameContainer visible={this.state.gameOn} />
                </div>
            </Router>
        );
    }
}
