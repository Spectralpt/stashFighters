// src/scenes/HUDScene.ts
import Phaser from "phaser";
import { Player } from "../Entities/Player.ts";

export class HUDScene extends Phaser.Scene {
    private player!: Player;
    private healthBar!: Phaser.GameObjects.Rectangle;

    constructor() {
        super({ key: 'HUDScene' });
    }

    init(data: { player: Player }) {
        this.player = data.player;
    }

    create() {
        this.healthBar = this.add.rectangle(10, 10, this.player.getHealth() * 2, 20, 0xff0000, 0.5);
        this.healthBar.setOrigin(0, 0);
    }

    update() {
        this.healthBar.width = this.player.getHealth() * 2;
    }
}