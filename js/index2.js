let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 500},
        debug: false
    }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

let game = new Phaser.Game(config);

function preload ()
{
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.spritesheet('mario', 
      'assets/mario.png',
      { frameWidth: 87, frameHeight: 169 }
  );

};

function create ()
{


  //background and platforms
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //player
    this.player = this.physics.add.sprite(100, 450, 'mario');
    this.player.setScale(.6);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
  
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('mario', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
  
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'mario', frame: 0 } ],
        frameRate: 20
    });
  
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('mario', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(this.player, platforms);
    
    cursors = this.input.keyboard.createCursorKeys();

};

function update ()
{
  if (cursors.left.isDown)
  {
    this.player.setVelocityX(-160);

    this.player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
    this.player.setVelocityX(160);

    this.player.anims.play('right', true);
  }
  else
  {
    this.player.setVelocityX(0);

    this.player.anims.play('turn');
  }

  if (cursors.up.isDown && this.player.body.touching.down)
  {
    this.player.setVelocityY(-330);
  }

};