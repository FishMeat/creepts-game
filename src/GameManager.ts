import { GameConstants } from "./GameConstants";
import { GameVars } from "./GameVars";
import { AudioManager } from "./AudioManager";
import mapsData from "../assets/config/maps.json";
import defaultLevel from "../assets/level.json";
import defaultLog from "../assets/log.json";

export class GameManager {

    public static init(): void {

        GameVars.mapsData = mapsData;

        if (GameVars.currentScene.sys.game.device.os.desktop) {
            GameVars.scaleY = 1;
            GameVars.scaleCorrectionFactor = 1;
        } else {

            GameVars.currentScene.game.scale.displaySize = GameVars.currentScene.game.scale.parentSize;
            GameVars.currentScene.game.scale.refresh();

            const aspectRatio = window.innerHeight / window.innerWidth;
            GameVars.scaleY = (GameConstants.GAME_HEIGHT / GameConstants.GAME_WIDTH) / aspectRatio;

            if (aspectRatio > 1.5) {
                GameVars.scaleCorrectionFactor = 1.2;
            } else if (aspectRatio < 1.33) {
                GameVars.scaleCorrectionFactor = .8;
            } else {
                GameVars.scaleCorrectionFactor = 1;
            }
        }

        GameManager.readGameData();
    }

    public static readGameData(): void {

        GameManager.getGameStorageData(
            GameConstants.SAVED_GAME_DATA_KEY,
            function (gameData: string): void {

                if (gameData) {
                    GameVars.gameData = JSON.parse(gameData);
                } else {
                    GameVars.gameData = {
                        muted: false,
                        scores: [],
                        currentMapIndex: 0
                    };
                }

                GameManager.startGame();
            }
        );
    }

    public static setCurrentScene(scene: Phaser.Scene): void {

        GameVars.currentScene = scene;
    }

    public static onGameAssetsLoaded(): void {

        AudioManager.init();

        GameManager.enterBattleScene();
        // GameManager.enterLogScene();
    }

    public static mapSelected(index: number): void {

        GameVars.currentMapData = GameVars.mapsData[index];
        GameVars.gameData.currentMapIndex = index;
        GameManager.writeGameData();

        GameManager.enterBattleScene();
    }

    public static enterBattleScene(): void {

        GameVars.currentScene.scene.start("BattleScene");
    }

    public static enterLogScene(log?: LogsObject, level?: LevelObject): void {

        GameVars.logsObject = log || defaultLog;
        GameVars.initialLogsObjects = JSON.parse(JSON.stringify(GameVars.logsObject));
        GameVars.levelObject = level || defaultLevel;

        GameVars.currentScene.scene.start("LogScene");
    }

    public static enterMapScene(): void {

        GameVars.currentScene.scene.start("MapsScene");
    }

    public static reset(): void {

        GameManager.enterBattleScene();
    }

    public static writeGameData(): void {

        GameManager.setGameStorageData(
            GameConstants.SAVED_GAME_DATA_KEY,
            GameVars.gameData,
            function (): void {
                GameManager.log("game data successfully saved");
            }
        );
    }

    public static log(text: string, error?: Error): void {

        if (!GameConstants.VERBOSE) {
            return;
        }

        if (error) {
            console.error(text + ":", error);
        } else {
            console.log(text);
        }
    }

    private static startGame(): void {

        if (GameVars.gameData.scores.length === 0) {
            for (let i = 0; i < GameVars.mapsData.length; i++) {
                GameVars.gameData.scores[i] = 0;
            }
        }

        GameVars.gameData.currentMapIndex = GameVars.gameData.currentMapIndex;
        GameVars.currentMapData = GameVars.mapsData[GameVars.gameData.currentMapIndex];

        GameVars.currentScene.scene.start("PreloadScene");
    }

    private static getGameStorageData(key: string, successCb: Function): void {

        const gameDataStr = localStorage.getItem(key);
        successCb(gameDataStr);
    }

    private static setGameStorageData(key: string, value: any, successCb: Function): void {

        localStorage.setItem(key, JSON.stringify(value));
        successCb();
    }
}
