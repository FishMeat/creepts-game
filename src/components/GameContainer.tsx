import Phaser from "phaser";
import * as React from "react";

import { Game } from "../Game";
import { GameConstants } from "../GameConstants";
import { BootScene } from "../scenes/BootScene";
import { PreloadScene } from "../scenes/PreloadScene";
import { BattleScene } from "../scenes/battle-scene/BattleScene";
import { MapsScene } from "../scenes/maps-scene/MapsScene";

export interface IGameContainerProps { visible: boolean }

export default class GameContainer extends React.Component<IGameContainerProps, any> {

    constructor(props: IGameContainerProps) {
        super(props);
    }

    componentDidMount() {
        this.createGame();
    }

    componentWillUnmount() {
    }

    createGame() {
        const gameConfig = {

            version: GameConstants.VERSION,
            type: Phaser.AUTO,
            backgroundColor: "#000000",
            parent: "phaser-game",
            width: GameConstants.GAME_WIDTH,
            height: GameConstants.GAME_HEIGHT,
            scale: {
                mode: Phaser.Scale.FIT,
                autocenter: Phaser.Scale.CENTER_BOTH
            },

            scene: [
                BootScene,
                PreloadScene,
                BattleScene,
                MapsScene
            ]
        };

        // If compilation error here, compare Phaser definitions file of working copy (phaser.d.ts, line 48040 on 27-05-2019)
        // Also make sure to delete all *.ts files in node_modules/trailz folder
        new Game(gameConfig);
    }

    public render() {
        const visibility = this.props.visible ? "visible" : "hidden";
        return <div
            id="phaser-game"
            style={{
                height: "100vh",
                width: "100vw",
                position: "absolute",
                left: 0,
                top: 0,
                visibility
            }} 
        />;
    }
}
