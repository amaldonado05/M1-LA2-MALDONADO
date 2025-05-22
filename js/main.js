import PreloadScene from './preload.js';
import MainMenu from './mainmenu.js';
import Rules from './rules.js';
import Level1 from './level1.js';
import Level2 from './level2.js';
import Level3 from './level3.js';
import GameOverScene from './gameover.js';
import Congratulations from './congratulations.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [PreloadScene, MainMenu, Rules, Level1, Level2, Level3, GameOverScene, Congratulations]
};

const game = new Phaser.Game(config);
