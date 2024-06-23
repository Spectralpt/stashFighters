// src/Entities/ArrowIndicator.ts
import Phaser from 'phaser';

export class ArrowIndicator extends Phaser.GameObjects.Image {
    private player: Phaser.Physics.Arcade.Sprite
    private target: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite, target: Phaser.Physics.Arcade.Sprite) {
        super(scene, player.x, player.y, 'arrow');
        this.player = player;
        this.target = target;
        this.setOrigin(0.5, 0.5);
        scene.add.existing(this);
    }

    update() {
        const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y - 50, this.target.x, this.target.y);
        this.setRotation(angle + Math.PI / 2);
        this.setPosition(this.player.x, this.player.y-50)
    }
}