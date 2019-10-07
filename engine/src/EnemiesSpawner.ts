import { Engine } from "./Engine";
import { GameConstants } from "./GameConstants";
import { Enemy } from "./enemies/Enemy";
import { HealerEnemy } from "./enemies/HealerEnemy";

    export class EnemiesSpawner {

        private engine: Engine;

        constructor (engine: Engine) {
            
            this.engine = engine;
        }

        public getEnemy(): Enemy {

            let enemy: Enemy = null;

            if (this.engine.waveEnemies.length > 0) {

                let nextEnemyData = this.engine.waveEnemies[0];
                
                if (nextEnemyData.t === this.engine.ticksCounter) {

                    switch (nextEnemyData.type) {

                        case GameConstants.ENEMY_SOLDIER:
                            enemy = new Enemy(GameConstants.ENEMY_SOLDIER, this.engine.ticksCounter, this.engine);
                            break;
                        case GameConstants.ENEMY_RUNNER:
                            enemy = new Enemy(GameConstants.ENEMY_RUNNER, this.engine.ticksCounter, this.engine);
                            break;
                        case GameConstants.ENEMY_HEALER:
                            enemy = new HealerEnemy(this.engine.ticksCounter, this.engine);
                            break;
                        case GameConstants.ENEMY_BLOB:
                            enemy = new Enemy(GameConstants.ENEMY_BLOB, this.engine.ticksCounter, this.engine);
                            break;
                        case GameConstants.ENEMY_FLIER:
                            enemy = new Enemy(GameConstants.ENEMY_FLIER, this.engine.ticksCounter, this.engine);
                            break;
                        default: 
                    }

                    // cada ronda que pasa los enemigos tienen mas vida y mas valor
                    enemy.life = Math.round(enemy.life * this.engine.enemyHealthModifier);
                    enemy.maxLife = enemy.life;
                    enemy.value = Math.round(enemy.value * this.engine.enemyRewardModifier);

                    this.engine.waveEnemies.shift();
                }
            }

            return enemy;
        }
    }
