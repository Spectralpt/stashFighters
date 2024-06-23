import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width * 0.5, height * 0.5, 'YOU DIED', {
            fontSize: '32px',
            color: '#ff0000',
            align: 'center'
        }).setOrigin(0.5);
    }

    update(time: number, delta: number) {
        super.update(time, delta);
    }
}
