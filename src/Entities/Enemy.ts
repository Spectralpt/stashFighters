// src/Enemy/Enemy.ts
import Phaser from "phaser";
import {Player} from "./Player.ts";
import {Saber} from "./Saber.ts";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    private player: Player;
    private enemySpeed: number = 50;
    private health: number = 20;
    private attackKey: Phaser.Input.Keyboard.Key;

    private saber: any;

    // @ts-ignore
    constructor(scene: Phaser.Scene, x: number, y: number, player: Player, box: Phaser.Physics.Arcade.Sprite, saber: Saber) {
        super(scene, x, y, 'enemy');
        this.scene.physics.add.existing(this);
        this.player = player;
        this.attackKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.saber = saber

        this.anims.create({
            key: 'enemy-walk',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 8 }),
            frameRate: 10,
        })
        //this.scene.physics.add.collider(this, this.box)
    }

    preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        // Follow the player
        // if (this.x -)
        this.scene.physics.moveToObject(this, this.player, this.enemySpeed);
        this.anims.play('enemy-walk', true)
        this.flipX = this.x > this.player.x;

        if (Phaser.Input.Keyboard.JustDown(this.attackKey)){
            console.log("Shoot")
            this.saber.anims.play('player-attack', true)
            if (this.scene.physics.overlap(this, this.saber)){
                console.log("enemy hit")
                this.takeDamage(10)
            }
        }

        if (this.scene.physics.overlap(this, this.player.getSensors() )&& Phaser.Input.Keyboard.JustDown(this.attackKey) ){
            this.takeDamage(10)
            console.log("enemy hit")
        }

        if (this.scene.physics.overlap(this, this.player)){
            this.player.takeDamage(10)
        }

        if (this.health <= 0){
            this.destroy()
        }
    }

    takeDamage(amount: number): void {
        this.health -= amount
    }
}