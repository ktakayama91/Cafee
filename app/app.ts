class CafeeGame {

    constructor() {
        this.game = new Phaser.Game(800, 432, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update, collectDiamonds: this.collectDiamonds });
    }

    game: Phaser.Game;
    player: Phaser.Sprite;
    platforms: Phaser.Group;
    cursors: Phaser.CursorKeys;
    diamonds: Phaser.Group;

    collectDiamonds(player: Phaser.Sprite, diamond: any){
        diamond.kill();
    }

    preload() {
        this.game.load.image('background', 'dist/assets/layout.png');
        this.game.load.image('diamond', 'dist/assets/coffee.ico');
        this.game.load.image('platform', 'dist/assets/platform.png');
        this.game.load.spritesheet('baddie', 'dist/assets/sheep.png', 32, 27);
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.tileSprite(0, 0, 3000, 432, 'background');

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        var ground = this.platforms.create(0, this.game.world.height - 64, 'platform');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        // The player and its settings
        this.player = this.game.add.sprite(32, this.game.world.height - 130, 'baddie');
        this.player.scale.setTo(1.5, 1.5);

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        this.player.animations.add('right', [0, 1, 2], 10, true);
        this.player.animations.add('left', [3, 4, 5], 10, true);

        //  Finally some stars to collect
        this.diamonds = this.game.add.group();
        this.diamonds.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            var diamond = this.diamonds.create(i * 70, 0, 'diamond');
            diamond.scale.setTo(0.15, 0.15);

            //  Let gravity do its thing
            diamond.body.gravity.y = 300;

            //  This just gives each diamond a slightly random bounce value
            diamond.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        //  Our controls.
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.diamonds, this.platforms);

        this.game.physics.arcade.overlap(this.player, this.diamonds, this.collectDiamonds, null, this);

        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown)
        {
            //  Move to the left
            this.player.body.velocity.x = -150;

            this.player.animations.play('left');
            this.game.camera.x -= 2;
        }
        else if (this.cursors.right.isDown)
        {
            //  Move to the right
            this.player.body.velocity.x = 150;

            this.player.animations.play('right');
            this.game.camera.x += 2;
        }
        else
        {
            //  Stand still
            this.player.animations.stop();

            this.player.frame = 0;
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.body.velocity.y = -300;
        }
    }
    

}

window.onload = () => {

    var game = new CafeeGame();

};