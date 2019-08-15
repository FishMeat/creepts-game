// anuto engine
var Anuto,__extends=this&&this.__extends||function(){var s=function(e,t){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])})(e,t)};return function(e,t){function i(){this.constructor=e}s(e,t),e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)}}();!function(n){var e=(t.prototype.getEnemy=function(){var e=null,t=n.GameVars.ticksCounter-n.GameVars.lastWaveTick;if(t%n.GameVars.enemySpawningDeltaTicks==0&&0<n.GameVars.waveEnemies.length){var i=n.GameVars.waveEnemies[0];if(i.t===t/n.GameVars.enemySpawningDeltaTicks){switch(i.type){case n.GameConstants.ENEMY_SOLDIER:e=new n.Enemy(n.GameConstants.ENEMY_SOLDIER,n.GameVars.ticksCounter);break;case n.GameConstants.ENEMY_RUNNER:e=new n.Enemy(n.GameConstants.ENEMY_RUNNER,n.GameVars.ticksCounter);break;case n.GameConstants.ENEMY_HEALER:e=new n.HealerEnemy(n.GameVars.ticksCounter);break;case n.GameConstants.ENEMY_BLOB:e=new n.Enemy(n.GameConstants.ENEMY_BLOB,n.GameVars.ticksCounter);break;case n.GameConstants.ENEMY_FLIER:e=new n.Enemy(n.GameConstants.ENEMY_FLIER,n.GameVars.ticksCounter)}var s=Math.round(e.life*(n.GameVars.round/10));e.life+=s,e.maxLife=e.life,n.GameVars.waveEnemies.shift()}}return e},t);function t(){}n.EnemiesSpawner=e}(Anuto=Anuto||{}),function(o){var e=(i.prototype.destroy=function(){},i.prototype.update=function(){this.enemiesWithinRange=this.getEnemiesWithinRange(),this.readyToShoot?this.type===o.GameConstants.TURRET_LAUNCH&&2===this.grade?(this.readyToShoot=!1,this.shoot()):0<this.enemiesWithinRange.length&&(this.readyToShoot=!1,this.shoot()):(this.f++,this.f>=this.reloadTicks&&(this.readyToShoot=!0,this.f=0))},i.prototype.improve=function(){this.value+=this.priceImprovement,this.sellValue+=Math.round(this.priceImprovement*i.downgradePercent),this.level++,this.calculateTurretParameters()},i.prototype.upgrade=function(){this.value+=this.priceUpgrade,this.sellValue+=Math.round(this.priceUpgrade*i.downgradePercent),this.grade++,this.level=1,3===this.grade&&this.type!==o.GameConstants.TURRET_GLUE&&(this.maxLevel=15),this.f=0,this.calculateTurretParameters()},i.prototype.setNextStrategy=function(){this.shootingStrategyIndex=this.shootingStrategyIndex===o.GameConstants.STRATEGYS_ARRAY.length-1?0:this.shootingStrategyIndex+1,this.shootingStrategy=o.GameConstants.STRATEGYS_ARRAY[this.shootingStrategyIndex]},i.prototype.setFixedTarget=function(){this.fixedTarget=!this.fixedTarget},i.prototype.calculateTurretParameters=function(){this.reloadTicks=Math.floor(o.GameConstants.RELOAD_BASE_TICKS*this.reload)},i.prototype.shoot=function(){},i.prototype.getEnemiesWithinRange=function(){for(var e=[],t=o.MathUtils.fixNumber(this.range*this.range),i=0;i<o.GameVars.enemies.length;i++){var s=o.GameVars.enemies[i];if(0<s.life&&s.l<o.GameVars.enemiesPathCells.length-1.5&&!s.teleporting){var n=this.x-s.x,a=this.y-s.y,r=o.MathUtils.fixNumber(n*n+a*a);r<=t&&e.push({enemy:s,squareDist:r})}}if(1<e.length&&(this.type===o.GameConstants.TURRET_PROJECTILE||this.type===o.GameConstants.TURRET_LASER))switch(this.shootingStrategy){case o.GameConstants.STRATEGY_SHOOT_LAST:e=e.sort(function(e,t){return e.enemy.l-t.enemy.l});break;case o.GameConstants.STRATEGY_SHOOT_CLOSEST:e=e.sort(function(e,t){return e.squareDist-t.squareDist});break;case o.GameConstants.STRATEGY_SHOOT_WEAKEST:e=e.sort(function(e,t){return e.enemy.life-t.enemy.life});break;case o.GameConstants.STRATEGY_SHOOT_STRONGEST:e=e.sort(function(e,t){return t.enemy.life-e.enemy.life});break;case o.GameConstants.STRATEGY_SHOOT_FIRST:e=e.sort(function(e,t){return t.enemy.l-e.enemy.l})}var h=[];for(i=0;i<e.length;i++)h.push(e[i].enemy);return h},i.downgradePercent=.9,i);function i(e,t){this.id=i.id,i.id++,this.creationTick=o.GameVars.ticksCounter,this.type=e,this.f=0,this.level=1,this.maxLevel=10,this.grade=1,this.inflicted=0,this.position=t,this.fixedTarget=!0,this.shootingStrategyIndex=0,this.shootingStrategy=o.GameConstants.STRATEGYS_ARRAY[this.shootingStrategyIndex],this.readyToShoot=!0,this.enemiesWithinRange=[],this.followedEnemy=null,this.x=this.position.c+.5,this.y=this.position.r+.5,this.value=o.GameVars.turretData[this.type].price,this.sellValue=Math.round(o.GameVars.turretData[this.type].price*i.downgradePercent)}o.Turret=e}(Anuto=Anuto||{}),function(a){var e=(s.prototype.destroy=function(){},s.prototype.update=function(){if(this.teleporting)return this.t++,void(8===this.t&&(this.teleporting=!1));var e=this.speed;if(this.affectedByGlue&&(e=a.MathUtils.fixNumber(this.speed/this.glueIntensity)),this.affectedByGlueBullet&&(e=a.MathUtils.fixNumber(this.speed/this.glueIntensityBullet),this.glueDuration<=this.glueTime?(this.affectedByGlueBullet=!1,this.glueTime=0):this.glueTime++),this.l=a.MathUtils.fixNumber(this.l+e),this.l>=a.GameVars.enemiesPathCells.length-1)this.x=a.GameVars.enemiesPathCells[a.GameVars.enemiesPathCells.length-1].c,this.y=a.GameVars.enemiesPathCells[a.GameVars.enemiesPathCells.length-1].r,a.Engine.currentInstance.onEnemyReachedExit(this);else{var t=a.Engine.getPathPosition(this.l);this.x=t.x,this.y=t.y}},s.prototype.teleport=function(e){this.hasBeenTeleported=!0,this.teleporting=!0,this.t=0,this.l-=e,this.l<0&&(this.l=0);var t=a.Engine.getPathPosition(this.l);this.x=t.x,this.y=t.y},s.prototype.glue=function(e){this.affectedByGlue=!0,this.glueIntensity=e},s.prototype.hit=function(e,t,i,s,n){this.life<=0||(this.life-=e,t&&t.turret?t.turret.inflicted+=Math.round(e):i&&i.turret?i.turret.inflicted+=Math.round(e):s&&s.turret?s.turret.inflicted+=Math.round(e):n&&(n.inflicted+=Math.round(e)),this.life<=0&&(this.life=0,a.Engine.currentInstance.onEnemyKilled(this)))},s.prototype.glueHit=function(e,t,i){this.affectedByGlueBullet=!0,this.glueIntensityBullet=e,this.glueDuration=t},s.prototype.restoreHealth=function(){this.life=this.maxLife},s.prototype.getNextPosition=function(e){var t=this.speed;this.affectedByGlue&&(t=a.MathUtils.fixNumber(this.speed/this.glueIntensity));var i=a.MathUtils.fixNumber(this.l+t*e),s=a.Engine.getPathPosition(i);return{x:s.x,y:s.y}},s);function s(e,t){this.id=s.id,s.id++,this.creationTick=t,this.type=e,this.enemyData=a.GameVars.enemyData[this.type],this.life=this.enemyData.life,this.maxLife=this.enemyData.life,this.value=this.enemyData.value,this.speed=this.enemyData.speed,this.affectedByGlue=!1,this.glueIntensity=0,this.affectedByGlueBullet=!1,this.glueIntensityBullet=0,this.glueDuration=0,this.glueTime=0,this.hasBeenTeleported=!1,this.teleporting=!1,this.l=0,this.t=0;var i=a.Engine.getPathPosition(this.l);this.x=i.x,this.y=i.y,this.boundingRadius=.4}a.Enemy=e}(Anuto=Anuto||{}),function(m){var e=(n.getPathPosition=function(e){var t,i,s=Math.floor(e);if(s===m.GameVars.enemiesPathCells.length-1)t=m.GameVars.enemiesPathCells[m.GameVars.enemiesPathCells.length-1].c,i=m.GameVars.enemiesPathCells[m.GameVars.enemiesPathCells.length-1].r;else{var n=m.MathUtils.fixNumber(e-s);t=m.GameVars.enemiesPathCells[s].c+.5,i=m.GameVars.enemiesPathCells[s].r+.5;var a=m.MathUtils.fixNumber(m.GameVars.enemiesPathCells[s+1].c-m.GameVars.enemiesPathCells[s].c),r=m.MathUtils.fixNumber(m.GameVars.enemiesPathCells[s+1].r-m.GameVars.enemiesPathCells[s].r);t=m.MathUtils.fixNumber(t+a*n),i=m.MathUtils.fixNumber(i+r*n)}return{x:t,y:i}},n.prototype.initWaveVars=function(){this.t=Date.now(),m.GameVars.enemies=[],this.bullets=[],this.glueBullets=[],this.mortars=[],this.glues=[],this.bulletsColliding=[],this.glueBulletsColliding=[],this.mortarsImpacting=[],this.consumedGlues=[],this.teleportedEnemies=[],this.noEnemiesOnStage=!1,this.allEnemiesSpawned=!1,this.enemiesSpawned=0},n.prototype.update=function(){if(m.GameVars.runningInClientSide){var e=Date.now();if(e-this.t<m.GameVars.timeStep)return;this.t=e}if(!m.GameVars.paused&&this.waveActivated){if(m.GameVars.lifes<=0&&!m.GameVars.gameOver&&(this.eventDispatcher.dispatchEvent(new m.Event(m.Event.GAME_OVER)),m.GameVars.gameOver=!0,console.log("TICKS: "+m.GameVars.ticksCounter),console.log("SCORE: "+m.GameVars.score)),this.noEnemiesOnStage&&this.allEnemiesSpawned&&0===this.bullets.length&&0===this.glueBullets.length&&0===this.glues.length&&0===this.mortars.length){if(this.waveActivated=!1,!(0<m.GameVars.lifes))return;this.eventDispatcher.dispatchEvent(new m.Event(m.Event.WAVE_OVER))}this.waveActivated&&(this.removeProjectilesAndAccountDamage(),this.teleport(),this.checkCollisions(),this.spawnEnemies()),m.GameVars.enemies.forEach(function(e){e.update()},this),this.turrets.forEach(function(e){e.update()}),this.bullets.forEach(function(e){e.update()}),this.glueBullets.forEach(function(e){e.update()}),this.mortars.forEach(function(e){e.update()}),this.mines.forEach(function(e){e.update()}),this.glues.forEach(function(e){e.update()}),m.GameVars.ticksCounter++}},n.prototype.newWave=function(){if(this.waveActivated)return!1;var e=Object.keys(m.GameVars.wavesData).length,t=m.GameVars.wavesData["wave_"+(m.GameVars.round%e+1)].slice(0);m.GameVars.waveEnemies=JSON.parse(JSON.stringify(t));var i=2*Math.floor(m.GameVars.round/e);m.GameVars.round++;for(var s=0;s<i;s++){for(var n=JSON.parse(JSON.stringify(t)),a=m.GameVars.waveEnemies[m.GameVars.waveEnemies.length-1].t,r=0;r<n.length;r++)n[r].t+=a+2;m.GameVars.waveEnemies=m.GameVars.waveEnemies.concat(n)}return m.GameVars.lastWaveTick=m.GameVars.ticksCounter,this.waveActivated=!0,this.initWaveVars(),this.waveEnemiesLength=m.GameVars.waveEnemies.length,!0},n.prototype.removeEnemy=function(e){var t=m.GameVars.enemies.indexOf(e);-1!==t&&m.GameVars.enemies.splice(t,1),e.destroy()},n.prototype.addTurret=function(e,t){for(var i=0;i<m.GameVars.enemiesPathCells.length;i++)if(t.c===m.GameVars.enemiesPathCells[i].c&&t.r===m.GameVars.enemiesPathCells[i].r)return null;for(i=0;i<this.turrets.length;i++)if(t.c===this.turrets[i].position.c&&t.r===this.turrets[i].position.r)return null;var s=null;switch(e){case m.GameConstants.TURRET_PROJECTILE:s=new m.ProjectileTurret(t);break;case m.GameConstants.TURRET_LASER:s=new m.LaserTurret(t);break;case m.GameConstants.TURRET_LAUNCH:s=new m.LaunchTurret(t);break;case m.GameConstants.TURRET_GLUE:s=new m.GlueTurret(t)}return m.GameVars.credits<s.value?null:(this.turrets.push(s),m.GameVars.credits-=s.value,s)},n.prototype.sellTurret=function(e){var t=this.getTurretById(e);if(!t)return!1;var i=this.turrets.indexOf(t);return-1!==i&&this.turrets.splice(i,1),m.GameVars.credits+=t.sellValue,t.destroy(),!0},n.prototype.setNextStrategy=function(e){var t=this.getTurretById(e);return!!t&&(t.setNextStrategy(),!0)},n.prototype.setFixedTarget=function(e){var t=this.getTurretById(e);return!!t&&(t.setFixedTarget(),!0)},n.prototype.addBullet=function(e,t){this.bullets.push(e),this.eventDispatcher.dispatchEvent(new m.Event(m.Event.BULLET_SHOT,[e,t]))},n.prototype.addGlueBullet=function(e,t){this.glueBullets.push(e),this.eventDispatcher.dispatchEvent(new m.Event(m.Event.GLUE_BULLET_SHOT,[e,t]))},n.prototype.addGlue=function(e,t){this.glues.push(e),this.eventDispatcher.dispatchEvent(new m.Event(m.Event.GLUE_SHOT,[e,t]))},n.prototype.addMortar=function(e,t){this.mortars.push(e),this.eventDispatcher.dispatchEvent(new m.Event(m.Event.MORTAR_SHOT,[e,t]))},n.prototype.addMine=function(e,t){this.mines.push(e),this.eventDispatcher.dispatchEvent(new m.Event(m.Event.MINE_SHOT,[e,t]))},n.prototype.addLaserRay=function(e,t){for(var i=0;i<t.length;i++)t[i].hit(e.damage,null,null,null,e);this.eventDispatcher.dispatchEvent(new m.Event(m.Event.LASER_SHOT,[e,t])),this.eventDispatcher.dispatchEvent(new m.Event(m.Event.ENEMY_HIT,[[t]]))},n.prototype.flagEnemyToTeleport=function(e,t){this.teleportedEnemies.push({enemy:e,glueTurret:t});for(var i=0;i<this.bullets.length;i++)(s=this.bullets[i]).assignedEnemy.id===e.id&&-1===this.bulletsColliding.indexOf(s)&&(s.assignedEnemy=null,this.bulletsColliding.push(s));for(i=0;i<this.glueBullets.length;i++){var s;(s=this.glueBullets[i]).assignedEnemy.id===e.id&&-1===this.glueBulletsColliding.indexOf(s)&&(s.assignedEnemy=null,this.glueBulletsColliding.push(s))}},n.prototype.onEnemyReachedExit=function(e){var t=m.GameVars.enemies.indexOf(e);m.GameVars.enemies.splice(t,1),e.destroy(),m.GameVars.lifes-=1,this.eventDispatcher.dispatchEvent(new m.Event(m.Event.ENEMY_REACHED_EXIT,[e])),0===m.GameVars.enemies.length&&this.allEnemiesSpawned&&this.onNoEnemiesOnStage()},n.prototype.onEnemyKilled=function(e){m.GameVars.credits+=e.value,m.GameVars.score+=e.value,this.eventDispatcher.dispatchEvent(new m.Event(m.Event.ENEMY_KILLED,[e]));var t=m.GameVars.enemies.indexOf(e);m.GameVars.enemies.splice(t,1),e.destroy(),0===m.GameVars.enemies.length&&this.allEnemiesSpawned&&this.onNoEnemiesOnStage()},n.prototype.improveTurret=function(e){var t=!1,i=this.getTurretById(e);return i&&i.level<i.maxLevel&&m.GameVars.credits>=i.priceImprovement&&(m.GameVars.credits-=i.priceImprovement,i.improve(),t=!0),t},n.prototype.upgradeTurret=function(e){var t=!1,i=this.getTurretById(e);return i&&i.grade<3&&m.GameVars.credits>=i.priceUpgrade&&(m.GameVars.credits-=i.priceUpgrade,i.upgrade(),t=!0),t},n.prototype.addEventListener=function(e,t,i){this.eventDispatcher.addEventListener(e,t,i)},n.prototype.removeEventListener=function(e,t){this.eventDispatcher.removeEventListener(e,t)},n.prototype.checkCollisions=function(){for(var e=0;e<this.bullets.length;e++){var t=this.bullets[e];if(a=this.bullets[e].assignedEnemy)if(0===a.life)this.bulletsColliding.push(t);else{var i={x:t.x,y:t.y},s=t.getPositionNextTick(),n={x:a.x,y:a.y};m.MathUtils.isLineSegmentIntersectingCircle(i,s,n,a.boundingRadius)&&this.bulletsColliding.push(t)}}for(e=0;e<this.glueBullets.length;e++)t=this.glueBullets[e],(a=this.glueBullets[e].assignedEnemy)&&(i={x:t.x,y:t.y},s=t.getPositionNextTick(),n={x:a.x,y:a.y},m.MathUtils.isLineSegmentIntersectingCircle(i,s,n,a.boundingRadius)&&this.glueBulletsColliding.push(t));for(e=0;e<this.mortars.length;e++)this.mortars[e].detonate&&this.mortarsImpacting.push(this.mortars[e]);for(e=0;e<this.mines.length;e++)this.mines[e].detonate&&this.minesImpacting.push(this.mines[e]);for(e=0;e<this.glues.length;e++)this.glues[e].consumed&&this.consumedGlues.push(this.glues[e]);for(e=0;e<m.GameVars.enemies.length;e++){var a;if((a=m.GameVars.enemies[e]).type!==m.GameConstants.ENEMY_FLIER){a.affectedByGlue=!1;for(var r=0;r<this.glues.length;r++){var h=this.glues[r];if(!h.consumed){var o=a.x-h.x,l=a.y-h.y;if(m.MathUtils.fixNumber(o*o+l*l)<=m.MathUtils.fixNumber(h.range*h.range)){a.glue(h.intensity);break}}}}}},n.prototype.removeProjectilesAndAccountDamage=function(){for(var e=0;e<this.bulletsColliding.length;e++){null===(o=(i=this.bulletsColliding[e]).assignedEnemy)||0===o.life?this.eventDispatcher.dispatchEvent(new m.Event(m.Event.ENEMY_HIT,[[],i])):(this.eventDispatcher.dispatchEvent(new m.Event(m.Event.ENEMY_HIT,[[o],i])),o.hit(i.damage,i));var t=this.bullets.indexOf(i);this.bullets.splice(t,1),i.destroy()}for(e=this.bulletsColliding.length=0;e<this.glueBulletsColliding.length;e++){var i;null===(o=(i=this.glueBulletsColliding[e]).assignedEnemy)||0===o.life?this.eventDispatcher.dispatchEvent(new m.Event(m.Event.ENEMY_GLUE_HIT,[[],i])):(this.eventDispatcher.dispatchEvent(new m.Event(m.Event.ENEMY_GLUE_HIT,[[o],i])),o.glueHit(i.intensity,i.durationTicks,i)),t=this.glueBullets.indexOf(i),this.glueBullets.splice(t,1),i.destroy()}for(e=this.glueBulletsColliding.length=0;e<this.mortarsImpacting.length;e++){var s=this.mortarsImpacting[e],n=[];if(0<(r=s.getEnemiesWithinExplosionRange()).length)for(var a=0;a<r.length;a++)0<(o=r[a].enemy).life&&(o.hit(r[a].damage,null,s),n.push(o));this.eventDispatcher.dispatchEvent(new m.Event(m.Event.ENEMY_HIT,[n,null,s])),t=this.mortars.indexOf(s),this.mortars.splice(t,1),s.destroy()}for(e=this.mortarsImpacting.length=0;e<this.minesImpacting.length;e++){var r,h=this.minesImpacting[e];if(n=[],0<(r=h.getEnemiesWithinExplosionRange()).length)for(a=0;a<r.length;a++){var o;0<(o=r[a].enemy).life&&(o.hit(r[a].damage,null,null,h),n.push(o))}this.eventDispatcher.dispatchEvent(new m.Event(m.Event.ENEMY_HIT,[n,null,null,h])),t=this.mines.indexOf(h),this.mines.splice(t,1);var l=h.turret;l&&l.numMines--,h.destroy()}for(e=this.minesImpacting.length=0;e<this.consumedGlues.length;e++){var u=this.consumedGlues[e];t=this.glues.indexOf(u),this.glues.splice(t,1),this.eventDispatcher.dispatchEvent(new m.Event(m.Event.GLUE_CONSUMED,[u])),u.destroy()}this.consumedGlues.length=0},n.prototype.teleport=function(){for(var e=[],t=0;t<this.teleportedEnemies.length;t++){var i=this.teleportedEnemies[t].enemy;i.teleport(this.teleportedEnemies[t].glueTurret.teleportDistance),e.push({enemy:i,glueTurret:this.teleportedEnemies[t].glueTurret})}(this.teleportedEnemies.length=0)<e.length&&this.eventDispatcher.dispatchEvent(new m.Event(m.Event.ENEMIES_TELEPORTED,[e]))},n.prototype.spawnEnemies=function(){var e=this.enemiesSpawner.getEnemy();e&&(this.enemiesSpawned++,this.enemiesSpawned===this.waveEnemiesLength&&(this.allEnemiesSpawned=!0),m.GameVars.enemies.push(e),this.eventDispatcher.dispatchEvent(new m.Event(m.Event.ENEMY_SPAWNED,[e,m.GameVars.enemiesPathCells[0]])))},n.prototype.onNoEnemiesOnStage=function(){this.noEnemiesOnStage=!0;for(var e=0;e<this.bullets.length;e++){var t=this.bullets[e];t.assignedEnemy=null,this.bulletsColliding.push(t)}this.eventDispatcher.dispatchEvent(new m.Event(m.Event.NO_ENEMIES_ON_STAGE))},n.prototype.getTurretById=function(e){for(var t=null,i=0;i<this.turrets.length;i++)if(this.turrets[i].id===e){t=this.turrets[i];break}return t},Object.defineProperty(n.prototype,"ticksCounter",{get:function(){return m.GameVars.ticksCounter},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"score",{get:function(){return m.GameVars.score},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"gameOver",{get:function(){return m.GameVars.gameOver},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"credits",{get:function(){return m.GameVars.credits},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"lifes",{get:function(){return m.GameVars.lifes},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"round",{get:function(){return m.GameVars.round},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"timeStep",{get:function(){return m.GameVars.timeStep},set:function(e){m.GameVars.timeStep=e},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"paused",{set:function(e){m.GameVars.paused=e},enumerable:!0,configurable:!0}),n);function n(e,t,i,s){n.currentInstance=this,m.Turret.id=0,m.Enemy.id=0,m.Bullet.id=0,m.Mortar.id=0,m.Glue.id=0,m.Mine.id=0,m.GameVars.runningInClientSide=e.runningInClientSide,m.GameVars.credits=e.credits,m.GameVars.lifes=e.lifes,m.GameVars.timeStep=e.timeStep,m.GameVars.enemySpawningDeltaTicks=e.enemySpawningDeltaTicks,m.GameVars.paused=!1,m.GameVars.enemiesPathCells=e.enemiesPathCells,m.GameVars.enemyData=t,m.GameVars.turretData=i,m.GameVars.wavesData=s,m.GameVars.round=0,m.GameVars.score=0,m.GameVars.gameOver=!1,this.waveActivated=!1,this.t=0,this.eventDispatcher=new m.EventDispatcher,this.enemiesSpawner=new m.EnemiesSpawner,m.GameVars.ticksCounter=0,m.GameVars.lastWaveTick=0,this.turrets=[],this.mines=[],this.minesImpacting=[],this.initWaveVars()}m.Engine=e}(Anuto=Anuto||{}),function(e){var t=(i.RELOAD_BASE_TICKS=10,i.BULLET_SPEED=.5,i.MORTAR_SPEED=.1,i.ENEMY_SOLDIER="soldier",i.ENEMY_RUNNER="runner",i.ENEMY_HEALER="healer",i.ENEMY_BLOB="blob",i.ENEMY_FLIER="flier",i.TURRET_PROJECTILE="projectile",i.TURRET_LASER="laser",i.TURRET_LAUNCH="launch",i.TURRET_GLUE="glue",i.STRATEGYS_ARRAY=[i.STRATEGY_SHOOT_FIRST="First",i.STRATEGY_SHOOT_LAST="Last",i.STRATEGY_SHOOT_CLOSEST="Closest",i.STRATEGY_SHOOT_WEAKEST="Weakest",i.STRATEGY_SHOOT_STRONGEST="Strongest"],i.HEALER_HEALING_TICKS=100,i.HEALER_STOP_TICKS=30,i.HEALER_HEALING_RADIUS=2,i);function i(){}e.GameConstants=t}(Anuto=Anuto||{}),function(){function e(){}(Anuto||(Anuto={})).GameVars=e}(),function(i){var s,e=(s=i.Enemy,__extends(t,s),t.prototype.update=function(){this.f++,this.healing?(this.heal(),this.f===i.GameConstants.HEALER_STOP_TICKS&&(this.f=0,this.healing=!1)):(s.prototype.update.call(this),this.f===i.GameConstants.HEALER_HEALING_TICKS&&this.l<i.GameVars.enemiesPathCells.length-2&&(this.f=0,this.healing=!0))},t.prototype.heal=function(){for(var e=0;e<i.GameVars.enemies.length;e++){var t=i.GameVars.enemies[e];t.id===this.id?t.restoreHealth():i.MathUtils.fixNumber((t.x-this.x)*(t.x-this.x)+(t.y-this.y)*(t.y-this.y))<=i.GameConstants.HEALER_HEALING_RADIUS*i.GameConstants.HEALER_HEALING_RADIUS&&t.restoreHealth()}},t);function t(e){var t=s.call(this,i.GameConstants.ENEMY_HEALER,e)||this;return t.f=i.GameConstants.HEALER_HEALING_TICKS-e%i.GameConstants.HEALER_HEALING_TICKS,t.healing=!1,t}i.HealerEnemy=e}(Anuto=Anuto||{}),function(e){var t=(i.prototype.getParams=function(){return this.params},i.prototype.getType=function(){return this.type},i.ENEMY_SPAWNED="enemy spawned",i.ENEMY_KILLED="enemy killed",i.ENEMY_HIT="enemy hit by bullet",i.ENEMY_GLUE_HIT="enemy hit by glue bullet",i.ENEMY_REACHED_EXIT="enemy reached exit",i.WAVE_OVER="wave over",i.GAME_OVER="game over",i.NO_ENEMIES_ON_STAGE="no enemies on stage",i.BULLET_SHOT="bullet shot",i.GLUE_BULLET_SHOT="glue bullet shot",i.LASER_SHOT="laser shot",i.MORTAR_SHOT="mortar shot",i.MINE_SHOT="mine shot",i.GLUE_SHOT="glue shot",i.GLUE_CONSUMED="glue consumed",i.ENEMIES_TELEPORTED="enemies teleported",i);function i(e,t){this.type=e,this.params=t}e.Event=t}(Anuto=Anuto||{}),function(e){var t=(i.prototype.hasEventListener=function(e,t){for(var i=!1,s=0;s<this.listeners.length;s++)this.listeners[s].type===e&&this.listeners[s].listener===t&&(i=!0);return i},i.prototype.addEventListener=function(e,t,i){this.hasEventListener(e,t)||this.listeners.push({type:e,listener:t,scope:i})},i.prototype.removeEventListener=function(e,t){for(var i=0;i<this.listeners.length;i++)this.listeners[i].type===e&&this.listeners[i].listener===t&&this.listeners.splice(i,1)},i.prototype.dispatchEvent=function(e){for(var t=0;t<this.listeners.length;t++)this.listeners[t].type===e.getType()&&this.listeners[t].listener.apply(this.listeners[t].scope,e.getParams())},i);function i(){this.listeners=[]}e.EventDispatcher=t}(Anuto=Anuto||{}),function(r){var e=(h.prototype.destroy=function(){},h.prototype.update=function(){this.x=r.MathUtils.fixNumber(this.x+this.vx),this.y=r.MathUtils.fixNumber(this.y+this.vy)},h.prototype.getPositionNextTick=function(){return{x:r.MathUtils.fixNumber(this.x+this.vx),y:r.MathUtils.fixNumber(this.y+this.vy)}},h);function h(e,t,i,s,n,a){this.id=h.id,h.id++,this.x=e.c+.5,this.y=e.r+.5,this.assignedEnemy=i,this.damage=s,this.canonShoot=n,this.turret=a,this.vx=r.MathUtils.fixNumber(r.GameConstants.BULLET_SPEED*Math.cos(t)),this.vy=r.MathUtils.fixNumber(r.GameConstants.BULLET_SPEED*Math.sin(t))}r.Bullet=e}(Anuto=Anuto||{}),function(e){var t=(n.prototype.destroy=function(){},n.prototype.update=function(){this.f++,this.f===this.duration&&(this.consumed=!0)},n);function n(e,t,i,s){this.id=n.id,n.id++,this.x=e.c+.5,this.y=e.r+.5,this.intensity=t,this.duration=i,this.range=s,this.consumed=!1,this.f=0}e.Glue=t}(Anuto=Anuto||{}),function(a){var e=(t.prototype.destroy=function(){},t.prototype.update=function(){this.x=a.MathUtils.fixNumber(this.x+this.vx),this.y=a.MathUtils.fixNumber(this.y+this.vy)},t.prototype.getPositionNextTick=function(){return{x:a.MathUtils.fixNumber(this.x+this.vx),y:a.MathUtils.fixNumber(this.y+this.vy)}},t);function t(e,t,i,s,n){this.id=a.Bullet.id,a.Bullet.id++,this.x=e.c+.5,this.y=e.r+.5,this.assignedEnemy=i,this.intensity=s,this.durationTicks=n,this.vx=a.MathUtils.fixNumber(a.GameConstants.BULLET_SPEED*Math.cos(t)),this.vy=a.MathUtils.fixNumber(a.GameConstants.BULLET_SPEED*Math.sin(t))}a.GlueBullet=e}(Anuto=Anuto||{}),function(l){var u,e=(u=l.Turret,__extends(t,u),t.prototype.calculateTurretParameters=function(){switch(this.grade){case 1:this.intensity=Math.round(100*(.2*this.level+1))/100,this.duration=1.5,this.reload=2,this.range=Math.round(100*(.1*this.level+1.4))/100,this.priceImprovement=Math.floor(1/6*Math.pow(this.level,3)+1*Math.pow(this.level,2)+95/6*this.level+83),this.priceUpgrade=800;break;case 2:this.intensity=Math.round(100*(.3*this.level+.9))/100,this.duration=2.5,this.reload=3,this.range=Math.round(100*(.2*this.level+2.3))/100,this.priceImprovement=Math.floor(1/3*Math.pow(this.level,3)+2*Math.pow(this.level,2)+95/3*this.level+166),this.priceUpgrade=1700;break;case 3:this.teleportDistance=Math.round(100*(5*this.level+10))/100,this.reload=Math.round(100*(-.5*this.level+5.5))/100,this.range=3.5,this.priceImprovement=Math.floor(10/3*Math.pow(this.level,3)+20*Math.pow(this.level,2)+950/3*this.level+1660)}this.durationTicks=Math.floor(l.GameConstants.RELOAD_BASE_TICKS*this.duration),u.prototype.calculateTurretParameters.call(this)},t.prototype.shoot=function(){var e;switch(u.prototype.shoot.call(this),this.grade){case 1:var t=new l.Glue(this.position,this.intensity,this.durationTicks,this.range);l.Engine.currentInstance.addGlue(t,this);break;case 2:e=this.fixedTarget&&this.followedEnemy||this.enemiesWithinRange[0];var i=l.MathUtils.fixNumber(Math.sqrt((this.x-e.x)*(this.x-e.x)+(this.y-e.y)*(this.y-e.y))),s=Math.floor(l.MathUtils.fixNumber(i/l.GameConstants.BULLET_SPEED)),n=e.getNextPosition(s),a=n.x-this.x,r=n.y-this.y,h=l.MathUtils.fixNumber(a*a+r*r);if(this.range*this.range>h){this.shootAngle=l.MathUtils.fixNumber(Math.atan2(r,a));var o=new l.GlueBullet({c:this.position.c,r:this.position.r},this.shootAngle,e,this.intensity,this.durationTicks);l.Engine.currentInstance.addGlueBullet(o,this)}else this.readyToShoot=!0;break;case 3:0<(e=this.fixedTarget&&this.followedEnemy||this.enemiesWithinRange[0]).life&&!e.hasBeenTeleported?l.Engine.currentInstance.flagEnemyToTeleport(e,this):this.readyToShoot=!0}},t);function t(e){var t=u.call(this,l.GameConstants.TURRET_GLUE,e)||this;return t.maxLevel=5,t.teleportDistance=0,t.calculateTurretParameters(),t}l.GlueTurret=e}(Anuto=Anuto||{}),function(r){var s,e=(s=r.Turret,__extends(t,s),t.prototype.update=function(){this.fixedTarget?0<this.enemiesWithinRange.length?-1===this.enemiesWithinRange.indexOf(this.followedEnemy)&&(this.followedEnemy=this.enemiesWithinRange[0]):this.followedEnemy=null:this.followedEnemy=this.enemiesWithinRange[0],s.prototype.update.call(this)},t.prototype.calculateTurretParameters=function(){switch(this.grade){case 1:this.damage=Math.round(1/3*Math.pow(this.level,3)+2*Math.pow(this.level,2)+95/3*this.level+196),this.reload=Math.round(100*(-.1*this.level+1.6))/100,this.range=Math.round(100*(.05*this.level+2.95))/100,this.priceImprovement=Math.round(1*Math.pow(this.level,2)+7*this.level+42),this.priceUpgrade=7e3;break;case 2:this.damage=Math.round(13/3*Math.pow(this.level,3)+6*Math.pow(this.level,2)+335/3*this.level+4178),this.reload=Math.round(100*(-.1*this.level+1.6))/100,this.range=Math.round(100*(.05*this.level+2.95))/100,this.priceImprovement=Math.round(37/6*Math.pow(this.level,3)+9.5*Math.pow(this.level,2)+481/3*this.level+404),this.priceUpgrade=96400;break;case 3:this.damage=Math.round(50/3*Math.pow(this.level,2)-850/3*this.level+43700),this.reload=Math.round(100*(-.05*this.level+3.05))/100,this.range=Math.round(100*(.05*this.level+3))/100,this.priceImprovement=Math.round(19.5*Math.pow(this.level,3)+2*Math.pow(this.level,2)+665/3*this.level+596)}s.prototype.calculateTurretParameters.call(this)},t.prototype.getEnemiesWithinLine=function(e){for(var t=[],i=0;i<r.GameVars.enemies.length;i++){var s=r.GameVars.enemies[i],n=s.x+1e3*(e.x-this.x),a=s.y+1e3*(e.y-this.y);s!==e&&r.MathUtils.isLineSegmentIntersectingCircle({x:this.x,y:this.y},{x:n,y:a},{x:s.x,y:s.y},.3)&&t.push(s)}return t},t.prototype.inLine=function(e,t,i){return e.x===i.x?t.x===i.x:e.y===i.y?t.y===i.y:(e.x-i.x)*(e.y-i.y)==(i.x-t.x)*(i.y-t.y)},t.prototype.shoot=function(){s.prototype.shoot.call(this);var e=[],t=1,i=0;switch(this.grade){case 1:t=1;break;case 2:t=3}if(3===this.grade)this.fixedTarget?e.push(this.followedEnemy||this.enemiesWithinRange[0]):e.push(this.enemiesWithinRange[0]),e=e.concat(this.getEnemiesWithinLine(e[0]));else for(this.fixedTarget&&this.followedEnemy?(e.push(this.followedEnemy),this.followedEnemy===this.enemiesWithinRange[0]&&i++):(e.push(this.enemiesWithinRange[0]),i++);e.length<t&&this.enemiesWithinRange[i];)e.push(this.enemiesWithinRange[i]),i++;0<e[0].life?r.Engine.currentInstance.addLaserRay(this,e):this.readyToShoot=!0},t);function t(e){var t=s.call(this,r.GameConstants.TURRET_LASER,e)||this;return t.calculateTurretParameters(),t}r.LaserTurret=e}(Anuto=Anuto||{}),function(d){var g,e=(g=d.Turret,__extends(E,g),E.prototype.calculateTurretParameters=function(){switch(this.grade){case 1:this.damage=Math.round(1/3*Math.pow(this.level,3)+4*Math.pow(this.level,2)+137/3*this.level+50),this.explosionRange=Math.round(100*(.05*this.level+1.45))/100,this.reload=Math.round(100*(-.05*this.level+2.05))/100,this.range=Math.round(100*(.05*this.level+2.45))/100,this.priceImprovement=Math.round(1/6*Math.pow(this.level,3)+1.5*Math.pow(this.level,2)+58/3*this.level+104),this.priceUpgrade=1e4;break;case 2:this.damage=Math.round(43/6*Math.pow(this.level,3)+11*Math.pow(this.level,2)+1121/3*this.level+2895),this.explosionRange=Math.round(100*(.05*this.level+1.95))/100,this.reload=Math.round(100*(-.05*this.level+2.6))/100,this.range=2.5,this.priceImprovement=Math.round(8*Math.pow(this.level,3)+12*Math.pow(this.level,2)+208*this.level+522),this.priceUpgrade=103e3;break;case 3:this.damage=Math.round(50/3*Math.pow(this.level,3)+850/3*this.level+47700),this.explosionRange=Math.round(100*(.05*this.level+1.7))/100,this.reload=Math.round(100*(-.05*this.level+3.05))/100,this.range=Math.round(100*(.1*this.level+2.9))/100,this.priceImprovement=Math.round(19.5*Math.pow(this.level,3)+2*Math.pow(this.level,2)+332.5*this.level+596)}g.prototype.calculateTurretParameters.call(this)},E.prototype.getPathCellsInRange=function(){for(var e=[],t=0;t<d.GameVars.enemiesPathCells.length;t++){var i=d.GameVars.enemiesPathCells[t];(i.c>=this.position.c&&i.c<=this.position.c+this.range||i.c<=this.position.c&&i.c>=this.position.c-this.range)&&(i.r>=this.position.r&&i.r<=this.position.r+this.range||i.r<=this.position.r&&i.r>=this.position.r-this.range)&&e.push(i)}return e},E.prototype.shoot=function(){if(g.prototype.shoot.call(this),2===this.grade){var e=this.getPathCellsInRange();if(0<e.length&&this.numMines<this.level+3){var t=e[this.minesCounter%e.length];this.minesCounter++,this.numMines++;var i=t.c+.5-this.x,s=t.r+.5-this.y;this.shootAngle=d.MathUtils.fixNumber(Math.atan2(s,i));var n=new d.Mine({c:t.c,r:t.r},this.explosionRange,this.damage,this);d.Engine.currentInstance.addMine(n,this)}else this.readyToShoot=!0}else{var a=void 0;a=this.fixedTarget&&this.followedEnemy||this.enemiesWithinRange[0];var r=d.MathUtils.fixNumber(Math.sqrt((this.x-a.x)*(this.x-a.x)+(this.y-a.y)*(this.y-a.y))),h=3===this.grade?5*d.GameConstants.MORTAR_SPEED:d.GameConstants.MORTAR_SPEED,o=Math.floor(d.MathUtils.fixNumber(r/h)),l=a.getNextPosition(o);if(1===this.grade){var u=d.MathUtils.fixNumber(E.deviationRadius*Math.cos(E.deviationAngle*Math.PI/180)),m=d.MathUtils.fixNumber(E.deviationRadius*Math.sin(E.deviationAngle*Math.PI/180));l.x+=u,l.y+=m,E.deviationRadius=.75===E.deviationRadius?0:E.deviationRadius+.25,E.deviationAngle=315===E.deviationAngle?0:E.deviationAngle+45}if((r=d.MathUtils.fixNumber(Math.sqrt((this.x-l.x)*(this.x-l.x)+(this.y-l.y)*(this.y-l.y))))<this.range){var c=3===this.grade?5*d.GameConstants.MORTAR_SPEED:d.GameConstants.MORTAR_SPEED;o=Math.floor(d.MathUtils.fixNumber(r/c)),i=l.x-this.x,s=l.y-this.y,this.shootAngle=d.MathUtils.fixNumber(Math.atan2(s,i));var p=new d.Mortar(this.position,this.shootAngle,o,this.explosionRange,this.damage,this.grade,this);d.Engine.currentInstance.addMortar(p,this)}else this.readyToShoot=!0}},E.deviationRadius=0,E.deviationAngle=0,E);function E(e){var t=g.call(this,d.GameConstants.TURRET_LAUNCH,e)||this;return t.calculateTurretParameters(),t.minesCounter=0,t.numMines=0,t}d.LaunchTurret=e}(Anuto=Anuto||{}),function(a){var e=(n.prototype.destroy=function(){},n.prototype.update=function(){if(!this.detonate)for(var e=0;e<a.GameVars.enemies.length;e++){var t=a.GameVars.enemies[e],i=a.MathUtils.fixNumber(Math.sqrt((t.x-this.x)*(t.x-this.x)+(t.y-this.y)*(t.y-this.y)));if(t.type!==a.GameConstants.ENEMY_FLIER&&i<=this.range){this.detonate=!0;break}}},n.prototype.getEnemiesWithinExplosionRange=function(){for(var e=[],t=0;t<a.GameVars.enemies.length;t++){var i=a.GameVars.enemies[t],s=a.MathUtils.fixNumber(Math.sqrt((i.x-this.x)*(i.x-this.x)+(i.y-this.y)*(i.y-this.y)));if(s<=this.explosionRange){var n=a.MathUtils.fixNumber(this.damage*(1-s/this.explosionRange));e.push({enemy:i,damage:n})}}return e},n);function n(e,t,i,s){this.id=n.id,n.id++,this.x=e.c+.5,this.y=e.r+.5,this.explosionRange=t,this.damage=i,this.range=.5,this.detonate=!1,this.turret=s}a.Mine=e}(Anuto=Anuto||{}),function(o){var e=(l.prototype.destroy=function(){},l.prototype.update=function(){this.x=o.MathUtils.fixNumber(this.x+this.vx),this.y=o.MathUtils.fixNumber(this.y+this.vy),this.f++,this.f===this.ticksToImpact&&(this.detonate=!0)},l.prototype.getEnemiesWithinExplosionRange=function(){for(var e=[],t=0;t<o.GameVars.enemies.length;t++){var i=o.GameVars.enemies[t],s=o.MathUtils.fixNumber(Math.sqrt((i.x-this.x)*(i.x-this.x)+(i.y-this.y)*(i.y-this.y)));if(s<=this.explosionRange){var n=o.MathUtils.fixNumber(this.damage*(1-s/this.explosionRange));e.push({enemy:i,damage:n})}}return e},l);function l(e,t,i,s,n,a,r){this.id=l.id,l.id++,this.creationTick=o.GameVars.ticksCounter,this.x=e.c+.5,this.y=e.r+.5,this.ticksToImpact=i,this.explosionRange=s,this.damage=n,this.grade=a,this.turret=r,this.detonate=!1,this.f=0;var h=3===this.grade?5*o.GameConstants.MORTAR_SPEED:o.GameConstants.MORTAR_SPEED;this.vx=o.MathUtils.fixNumber(h*Math.cos(t)),this.vy=o.MathUtils.fixNumber(h*Math.sin(t))}o.Mortar=e}(Anuto=Anuto||{}),function(o){var l,e=(l=o.Turret,__extends(t,l),t.prototype.update=function(){this.fixedTarget?0<this.enemiesWithinRange.length?-1===this.enemiesWithinRange.indexOf(this.followedEnemy)&&(this.followedEnemy=this.enemiesWithinRange[0]):this.followedEnemy=null:this.followedEnemy=this.enemiesWithinRange[0],l.prototype.update.call(this)},t.prototype.calculateTurretParameters=function(){switch(this.grade){case 1:this.damage=Math.round(1/3*Math.pow(this.level,3)+2*Math.pow(this.level,2)+95/3*this.level+66),this.reload=Math.round(100*(-.05*this.level+1.05))/100,this.range=Math.round(100*(.05*this.level+2.45))/100,this.priceImprovement=Math.round(1*Math.pow(this.level,2)+7*this.level+42),this.priceUpgrade=5600;break;case 2:this.damage=Math.round(13/3*Math.pow(this.level,3)+6*Math.pow(this.level,2)+335/3*this.level+3278),this.reload=Math.round(100*(-.05*this.level+.6))/100,this.range=Math.round(100*(.05*this.level+2.95))/100,this.priceImprovement=Math.round(31/6*Math.pow(this.level,3)+6.5*Math.pow(this.level,2)+397/3*this.level+326),this.priceUpgrade=88500;break;case 3:this.damage=Math.round(50*Math.pow(this.level,2)-50*this.level+2e4),this.reload=Math.round(100*(-.01*this.level+.21))/100,this.range=Math.round(100*(.05*this.level+3.45))/100,this.priceImprovement=Math.round(46/3*Math.pow(this.level,3)+2*Math.pow(this.level,2)+785/3*this.level+471)}l.prototype.calculateTurretParameters.call(this)},t.prototype.shoot=function(){var e;l.prototype.shoot.call(this),e=this.fixedTarget&&this.followedEnemy||this.enemiesWithinRange[0];var t=o.MathUtils.fixNumber(Math.sqrt((this.x-e.x)*(this.x-e.x)+(this.y-e.y)*(this.y-e.y))),i=Math.floor(o.MathUtils.fixNumber(t/o.GameConstants.BULLET_SPEED)),s=e.getNextPosition(i),n=s.x-this.x,a=s.y-this.y,r=o.MathUtils.fixNumber(n*n+a*a);switch(this.grade){case 2:case 3:"left"===this.canonShoot?this.canonShoot="right":this.canonShoot="left"}if(this.range*this.range>r){this.shootAngle=o.MathUtils.fixNumber(Math.atan2(a,n));var h=new o.Bullet({c:this.position.c,r:this.position.r},this.shootAngle,e,this.damage,this.canonShoot,this);o.Engine.currentInstance.addBullet(h,this)}else this.readyToShoot=!0},t);function t(e){var t=l.call(this,o.GameConstants.TURRET_PROJECTILE,e)||this;switch(t.canonShoot="center",t.grade){case 2:case 3:t.canonShoot="left"}return t.calculateTurretParameters(),t}o.ProjectileTurret=e}(Anuto=Anuto||{}),function(e){var t=(c.fixNumber=function(e){return isNaN(e)?0:Math.round(1e5*e)/1e5},c.isLineSegmentIntersectingCircle=function(e,t,i,s){if(c.isPointInsideCircle(e.x,e.y,i.x,i.y,s))return!0;if(c.isPointInsideCircle(t.x,t.y,i.x,i.y,s))return!0;var n=e.x-t.x,a=e.y-t.y,r=c.fixNumber(Math.sqrt(n*n+a*a)),h=((i.x-e.x)*(t.x-e.x)+(i.y-e.y)*(t.y-e.y))/(r*r),o=e.x+h*(t.x-e.x),l=e.y+h*(t.y-e.y);if(!c.isPointInLineSegment(e.x,e.y,t.x,t.y,o,l))return!1;var u=o-i.x,m=l-i.y;return c.fixNumber(Math.sqrt(u*u+m*m))<=s},c.isPointInLineSegment=function(e,t,i,s,n,a){var r=c.fixNumber(Math.sqrt((n-e)*(n-e)+(a-t)*(a-t))),h=c.fixNumber(Math.sqrt((n-i)*(n-i)+(a-s)*(a-s))),o=c.fixNumber(Math.sqrt((e-i)*(e-i)+(t-s)*(t-s)));return o-.1<=r+h&&r+h<=o+.1},c.isPointInsideCircle=function(e,t,i,s,n){var a=i-e,r=s-t;return c.fixNumber(Math.sqrt(a*a+r*r))<=n},c);function c(){}e.MathUtils=t}(Anuto=Anuto||{});

// LOGS TYPES
var TYPE_NEXT_WAVE = "type next wave";
var TYPE_ADD_TURRET = "type add turret";
var TYPE_SELL_TURRET = "type sell turret";
var TYPE_UPGRADE_TURRET = "type upgrade turret";
var TYPE_LEVEL_UP_TURRET = "type level up turret";
var TYPE_CHANGE_STRATEGY_TURRET = "type change strategy turret";
var TYPE_CHANGE_FIXED_TARGET_TURRET = "type change fixed target turret";

var file1 = readFile(arg[1]);
var file2 = readFile(arg[2]);


for (var i = 0; i < 10; i++) {
var logs = JSON.parse(file1.replace(/\r?\n/g, ""));
var level = JSON.parse(file2.replace(/\r?\n/g, ""));

level.gameConfig.runningInClientSide = false;

var anutoEngine = new Anuto.Engine(level.gameConfig, level.enemiesData, level.turretsData, level.wavesData);

while(!anutoEngine.gameOver) {

    while (logs.actions.length && logs.actions[0].tick === anutoEngine.ticksCounter) {

        var action = logs.actions.shift();

        switch(action.type) {
            case TYPE_NEXT_WAVE:
                anutoEngine.newWave();
                break;
            case TYPE_ADD_TURRET:
                anutoEngine.addTurret(action.typeTurret, action.position);
                break;
            case TYPE_SELL_TURRET:
                anutoEngine.sellTurret(action.id);
                break;
            case TYPE_UPGRADE_TURRET:
                anutoEngine.upgradeTurret(action.id);
                break;
            case TYPE_LEVEL_UP_TURRET:
                anutoEngine.improveTurret(action.id);
                break;
            case TYPE_CHANGE_STRATEGY_TURRET:
                anutoEngine.setNextStrategy(action.id);
                break;
            case TYPE_CHANGE_FIXED_TARGET_TURRET:
                anutoEngine.setFixedTarget(action.id);
                break;
            default:
                break;
        }
    }

    anutoEngine.update();
}
}