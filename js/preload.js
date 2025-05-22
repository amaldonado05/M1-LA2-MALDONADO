export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        this.load.image('level1_background', 'assets/images/level1_background.png'); 
        this.load.image('bg_background', 'assets/images/bg_background.png');         

        this.load.image('level2_background', 'assets/images/level2_background.png'); 

        this.load.image('level3_background', 'assets/images/level3_background.png'); 

        this.load.image('congrats_background', 'assets/images/congrats_background.png'); 

        this.load.image('star', 'assets/images/star.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.spritesheet('dude', 'assets/images/player-sprite.png', { frameWidth: 32, frameHeight: 48 });

        this.load.audio('bg_music', 'assets/audio/bg_music.mp3');
        this.load.audio('gameover_sound', 'assets/audio/gameover_sound.mp3');
        this.load.audio('winning_music', 'assets/audio/winning_music.mp3');
        this.load.audio('level1_music', 'assets/audio/level1_music.mp3');
        this.load.audio('level2_music', 'assets/audio/level2_music.mp3');
        this.load.audio('level3_music', 'assets/audio/level3_music.mp3');
        this.load.audio('get_ready_sound', 'assets/audio/get_ready_sound.mp3');
        this.load.audio('coin_get_sound', 'assets/audio/coin_get_sound.mp3');
        this.load.audio('jump_sound', 'assets/audio/jump_sound.mp3');
    }

    create() {
        this.scene.start('MainMenu');
    }
}
