import { GameConstants } from "../../../GameConstants";
import { GameVars } from "../../../GameVars";
import { LaunchTurretActor } from "./LaunchTurretActor";
import { BoardContainer } from "../BoardContainer";
import { BattleManager } from "../BattleManager";

export class MortarActor extends Phaser.GameObjects.Container {

    public anutoMortar: Anuto.Mortar;

    private launchTurretActor: LaunchTurretActor;
    private mortarImage: Phaser.GameObjects.Image;
    private detonated: boolean;
    
    constructor(scene: Phaser.Scene, anutoMortar: Anuto.Mortar, launchTurretActor: LaunchTurretActor) {

        super(scene);

        this.anutoMortar = anutoMortar;
        this.launchTurretActor = launchTurretActor;
        this.detonated = false;

        this.x = this.anutoMortar.x * GameConstants.CELLS_SIZE;
        this.y = this.anutoMortar.y * GameConstants.CELLS_SIZE;

        this.mortarImage = new Phaser.GameObjects.Image(this.scene, 0, 0, "texture_atlas_1", "mortar");
        this.mortarImage.setScale(.5);
        this.add(this.mortarImage);

        this.visible = false;
    }

    public update(time: number, delta: number): void {

        if (this.detonated) {
            return;
        }

        // hacerla visible una vez haya pasado la boca del cañón
        if (!this.visible) {

            let d = Math.sqrt((this.x - this.launchTurretActor.x) * (this.x - this.launchTurretActor.x) + (this.x - this.launchTurretActor.x) * (this.x - this.launchTurretActor.x));

            // la longitud del cañón más un poco más debido al diámetro del mortero 
            if (d > this.launchTurretActor.canonLength + 15) {
                this.visible = true;
            }
        }

        // cambiar la escala para dar la sensacion de altura
        const tick = BattleManager.anutoEngine.ticksCounter;
        const dt = tick - this.anutoMortar.creationTick;
        let scale: number;

        // la escala crece
        if (dt < this.anutoMortar.ticksToImpact / 2) {
            scale = .5 * ( 1 + dt / (this.anutoMortar.ticksToImpact / 2));
        } else {
            // la escala disminuye
            scale = .5 * ( 1 +  (this.anutoMortar.ticksToImpact - dt) / (this.anutoMortar.ticksToImpact / 2)); 
        }

        this.mortarImage.setScale(scale);

        let smoothFactor: number;

        if (GameConstants.INTERPOLATE_TRAJECTORIES) {
            smoothFactor = GameVars.timeStepFactor === 4 ? .65 : .2;
        } else {
            smoothFactor = 1;
        }

        this.x += (this.anutoMortar.x * GameConstants.CELLS_SIZE - this.x) * smoothFactor;
        this.y += (this.anutoMortar.y * GameConstants.CELLS_SIZE - this.y) * smoothFactor; 
    }

    public detonate(): void {

        this.detonated = true;

        this.mortarImage.visible = false;
        
        const explosionEffect = new Phaser.GameObjects.Graphics(this.scene);
        explosionEffect.lineStyle(8, 0xFFFF00);
        explosionEffect.strokeCircle(0, 0, this.anutoMortar.explosionRange * GameConstants.CELLS_SIZE);
        explosionEffect.setScale(.35);
        this.add(explosionEffect);

        this.scene.tweens.add({
            targets: explosionEffect,
            scaleX: 1,
            scaleY: 1,
            ease: Phaser.Math.Easing.Cubic.Out,
            duration: GameVars.timeStepFactor === 4 ? 100 : 180,
            onComplete: function(): void {
                BoardContainer.currentInstance.removeMortar(this);
            },
            onCompleteScope: this
        });
    }
}