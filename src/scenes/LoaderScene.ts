export class LoaderScene extends Phaser.Scene {
    private loadingText!: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'LoaderScene' });
    }

    create() {
        const { width, height } = this.scale;
        this.loadingText = this.add.text(width * 0.5, height * 0.5, 'Loading: 0%', {
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
    }

    preload() {
        this.load.on('progress', this.updateLoadingText, this);

        this.load.spritesheet('player', 'assets/player-sheet.png', {frameWidth:32,frameHeight:32});
        this.load.image('base_tiles', 'assets/tilemap2.png');
        this.load.tilemapTiledJSON('tilemap','assets/maptest.json');
        this.load.image('box', 'assets/Boxv2.png');
        this.load.image('collider', 'assets/collider.png');
        this.load.css('styles', 'assets/styles.css');
        this.load.spritesheet('enemy', 'assets/slime-sheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('saber', 'assets/attack-sheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('tree', 'assets/tree1.png');
        this.load.image('endZone', 'assets/endZone.png');
        this.load.image('arrow', 'assets/arrow.png');

        this.load.on('complete', this.startNextScene, this);
    }

    updateLoadingText(progress: number) {
        if (this.loadingText)
            this.loadingText.setText(`Loading: ${Math.round(progress * 100)}%`);
    }

    startNextScene() {
        this.scene.start('MenuScene');
    }
}