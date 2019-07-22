module Anuto {

    export class Bullet {

        public static id: number;

        public id: number;
        public x: number;
        public y: number;

        private vx: number;
        private vy: number;

        // bullet speed in cells / tick
        constructor (p: {r: number, c: number}, angle: number) {
            
            this.id = Bullet.id;
            Bullet.id ++;

            this.x = p.c + .5;
            this.y = p.r + .5;

            this.vx = GameConstants.BULLET_SPEED * Math.cos(angle);
            this.vy = GameConstants.BULLET_SPEED * Math.sin(angle);
        }

        public update(): void {
            
            this.x += this.vx;
            this.y += this.vy;
        }

        public getPositionNextTick(): {x: number, y: number} {

            return {x: this.x + this.vx, y: this.y + this.vy};
        }
    }
}
