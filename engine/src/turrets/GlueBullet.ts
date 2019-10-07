import { GameConstants } from "../GameConstants";
import { MathUtils } from "../utils/MathUtils";
import { Enemy } from "../enemies/Enemy";
import { Engine } from "../Engine";

    export class GlueBullet {

        public id: number;
        public x: number;
        public y: number;
        public assignedEnemy: Enemy;
        public intensity: number;
        public durationTicks: number;
        public canonShoot: string;
        public outOfStageBoundaries: boolean;

        private engine: Engine;
        private vx: number;
        private vy: number;

        // bullet speed in cells / tick
        constructor (p: {r: number, c: number}, angle: number, assignedEnemy: Enemy, intensity: number, durationTicks: number, engine: Engine) {
            
            this.engine = engine;
            
            this.id = this.engine.bulletId;
            this.engine.bulletId ++;

            this.x = p.c + .5;
            this.y = p.r + .5;
            
            this.assignedEnemy = assignedEnemy;

            this.outOfStageBoundaries = false;

            this.intensity = intensity;
            this.durationTicks = durationTicks;

            this.vx = MathUtils.fixNumber(GameConstants.BULLET_SPEED * Math.cos(angle));
            this.vy = MathUtils.fixNumber( GameConstants.BULLET_SPEED * Math.sin(angle));
        }

        public destroy(): void {
            //
        }

        public update(): void {
            
            this.x = MathUtils.fixNumber(this.x + this.vx);
            this.y = MathUtils.fixNumber(this.y + this.vy);

            // ¿se salio de los limites del tablero?
            if (this.x < -1 || this.x > this.engine.boardSize.c + 1 || this.y < - 1 || this.y >  this.engine.boardSize.r + 1) {
                this.outOfStageBoundaries = true;
            }
        }

        public getPositionNextTick(): {x: number, y: number} {

            return {x: MathUtils.fixNumber(this.x + this.vx), y: MathUtils.fixNumber(this.y + this.vy)};
        }
    }
