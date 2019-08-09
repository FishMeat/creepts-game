module Anuto.Types {

    export type Callback = {
        func: Function;
        scope: any
    };

    export type GameConfig = {
        timeStep: number;
        runningInClientSide: boolean;
        enemySpawningDeltaTicks: number;
        credits: number;
        lifes: number;
        boardSize: {r: number, c: number}; 
        enemiesPathCells: {r: number, c: number} [];
    };

    export type WaveConfig = {
        enemies: {"type": string, "t": number} [];
    };
}
