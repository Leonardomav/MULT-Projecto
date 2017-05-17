MainGame = function(game) {
  this.game = game;
  this.player;
  this.enemies;
  this.background;
  this.bgday;
  this.bgnight;
  this.textHUD;
  this.moveKeys;
  this.actionKey;
  this.pauseKey;
  this.endKey;
  this.facing;
  this.state;
  this.menu;
  this.arcade;
  this.jumpTimer = 0;
  this.switchTimer = 0;
  this.pauseTimer = 0;
  this.pickupCounter = 0;
  this.game.paused = false;

  this.timer = 0;

  this.platforms;
  this.day;
  this.night;
  this.cadeiras;
  this.endTut;
  this.spikes;
  this.menus;
  this.fim;

  this.pauseLabel;
  this.continueLabel;
  this.exitLabel;
  this.endText;

  this.level;
};

MainGame.prototype = {

  loadLevel: function(level) {

    let platform;

    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {

        if (level[i][j] === 'x') {
          platform = this.game.add.sprite(40 * j, 175 + 40 * i, 'platform');
          this.platforms.add(platform);
          platform.anchor.setTo(0.5);
          platform.enableBody = true;
          platform.body.immovable = true;
          platform.body.moves = false;
          platform.scale.set(0.066);
        }

        if (level[i][j] === 'd') {
          platform = this.game.add.sprite(40 * j, 175 + 40 * i, 'day');
          this.day.add(platform);
          platform.anchor.setTo(0.5);
          platform.enableBody = true;
          platform.body.immovable = true;
          platform.body.moves = false;
          platform.scale.set(0.066);
        }

        if (level[i][j] === 'n') {
          platform = this.game.add.sprite(40 * j, 175 + 40 * i, 'night');
          this.night.add(platform);
          platform.anchor.setTo(0.5);
          platform.body.enable = false;
          platform.visible = false;
          platform.body.immovable = true;
          platform.body.moves = false;
          platform.scale.set(0.066);

        }

        if (level[i][j] === 's') {
          var spike = this.game.add.sprite(40 * j, 190  + 40 * i, 'spike');
          this.spikes.add(spike);
          spike.anchor.setTo(0.5);
          spike.enableBody = true;
          spike.body.immovable = true;
          spike.body.moves = false;
          spike.scale.set(0.1);
          spike.body.setSize(400,0);
        }

        if (level[i][j] === '&') {

          var cadeira = this.game.add.sprite(40 * j, 120 + 40 * i, 'cadeira');
          this.cadeiras.add(cadeira);
          cadeira.body.enable = true;
          cadeira.body.immovable = true;
          cadeira.body.moves = false;
          cadeira.scale.set(0.50);
        }

        if (level[i][j] === 'b') {
          var egg = this.game.add.sprite(40 * j, 170 + 40 * i, 'beer');
          this.endTut.add(egg)
          egg.body.enable = true;
          egg.body.immovable = true;
          egg.body.moves = false;
          egg.scale.set(0.08);
        }

        if (level[i][j] === '@') {
          this.player = this.game.add.sprite(40 * j, 100 + 40 * i, 'player');
          this.player.body.collideWorldBounds = true;
          this.player.body.gravity.y = 1000;
          this.player.body.maxVelocity.y = 500;
          this.player.scale.set(2.5);
          this.player.body.setSize(12, 32, 12 , 0);
          this.player.animations.add('right', [22, 23, 24, 25], 10, true);
          this.player.animations.add('left', [33, 34, 35, 36], 10, true);
          this.player.animations.add('iddle right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 10, true);
          this.player.animations.add('iddle left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);
          this.game.camera.follow(this.player);
        }

        if (level[i][j] === 'e') {
          var enemy = this.game.add.sprite(40 * j, 100 + 40 * i, 'teacher');
          this.enemies.add(enemy);
          enemy.body.setSize(12, 32, 10, 0);
          enemy.animations.add('walkLeft', [0, 1, 2, 3], 10, true);
          enemy.animations.add('walkRight', [4, 5, 6, 7], 10, true);
          enemy.scale.set(2.5);
          enemy.anchor.setTo(0.5);
          enemy.body.velocity.x = -80;
          enemy.enableBody = true;
          enemy.collideWorldBounds = true;
          enemy.animations.play('walkLeft');
        }
      }
    }
  },



  pause: function(game) {


    if(this.game.paused === false && this.game.time.now > this.pauseTimer){

      this.game.paused = true;
      this.pauseLabel.visible = true;
      this.continueLabel.visible = true;
      this.exitLabel.visible = true;

      this.game.world.bringToTop(this.menus);
      this.endKey.onDown.add(function(){
        end(this.game);
      },this);
    }
    else if (this.game.paused === true && this.game.time.now > this.pauseTimer){
      this.game.paused = false;
      this.pauseLabel.visible = false;
      this.continueLabel.visible = false;
      this.exitLabel.visible = false;
    }

    this.pauseTimer = this.game.time.now + 50;

  },

  preload: function() {

    this.game.load.spritesheet('player', '/ScriptsInGame/imagens/player.png', 32,32,45);
    this.game.load.spritesheet('teacher', '/ScriptsInGame/imagens/teacher.png', 32,32,8);
    this.game.load.image('platform', '/ScriptsInGame/imagens/blococomun.png');
    this.game.load.image('day','/ScriptsInGame/imagens/blocodia.png');
    this.game.load.image('night', '/ScriptsInGame/imagens/bloconight.png');
    this.game.load.image('hudpickup','/ScriptsInGame/imagens/hudpickup.png');
    this.game.load.image('cadeira','/ScriptsInGame/imagens/pickup.png');
    this.game.load.image('beer','/ScriptsInGame/imagens/beer.png');
    this.game.load.image('spike','/ScriptsInGame/imagens/spikes.png');
    this.game.load.image('bgday','/ScriptsInGame/imagens/BGday.png');
    this.game.load.image('bgnight','/ScriptsInGame/imagens/BGnight.png');
    this.game.load.audio('jump', '/ScriptsInGame/sons/jump.mp3')
    this.game.load.audio('daytonight', '/ScriptsInGame/sons/DtoN.mp3')
    this.game.load.audio('pickup', '/ScriptsInGame/sons/pickup.mp3')
    this.game.load.audio('kill', '/ScriptsInGame/sons/kill.mp3')
  },

  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.state='day';

    this.background = this.game.add.tileSprite(0, 0, 1920, 1080, 'bgnight');
    this.background = this.game.add.tileSprite(0, 0, 1920, 1080, 'bgday');
    this.background.scale.set(0.75);
    this.background.fixedToCamera = true;

    this.pickupHUD = this.game.add.sprite(20,0, 'hudpickup');
    this.pickupHUD.scale.set(0.50);
    this.pickupHUD.fixedToCamera = true;
    textHUD = this.game.add.text(85, 15, this.pickupCounter.toString(), {
      font: '30px ../Styles/Nexa Bold.otf'
    });
    textHUD.fixedToCamera = true;
    var text = 'Passaste a ' + this.pickupCounter.toString() + ' cadeiras! \n \n Carrega ENTER \n para voltar ao menu';
    this.endText = this.game.add.text(this.game.width / 4  + 150, this.game.height / 4,text,{
      font: '50px ../Styles/Nexa Bold.otf'
    });
    this.endText.fixedToCamera = true;
    this.endText.visible = false;

    this.platforms = this.game.add.group();
    this.day = this.game.add.group();
    this.night = this.game.add.group();
    this.cadeiras = this.game.add.group();
    this.endTut = this.game.add.group();
    this.spikes = this.game.add.group();
    this.enemies = this.game.add.group();
    this.menus = this.add.group();
    this.fim = this.add.group();

    this.jump = this.game.add.audio('jump')
    this.daytonight = this.game.add.audio('daytonight')
    this.pickup = this.game.add.audio('pickup')
    this.endlvl = this.game.add.audio('endlvl')
    this.kill = this.game.add.audio('kill')

    this.game.physics.arcade.gravity.y = 275;
    this.moveKey = this.game.input.keyboard.createCursorKeys();
    this.actionKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    this.pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.endKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.pauseKey.onDown.add(this.pause, this);

    this.pauseLabel = this.game.add.text(this.game.world.centerX - 175, this.game.world.centerY - 140, 'PAUSE MENU', {
      font: '50px ../Styles/Nexa Bold.otf'
    });
    this.continueLabel = this.game.add.text(this.game.world.centerX - 175, this.game.world.centerY - 40, 'Press Esc to Continue', {
      font: '50px ../Styles/Nexa Bold.otf'
    });
    this.exitLabel = this.game.add.text(this.game.world.centerX - 175, this.game.world.centerY + 40, 'Press Enter to Exit', {
      font: '50px ../Styles/Nexa Bold.otf'
    });

    this.menus.add(this.pauseLabel);
    this.menus.add(this.continueLabel);
    this.menus.add(this.exitLabel);

    this.fim.add(this.endText);

    this.pauseLabel.visible = false;
    this.pauseLabel.fixedToCamera = true;
    this.continueLabel.visible = false;
    this.continueLabel.fixedToCamera = true;
    this.exitLabel.visible = false;
    this.exitLabel.fixedToCamera = true;
    this.game.world.enableBody = true;
    this.game.world.setBounds(0, 0, 7680, 720);

    this.loadLevel(this.level);

    this.game.physics.arcade.enable(this.platforms, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.day, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.night, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.cadeiras, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.endTut, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.spikes,Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.player,Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.enemies,Phaser.Physics.ARCADE);

  },

  update: function() {

    this.player.body.velocity.x = 0;
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.player, this.day);
    this.game.physics.arcade.collide(this.player, this.night);
    this.game.physics.arcade.collide(this.player, this.enemies,this.deathHandler,null,this);
    this.game.physics.arcade.overlap(this.player, this.spikes, this.deathHandler, null, this);
    this.game.physics.arcade.overlap(this.player, this.endTut, this.endHandler, null, this);
    this.game.physics.arcade.overlap(this.player, this.cadeiras, this.overlapHandler, null, this);

    if (this.player.body.onFloor()) {
      this.kill.play()
      this.game.state.start('game');
      this.pickupCounter = 0;
      textHUD.setText(this.pickupCounter.toString());
    }


    if (this.moveKey.left.isDown) {
      this.player.body.velocity.x = -150;
      if (this.facing != 'left') {
        this.player.animations.play('left');
        this.facing = 'left';
      }
    } else if (this.moveKey.right.isDown) {
      this.player.body.velocity.x = 150;
      if (this.facing != 'right') {
        this.player.animations.play('right');
        this.facing = 'right';
      }
    } else {
      if (this.facing != 'idle') {

        if (this.facing == 'right') {
          this.player.animations.play('iddle right');
        } else {
          this.player.animations.play('iddle left');
        }

        this.facing = 'idle';
      }
    }

    if (this.moveKey.up.isDown && this.player.body.touching.down && this.game.time.now > this.jumpTimer) {
      this.jump.play();
      this.player.body.velocity.y = -500;
      this.jumpTimer = this.game.time.now + 750;

    }

    if (this.actionKey.isDown && this.game.time.now > this.switchTimer) {
      if (this.state != 'day') {

        this.daytonight.play();
        this.background.loadTexture('bgday');
        this.day.setAll('body.enable', true);
        this.day.setAll('visible', true);
        this.night.setAll('body.enable', false);
        this.night.setAll('visible', false);
        this.state = 'day';

      } else if (this.state != 'night') {

        this.daytonight.play();
        this.background.loadTexture('bgnight');
        this.day.setAll('body.enable', false);
        this.day.setAll('visible', false);
        this.night.setAll('body.enable', true);
        this.night.setAll('visible', true);
        this.state = 'night';

      }
      this.switchTimer = this.game.time.now + 200;
    }
    this.enemies.forEachAlive(function(enemy) {
      this.game.physics.arcade.collide(enemy, this.platforms, this.moveEnemy,this.moveEnemyHandler,this);
    },this);

    this.timer = this.game.time.now;
  },

  moveEnemy: function(enemy,platform) {
    if (enemy.body.velocity.x > 0 && enemy.x > platform.x + platform.width / 2) {
        enemy.body.velocity.x *= -1;
    }
    else if(enemy.body.velocity.x < 0 && enemy.x < platform.x - platform.width / 2 ){
        enemy.body.velocity.x *= -1;
    }
    if (enemy.body.velocity.x > 0) {
      enemy.animations.play('walkRight');
    } else {
      enemy.animations.play('walkLeft');
    }
  },

  moveEnemyHandler: function(enemy,platform){
    return true;
  },

  overlapHandler: function(player, item) {
    this.pickup.play();
    this.pickupCounter++;
    textHUD.setText(this.pickupCounter.toString());
    item.kill();
  },

  endHandler: function(player, item){
    item.kill();
    this.endText.visible = true;
    console.log(this.arcade);
    if (this.arcade === 1){
      var text = 'Passaste a ' + this.pickupCounter.toString() + ' cadeiras! \n Tempo: ' + this.timer / 1000 + 's' + ' \n Carrega ENTER \n para voltar ao menu';
      this.endText.setText(text);
    }
    else{
      var text = 'Passaste a ' + this.pickupCounter.toString() + ' cadeiras! \n \n Carrega ENTER \n para voltar ao menu';
      this.endText.setText(text);
    }
    this.game.paused = true;
    this.game.world.bringToTop(this.fim);
    this.endKey.onDown.add(function(){
      end(this.game);
    },this);

  },

  deathHandler: function(player, item){
    this.kill.play()
    player.kill();
    this.game.state.start(this.game.state.current);

  },

  setLevel: function(level){
    this.level = level;
  },

  setState: function(state) {
    this.state = state;
  },

  setFacing: function(facing) {
    this.facing = facing;
  },

  setArcade: function(arcade){
    this.arcade = arcade;
  },

  render: function() {
    /*this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.body(this.player);
    this.game.debug.bodyInfo(this.player,32,32);
    this.enemies.forEach(function(enemy) {
      this.game.debug.body(enemy);
    }, this);
    this.spikes.forEach(function(spike) {
      this.game.debug.body(spike);
    }, this);
    this.platforms.forEach(function(platform) {
      this.game.debug.body(platform);
    }, this);
    */
  },

}

