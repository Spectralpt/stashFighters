import Phaser from 'phaser';
import {Player} from "./Player.ts";

// @ts-ignore
export class Forest extends Phaser.Physics.Arcade.Sprite{
    private scene: Phaser.Scene;
    private mapWidth: number;
    // @ts-ignore
    private mapHeight: number;
    private trees: Phaser.Physics.Arcade.Group;
    player: Player;
    // @ts-ignore
    private treeColliders: Phaser.Physics.Arcade.Group;

    constructor(scene: Phaser.Scene, mapWidth: number, mapHeight: number, player: Player) {
        // @ts-ignore
        super(scene, 0, 0, undefined, undefined);
        this.scene = scene;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.trees = this.scene.physics.add.group();
        this.treeColliders = this.scene.physics.add.group();
        this.player = player;


    }

    spawnTrees(numberOfTrees: number): void {
        for (let i = 0; i < numberOfTrees; i++) {
            const x = Math.random() * this.mapWidth;
            const y = Math.random() * this.mapHeight;
            this.trees.create(x, y, 'tree');
        }
    }

    getTrees(): Phaser.Physics.Arcade.Group {
        return this.trees;
    }
}