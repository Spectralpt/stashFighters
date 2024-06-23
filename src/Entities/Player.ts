// src/Player/Player.ts
import Phaser from "phaser";
import {Saber} from "./Saber.ts";

type Keys = {
    W: Phaser.Input.Keyboard.Key,
    S: Phaser.Input.Keyboard.Key,
    A: Phaser.Input.Keyboard.Key,
    D: Phaser.Input.Keyboard.Key,
    space: Phaser.Input.Keyboard.Key,
    shift: Phaser.Input.Keyboard.Key
};

export class Player extends Phaser.Physics.Arcade.Sprite {
    // PLAYER STATS
    private speed: number = 200;
    private pushSpeed: number = 100;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private health: number = 100;

    // @ts-ignore
    private isWalkingRight: Boolean;
    // @ts-ignore
    private isWalkingLeft: Boolean;
    // @ts-ignore
    private isWalkingUp: Boolean;
    // @ts-ignore
    private isWalkingDown: Boolean;

    // BOX RELATED
    private box: Phaser.Physics.Arcade.Image;
    private isGrabbing: boolean = false;
    private grabKey: Phaser.Input.Keyboard.Key;
    // @ts-ignore
    private shootKey: Phaser.Input.Keyboard.Key;
    private sensor: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

    // ATTACK
    // @ts-ignore
    private saber: Saber
    lastAttackedTime: number;

    constructor(scene: any, x: any, y: any, box: Phaser.Physics.Arcade.Image) {
        super(scene, x, y, 'player');
        this.scene.physics.add.existing(this);
        this.box = box;
        this.lastAttackedTime = 0;

        let keys = this.scene.input.keyboard!.addKeys('W,S,A,D,space,shift') as Keys;

        this.cursors = {
            up: keys.W,
            down: keys.S,
            left: keys.A,
            right: keys.D,
            space: keys.space,
            shift: keys.shift
        };

        this.grabKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.shootKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.sensor = this.scene.physics.add.image(x, y, 'collider');
        this.sensor.setVisible(false);
        this.sensor.setScale(0.5);

        // MOVEMENT ANIMATIONS
        this.anims.create({
            key: 'player-walk',
            frames: this.anims.generateFrameNumbers('player',{start:0, end: 3}),
            frameRate: 10
        })

        this.anims.create({
            key: 'player-idle',
            frames: this.anims.generateFrameNumbers('player', {start:4, end:5}),
            frameRate: 4
        })

    }

    preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);


        let velocityX = 0;
        let velocityY = 0;
        if (this.isWalkingRight == false && this.isWalkingLeft == false && this.isWalkingUp == false && this.isWalkingDown == false)
            this.anims.play('player-idle', true)

        this.isWalkingRight = false
        this.isWalkingLeft = false
        this.isWalkingUp = false
        this.isWalkingDown = false

        if (this.cursors.left.isDown) {
            this.isWalkingLeft = true
            this.anims.play('player-walk', true)
            this.flipX = true
            if (!this.isGrabbing){ // if the player is not grabbing the box move at the normal speed
                velocityX = -this.speed;
            } else if (this.isGrabbing) {  // if he is grabbing the box move the box to be near him and make him move slower
                this.box.x = this.x - 40;
                velocityX = -this.pushSpeed;
            }

            //move pickup sensor to the left side when the player turns
            this.sensor.x = this.x - 20
        } else if (this.cursors.right.isDown) {
            this.isWalkingRight = true
            this.anims.play('player-walk', true)
            this.flipX = false
            if (!this.isGrabbing){
                velocityX = this.speed;
            }else if (this.isGrabbing) {
                this.box.x = this.x + 10;
                velocityX = this.pushSpeed
            }
            this.sensor.x = this.x + 20;
        }

        if (this.cursors.up.isDown) {
            this.isWalkingUp = true
            if (!this.isGrabbing){
                velocityY = -this.speed;
            }else{
                velocityY = -this.pushSpeed;
            }

            if (this.isGrabbing)
                this.box.y = this.y - 15;
        } else if (this.cursors.down.isDown) {
            this.isWalkingDown = true
            if (!this.isGrabbing){
                velocityY = this.speed
            }
            else {
                velocityY = this.pushSpeed
            }
            if (this.isGrabbing)
                this.box.y = this.y - 15;

        }

        this.sensor.y = this.y;

        this.setVelocity(velocityX, velocityY);


        this.grabChecker()

    }


    //Check if the player is overlapping the box and if the player presses the grab key
    public grabChecker(){
        if (this.scene.physics.overlap(this.sensor, this.box)) {
            if (Phaser.Input.Keyboard.JustDown(this.grabKey)) {
                this.isGrabbing = !this.isGrabbing;
            }
        }
    }

    public getSensors(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
        return this.sensor;
    }

    public setSaber(saber: Saber): void {
        this.saber = saber;
    }

    public takeDamage(amount: number): void {
        const currentTime = this.scene.time.now;
        if (currentTime - this.lastAttackedTime > 1000) { // 1000 ms = 1 sec
            this.health -= amount;
            this.lastAttackedTime = currentTime;
        }
    }

    public getHealth(): number {
        return this.health;
    }
}