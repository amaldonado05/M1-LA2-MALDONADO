export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1' });
    }

    init() {
        this.score = 0;
        this.starsCollected = 0;
        this.tintIndex = 0;
        this.gameOver = false;
        this.bombWarningShown = false; 
        this.colors = [0xff0000, 0xffa500, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x8f00ff];
    }

    create() {
        this.add.image(400, 300, 'level1_background').setDisplaySize(800, 600);

        const readyText = this.add.text(400, 300, 'Get Ready For Level 1', {
            fontSize: '48px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.platforms = this.physics.add.staticGroup();
        this.platformRects = [];
        this.platformRects.push(this.createPlatform(400, 584, 800, 32));
        this.platformRects.push(this.createPlatform(550, 350, 200, 20));
        this.platformRects.push(this.createPlatform(50, 250, 100, 20));
        this.platformRects.push(this.createPlatform(750, 220, 100, 20));
        this.platformRects.push(this.createPlatform(270, 450, 150, 20));
        this.platformRects.forEach(rect => rect.setVisible(false));

        this.player = this.physics.add.sprite(100, 450, 'dude').setBounce(0.2).setCollideWorldBounds(true);
        this.player.setVisible(false);
        this.player.body.enable = false;

        this.setupAnimations();
        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        this.stars.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setVisible(false);
            child.body.enable = false;
        });

        this.bombs = this.physics.add.group();

        this.scoreText = this.createText(16, 27, 'Score: 0').setVisible(false);
        this.starsCollectedUI = this.createText(600, 27, 'Stars: 0').setVisible(false);

        this.bombWarningText = this.add.text(225, 100, 'WATCH OUT FOR THE BOMBS!', {
            fontSize: '25px',
            fill: '#ff0000',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 5,
            fontFamily: 'Arial'
        }).setVisible(false);

        this.getReadySound = this.sound.add('get_ready_sound');
        this.levelMusic = this.sound.add('level1_music', { loop: true, volume: 0.5 });
        this.jumpSound = this.sound.add('jump_sound');

        this.getReadySound.play();

        this.time.delayedCall(2000, () => {
            readyText.destroy();

            this.platformRects.forEach(rect => rect.setVisible(true));

            this.player.setVisible(true);
            this.player.body.enable = true;

            this.stars.children.iterate(child => {
                child.setVisible(true);
                child.body.enable = true;
            });

            this.scoreText.setVisible(true);
            this.starsCollectedUI.setVisible(true);

            this.physics.add.collider(this.player, this.platforms);
            this.physics.add.collider(this.stars, this.platforms);
            this.physics.add.collider(this.bombs, this.platforms);
            this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
            this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

            this.getReadySound.stop();
            this.levelMusic.play();
        });
    }

    update() {
        if (this.gameOver || !this.player.body.enable) {
            return;
        }

        const onGround = this.player.body.touching.down;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && onGround) {
            this.player.setVelocityY(-330);
            this.jumpSound.play();
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
        this.starsCollected += 1;
        this.scoreText.setText('Score: ' + this.score);
        this.starsCollectedUI.setText('Stars: ' + this.starsCollected);

        this.sound.play('coin_get_sound'); 

        this.player.setTint(this.colors[this.tintIndex]);
        this.tintIndex = (this.tintIndex + 1) % this.colors.length;

        if (this.starsCollected % 5 === 0) {
            this.player.setScale(this.player.scaleX * 1.1, this.player.scaleY * 1.1);
        }

        if (this.starsCollected % 12 === 0) {
            const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

            if (!this.bombWarningShown) {
                this.bombWarningShown = true;
                this.bombWarningText.setVisible(true);

                this.time.delayedCall(2000, () => {
                    this.bombWarningText.setVisible(false);
                });
            }
        }

        const newX = Phaser.Math.Between(0, 800);
        const newStar = this.stars.create(newX, 0, 'star');
        newStar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        if (this.starsCollected >= 20) {
            this.levelMusic.stop();
            this.scene.start('Level2');
        }
    }

    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.gameOver = true;

        this.levelMusic.stop();

        this.time.delayedCall(0, () => {
            this.scene.start('GameOverScene', {
                score: this.score,
                stars: this.starsCollected
            });
        });
    }

    createPlatform(x, y, width, height, color = 0x228B22) {
        const rect = this.add.rectangle(x, y, width, height, color);
        this.physics.add.existing(rect, true);
        this.platforms.add(rect);
        return rect;
    }

    createText(x, y, content) {
        return this.add.text(x, y, content, {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            fontFamily: 'Arial'
        });
    }

    setupAnimations() {
        if (!this.anims.exists('left')) {
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!this.anims.exists('turn')) {
            this.anims.create({
                key: 'turn',
                frames: [{ key: 'dude', frame: 4 }],
                frameRate: 20
            });
        }

        if (!this.anims.exists('right')) {
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            });
        }
    }
}
