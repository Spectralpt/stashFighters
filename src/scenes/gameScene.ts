// src/scenes/gameScene.ts
import { Player } from "../Entities/Player.ts";
import { Enemy } from "../Entities/Enemy.ts";
import {Saber} from "../Entities/Saber.ts";
import {Forest} from "../Entities/Forest.ts";
import {ArrowIndicator} from "../Entities/ArrowIndicator.ts";

export class gameScene extends Phaser.Scene {
    private player!: Player;
    private enemies!: Enemy[];
    private endZone!: Phaser.GameObjects.Rectangle;
    // @ts-ignore
    private box: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    // @ts-ignore
    private saber: Saber;
    // @ts-ignore
    private endZoneSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    // @ts-ignore
    private arrowIndicator: ArrowIndicator;


    constructor() {
        super("gameScene")
        this.enemies = new Array<Enemy>();
    }

    preload() {
    }

    create() {

        this.saber = new Saber(this, 100, 100, this.player)


        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('phaserGame2', 'base_tiles')
        if (tileset){
            map.createLayer('ground', tileset)
        }

        this.input.keyboard?.createCursorKeys();

        const boxX = Math.random() * this.scale.width;
        const boxY = Math.random() * this.scale.width;
        this.box = this.physics.add.sprite(boxX,boxY, 'box');
        this.box.setOrigin(0,0);
        this.box.setImmovable(true);

        this.endZone = this.add.rectangle(0 * 32,5 * 32,50,100, 0x00ff00, 0.5)
        this.endZone.setOrigin(0,0)
        this.endZoneSprite = this.physics.add.sprite(0 * 32,5 * 32, 'endZone')
        this.endZoneSprite.setOrigin(0,0)


        this.player = new Player(this, 100, 200, this.box)
        this.add.existing(this.player)
        this.saber = new Saber(this, 0, 0, this.player)
        this.player.setSaber(this.saber)

        this.anims.create({
            key: 'player-attack',
            frames: this.anims.generateFrameNumbers('saber', {start:0, end: 7}),
            frameRate: 10
        })


        this.enemies.push(new Enemy(this, 200, 400, this.player, this.box, this.saber))
        this.enemies.push(new Enemy(this, 400, 200, this.player, this.box, this.saber))

        this.enemies.forEach((enemy) => {
            this.add.existing(enemy);
        });


        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(2,2)

        const forest = new Forest(this, 100 * 32, 100 * 32, this.player);
        forest.spawnTrees(400);

        this.scene.launch('HUDScene', { player: this.player });
        this.scene.bringToTop('HUDScene')

        this.time.addEvent({
            delay: 5000, // 5000 ms = 5 sec
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
        
        this.arrowIndicator = new ArrowIndicator(this, this.player, this.box)
    }

    update() {
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.box.getBounds(), this.endZone.getBounds())){
            this.scene.stop('gameScene')
            this.scene.stop('HUDScene')
            this.scene.launch('GameWinScene')
            this.scene.bringToTop('GameWinScene')
        }
        this.saber.update()
        this.enemies.forEach((enemy) => {
            enemy.update();
        })

        if (this.player.getHealth() <= 0){
            this.scene.stop('gameScene')
            this.scene.stop('HUDScene')
            this.scene.launch('GameOverScene')
            this.scene.bringToTop('GameOverScene')
        }

        this.arrowIndicator.update()
    }


    spawnEnemy() {
        const x = Math.random() * this.scale.width;
        const y = Math.random() * this.scale.height;
        const enemy = new Enemy(this, x, y, this.player, this.box, this.saber);
        this.enemies.push(enemy);
        this.add.existing(enemy);
    }
}