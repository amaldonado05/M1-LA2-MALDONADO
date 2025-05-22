export default class Congratulations extends Phaser.Scene {
    constructor() {
        super({ key: 'Congratulations' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        this.add.image(400, 300, 'congrats_background').setDisplaySize(800, 600);

        this.sound.play('winning_music', { volume: 0.5 });

        this.add.text(400, 200, 'Congratulations!', {
            fontSize: '64px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            fontFamily: 'Arial',
        }).setOrigin(0.5);

        this.add.text(400, 280, `You beat the game, you're a pro!`, {
            fontSize: '32px',
            fill: '#ffff00',
            stroke: '#000000',
            strokeThickness: 4,
            fontFamily: 'Arial',
        }).setOrigin(0.5);

        const playAgainBtn = this.add.text(400, 380, 'Play Again', {
            fontSize: '36px',
            fill: '#00ff00',
            stroke: '#000000',
            strokeThickness: 3,
            backgroundColor: '#af3a',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial',
            align: 'center',
            cursor: 'pointer',
        }).setOrigin(0.5).setInteractive();

        playAgainBtn.on('pointerover', () => playAgainBtn.setStyle({ fill: '#000000' }));
        playAgainBtn.on('pointerout', () => playAgainBtn.setStyle({ fill: '#00ff00' }));
        playAgainBtn.on('pointerdown', () => {
            this.sound.stopAll();  
            this.scene.start('Level1');
        });

        const backToMenuBtn = this.add.text(400, 460, 'Back to Menu', {
            fontSize: '36px',
            fill: '#00ffff',
            stroke: '#000000',
            strokeThickness: 3,
            backgroundColor: '#78ffff',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial',
            align: 'center',
            cursor: 'pointer',
        }).setOrigin(0.5).setInteractive();

        backToMenuBtn.on('pointerover', () => backToMenuBtn.setStyle({ fill: '#000000' }));
        backToMenuBtn.on('pointerout', () => backToMenuBtn.setStyle({ fill: '#00ffff' }));
        backToMenuBtn.on('pointerdown', () => {
            this.sound.stopAll();  
            this.scene.start('MainMenu');
        });
    }
}
