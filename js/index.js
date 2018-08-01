
let gameScene = new Phaser.Scene('Game')

let config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  scene: gameScene,
  physics: {
      default: 'arcade',
      arcade: { gravity: { y: 300 } }
  },
};

let game = new Phaser.Game(config);

gameScene.preload = function preload() {
  this.load.spritesheet('dude', 'assets/dude.png',{
    frameWidth:288, frameHeight:48, endframe: 32
  });
}; 

gameScene.create = function create() {

  let config = {
    key: 'dude',
    frames: this.anims.generateFrameNumbers('dude',{
      start:1,
      end: 8
    }),
    repeat: -1,
    frameRate: 15
  };
  this.anims.create(config);

  this.dude = this.add.sprite(400, 300, 'dude');

  this.dude.anims.play('dude');
};

gameScene.update = function update() {

};