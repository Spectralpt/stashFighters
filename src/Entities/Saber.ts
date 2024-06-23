import {Player} from "./Player.ts";
import Phaser from "phaser";

export class Saber extends Phaser.Physics.Arcade.Sprite {
    private player: Player;

    constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
        super(scene, x, y, 'saber');
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.player = player;

        // ATTACK ANIMATIONS

        this.anims.create({
            key: 'player-attack',
            frames: this.anims.generateFrameNumbers('saber', {start:0, end: 9}),
            frameRate: 100
        })

        this.anims.create({
            key: 'player-attack-idle',
            frames: this.anims.generateFrameNumbers('saber', {start:9, end: 9}),
            frameRate: 4
        })
    }

    update(): void {
        this.y = this.player.y
            if (this.player.flipX) {
                this.x = this.player.x - 20
                this.flipX = true
            } else {
                this.x = this.player.x + 20
                this.flipX = false
            }
    }
}