start = function(level,arcade = 0){

  hideMenu = (function(){
    var menu = document.getElementById('menu');
    menu.style.visibility = 'hidden';
    var jogo = document.getElementById('game');
    jogo.style.visibility = 'visible';
    jogo.style.display = 'block';
    var body = document.getElementsByTagName('body')[0];
    body.style.height = '75px';
  });

  switch (level) {
    case 1:
      MainGame.prototype.setLevel(lvl1);
      MainGame.prototype.setFacing('right');
      break;
    case 2:
      MainGame.prototype.setLevel(lvl2);
      MainGame.prototype.setFacing('right');
      break;
    case 3:
      MainGame.prototype.setLevel(lvl3);
      MainGame.prototype.setFacing('right');
      break;
    case 4:
      MainGame.prototype.setLevel(lvl4);
      MainGame.prototype.setFacing('right');
      break;
    case 5:
      MainGame.prototype.setLevel(lvl5);
      MainGame.prototype.setFacing('right');
      break;
    case 6:
      MainGame.prototype.setLevel(lvl6);
      MainGame.prototype.setFacing('right');
      break;
  }
  console.log(arcade);
  if (arcade === 1){
    MainGame.prototype.setArcade(1);
  }
  else{
    MainGame.prototype.setArcade(0);
  }
  var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game');
  game.state.add('game',MainGame);
  game.state.start('game');
  hideMenu();

}

end = function(game){

  console.log('Ending');
  showMenu = (function(){
    var menu = document.getElementById('menu');
    menu.style.visibility = 'visible';
    var body = document.getElementsByTagName('body')[0];
    body.style.height = '100vh';
  });
  game.destroy();
  showMenu();
}
