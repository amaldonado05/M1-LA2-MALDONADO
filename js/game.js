var config = {
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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var starsCollectedUI;
var colors = [0xff0000, 0xffa500, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x8f00ff];
var tintIndex = 0;
var starsCollected = 0;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/player-sprite.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    this.add.image(400, 300, 'background').setDisplaySize(800, 600);

    platforms = this.add.group();

    // Helper function to create solid rectangle platforms
    function createPlatform(x, y, width, height, color = 0x228B22) {
        let rect = this.add.rectangle(x, y, width, height, color);
        this.physics.add.existing(rect, true); // true = static body
        platforms.add(rect);
        return rect;
    }

    // Create ground and ledges
    createPlatform.call(this, 400, 584, 800, 32);  // Ground
    createPlatform.call(this, 600, 400, 200, 20);  // Ledge 1
    createPlatform.call(this, 50, 250, 100, 20);   // Ledge 2
    createPlatform.call(this, 750, 220, 100, 20);  // Ledge 3

    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs = this.physics.add.group();

    scoreText = this.add.text(16, 27, 'Score: 0', {
        fontSize: '32px',
        fill: '#ffffff',
        fontFamily: 'Arial'
    });

    starsCollectedUI = this.add.text(600, 27, 'Stars: 0', {
        fontSize: '32px',
        fill: '#ffffff',
        fontFamily: 'Arial'
    });

    // Add collision with player, stars, bombs
    this.physics.add.collider(player, platforms.getChildren());
    this.physics.add.collider(stars, platforms.getChildren());
    this.physics.add.collider(bombs, platforms.getChildren());

    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update() {
    if (gameOver) return;

    if (cursors.left.isDown) {
        player.setVelocityX(-200);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    starsCollected += 1;
    scoreText.setText('Score: ' + score);
    starsCollectedUI.setText('Stars: ' + starsCollected);

    player.setTint(colors[tintIndex]);
    tintIndex = (tintIndex + 1) % colors.length;

    if (starsCollected % 5 === 0) {
        player.setScale(player.scaleX * 1.1, player.scaleY * 1.1);
    }

    if (starsCollected % 12 === 0) {
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }

    var newX = Phaser.Math.Between(0, 800);
    var newStar = stars.create(newX, 0, 'star');
    newStar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
}

function hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;

    this.add.text(400, 300, 'GAME OVER', {
    fontSize: '64px',
    fill: '#ffffff',
    fontFamily: 'Arial'
}).setOrigin(0.5, 0.5);

}
