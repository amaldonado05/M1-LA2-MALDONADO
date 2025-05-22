export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score;
        this.stars = data.stars;
    }

    create() {
        this.add.image(400, 300, 'level1_background').setDisplaySize(800, 600);

        // Play game over sound once
        this.sound.play('gameover_sound');

        this.add.text(400, 200, 'GAME OVER', {
            fontSize: '64px',
            fill: '#ff0000',
            stroke: '#000000',
            strokeThickness: 6,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(400, 280, `Score: ${this.finalScore}\nStars: ${this.stars}`, {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5);

        const retryButton = this.add.text(400, 370, 'Retry', {
            fontSize: '40px',
            fill: '#ff0000',
            stroke: '#000000',
            strokeThickness: 3,
            backgroundColor: '#ffffff',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial'
        }).setOrigin(0.5).setInteractive();

        retryButton.on('pointerover', () => retryButton.setStyle({ fill: '#000000' }));
        retryButton.on('pointerout', () => retryButton.setStyle({ fill: '#ff0000' }));
        retryButton.on('pointerdown', () => this.scene.start('Level1'));

        const menuButton = this.add.text(400, 440, 'Back to Menu', {
            fontSize: '32px',
            fill: '#0000ff',
            stroke: '#000000',
            strokeThickness: 2,
            backgroundColor: '#ffffff',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial'
        }).setOrigin(0.5).setInteractive();

        menuButton.on('pointerover', () => menuButton.setStyle({ fill: '#000000' }));
        menuButton.on('pointerout', () => menuButton.setStyle({ fill: '#0000ff' }));
        menuButton.on('pointerdown', () => this.scene.start('MainMenu'));
    }
}
