export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    create() {
        if (this.game.bgMusic) {
            if (!this.game.bgMusic.isPlaying) {
                this.game.bgMusic.play();
            }
        } else {
            this.game.bgMusic = this.sound.add('bg_music', { loop: true, volume: 0.5 });
            this.game.bgMusic.play();
        }

        this.add.image(400, 300, 'bg_background').setDisplaySize(800, 600);

        this.add.text(400, 200, 'Jumpy', {
            fontSize: '64px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(400, 255, 'Made By Alvaro Maldonado Zavala', {
            fontSize: '25px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(400, 285, 'A Game Inspired By Flicky (1984)', {
            fontSize: '20px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        const startButton = this.add.text(400, 350, 'Start', {
            fontSize: '40px',
            stroke: '#000000',
            strokeThickness: 3,
            backgroundColor: '#af3a',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial',
            fill: '#00ff00',
            cursor: 'pointer'
        }).setOrigin(0.5).setInteractive();

        const rulesButton = this.add.text(400, 420, 'Rules', {
            fontSize: '33px',
            stroke: '#000000',
            strokeThickness: 3,
            backgroundColor: '#78ffff',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial',
            fill: '#00ffff',
            cursor: 'pointer'
        }).setOrigin(0.5).setInteractive();

        startButton.on('pointerover', () => startButton.setStyle({ fill: '#000000' }));
        startButton.on('pointerout', () => startButton.setStyle({ fill: '#00ff00' }));
        startButton.on('pointerdown', () => {
            if (this.game.bgMusic && this.game.bgMusic.isPlaying) {
                this.game.bgMusic.stop();
            }
            this.scene.start('Level1');
        });

        rulesButton.on('pointerover', () => rulesButton.setStyle({ fill: '#000000' }));
        rulesButton.on('pointerout', () => rulesButton.setStyle({ fill: '#00ffff' }));
        rulesButton.on('pointerdown', () => {
            this.scene.start('Rules');
        });
    }
}
