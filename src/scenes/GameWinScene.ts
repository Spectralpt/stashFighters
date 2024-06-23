import Phaser from 'phaser';

export class GameWinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameWinScene' });
    }

    create() {
        const { width, height } = this.scale;

       const button =  this.add.text(width * 0.5, height * 0.5, 'YOU WIN', {
            fontSize: '32px',
            color: '#00ff00',
            align: 'center'
        }).setOrigin(0.5);
       button.setInteractive()
         button.on('pointerdown', () => {
              this.scene.start('MenuScene');
         });
    }

    update(time: number, delta: number) {
        super.update(time, delta);
    }
}