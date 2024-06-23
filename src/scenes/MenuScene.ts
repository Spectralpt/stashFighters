export  class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width * 0.5, height * 0.5, 'Press SPACE to start', {
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // @ts-ignore
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('gameScene');
        });
    }
}