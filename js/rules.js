export default class Rules extends Phaser.Scene {
    constructor() {
        super({ key: 'Rules' });
    }

    create() {
        this.add.image(400, 300, 'bg_background').setDisplaySize(800, 600);

        if (this.game.bgMusic && !this.game.bgMusic.isPlaying) {
            this.game.bgMusic.play();
        }

        this.add.text(400, 150, 'Game Rules', {
            fontSize: '48px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        const rulesText = 
            "Controls: WASD - Movement, Space = Jump\n\n" +
            "Level 1: You must collect 20 stars to pass to Level 2.\n" +
            "Level 2: You must collect 30 stars to pass to Level 3.\n" +
            "Level 3: You must collect 40 stars to win the game.   \n" +
            "\n I hope you enjoy this game, have fun!";

        this.add.text(400, 300, rulesText, {
            fontSize: '24px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3,
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5);

        const backButton = this.add.text(400, 500, 'Back to Menu', {
            fontSize: '32px',
            fill: '#00ff00',
            stroke: '#000000',
            strokeThickness: 4,
            backgroundColor: '#af3a',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial',
            cursor: 'pointer'
        }).setOrigin(0.5).setInteractive();

        backButton.on('pointerover', () => backButton.setStyle({ fill: '#000000' }));
        backButton.on('pointerout', () => backButton.setStyle({ fill: '#00ff00' }));
        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}
