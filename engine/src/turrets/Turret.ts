module Anuto {

    export class Turret {

        public static id: number;

        public id: number;
        public creationTick: number;
        public type: string;
        public level: number;
        public grade: number;
        public x: number;
        public y: number;
        public damage: number;
        public reload: number;
        public range: number;
        public priceImprovement: number;
        public priceUpgrade: number;
        public value: number;
        public position: {r: number, c: number};
        public shootingStrategy: string;
        public shootingStrategyIndex: number;
        public fixedTarget: boolean;
        public enemiesWithinRange: Enemy[];
        public followedEnemy: Enemy;
        public shootAngle: number;

        protected f: number;
        protected reloadTicks: number;
        protected readyToShoot: boolean;
        
        constructor (type: string, p: {r: number, c: number}) {

            this.id = Turret.id;
            Turret.id ++;

            this.creationTick = GameVars.ticksCounter;

            this.type = type;
            this.f = 0;
            this.level = 1;
            this.grade = 1;
            this.position = p;
            this.fixedTarget = true;
            this.shootingStrategyIndex = 0;
            this.shootingStrategy = GameConstants.STRATEGYS_ARRAY[this.shootingStrategyIndex];
            this.readyToShoot = false;
            this.enemiesWithinRange = [];
            this.followedEnemy = null;

            this.x = this.position.c + .5;
            this.y = this.position.r + .5;
        }

        public destroy(): void {
            //
        }

        public update(): void {

            this.enemiesWithinRange = this.getEnemiesWithinRange();

            if (this.readyToShoot) {

                if (this.enemiesWithinRange.length > 0) {
                    this.readyToShoot = false;   
                    this.shoot();
                }
            
            } else {

                this.f ++;

                if (this.f === this.reloadTicks) {
                    this.readyToShoot = true;
                    this.f = 0;
                }
            }
        }

        public improve(): void {

            this.level ++;
            this.calculateTurretParameters();                                                                                                                                        
        }

        public upgrade(): void {

            this.grade ++;
            this.level = 1;
            this.calculateTurretParameters();
        }

        public setNextStrategy(): void {

            this.shootingStrategyIndex = this.shootingStrategyIndex === GameConstants.STRATEGYS_ARRAY.length - 1 ? 0 : this.shootingStrategyIndex + 1;
            this.shootingStrategy = GameConstants.STRATEGYS_ARRAY[this.shootingStrategyIndex];
        }

        public setFixedTarget(): void {

            this.fixedTarget = !this.fixedTarget;
        }

        protected calculateTurretParameters(): void {
            
            this.reloadTicks = Math.floor(GameConstants.RELOAD_BASE_TICKS * this.reload);
        }

        protected shoot(): void {
            // override
        }

        protected getEnemiesWithinRange(): Enemy [] {

            let enemiesAndSquaredDistances: {enemy: Enemy, squareDist: number} [] = [];
            let squaredRange = MathUtils.fixNumber(this.range * this.range);
            
            for (let i = 0; i < GameVars.enemies.length; i ++) {

                const enemy = GameVars.enemies[i];

                // TODO: AÑADIR LA CONDICION DE QUE SI ES UNA TORRETA GLUE IGNORE A LOS ENEMIGOS VOLADORES
                // SIEMPRE QUE SEA DE GRADO 1 ó 2
                if (enemy.life > 0 && GameVars && !enemy.teleporting) {

                    const dx = this.x - enemy.x;
                    const dy = this.y - enemy.y;

                    const squaredDist = MathUtils.fixNumber(dx * dx + dy * dy);

                    if (squaredRange >= squaredDist) {
                        enemiesAndSquaredDistances.push({enemy: enemy, squareDist: squaredDist});
                    }
                }
            }

            if (enemiesAndSquaredDistances.length > 1 && (this.type === GameConstants.TURRET_PROJECTILE || this.type === GameConstants.TURRET_LASER)) {
                
                // ordenar a los enemigos dentro del radio de acción según la estrategia de disparo
                switch (this.shootingStrategy) {

                    case GameConstants.STRATEGY_SHOOT_LAST:
                        enemiesAndSquaredDistances = enemiesAndSquaredDistances.sort((e1, e2) => e1.enemy.l - e2.enemy.l);
                        break;
                    case GameConstants.STRATEGY_SHOOT_CLOSEST:
                        enemiesAndSquaredDistances = enemiesAndSquaredDistances.sort((e1, e2) => e1.squareDist - e2.squareDist);
                        break;
                    case GameConstants.STRATEGY_SHOOT_WEAKEST:
                        enemiesAndSquaredDistances = enemiesAndSquaredDistances.sort((e1, e2) => e1.enemy.life - e2.enemy.life);
                        break;
                    case GameConstants.STRATEGY_SHOOT_STRONGEST:
                        enemiesAndSquaredDistances = enemiesAndSquaredDistances.sort((e1, e2) => e2.enemy.life - e1.enemy.life);
                        break;
                    case GameConstants.STRATEGY_SHOOT_FIRST:
                        enemiesAndSquaredDistances = enemiesAndSquaredDistances.sort((e1, e2) => e2.enemy.l - e1.enemy.l);
                        break;
                    default:
                }
            }

            const enemies: Enemy[] = [];

            for (let i = 0; i < enemiesAndSquaredDistances.length; i ++) {
                enemies.push(enemiesAndSquaredDistances[i].enemy);
            }

            return enemies;
        }
    }
}
