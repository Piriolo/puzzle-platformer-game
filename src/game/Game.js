/**
 * Escena principal del juego
 */

import Player from '../player/Player.js';
import LevelManager from '../levels/LevelManager.js';
import AchievementManager from '../achievements/AchievementManager.js';
import AdManager from '../monetization/AdManager.js';
import IAPManager from '../monetization/IAPManager.js';

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
    
    this.levelManager = new LevelManager();
    this.achievementManager = new AchievementManager();
    this.adManager = new AdManager();
    this.iapManager = new IAPManager();
    
    this.player = null;
    this.currentLevel = null;
    this.score = 0;
    this.levelStartTime = 0;
    this.isPaused = false;
  }
  
  preload() {
    console.log('⏳ Cargando recursos...');
    
    // En una versión completa, aquí cargarías sprites, audio, etc.
    // this.load.image('player', 'assets/sprites/player.png');
    // this.load.image('coin', 'assets/sprites/coin.png');
    
    // Por ahora usamos placeholders
    this.load.on('complete', () => {
      console.log('✅ Recursos cargados');
    });
  }
  
  create() {
    console.log('🎨 Creando escena del juego...');
    
    // Crear mundo del juego
    this.createWorld();
    
    // Crear jugador
    this.player = new Player(this, 100, 450);
    this.createPlayerSprite();
    
    // Cargar primer nivel
    this.loadLevel(1);
    
    // Crear UI
    this.createUI();
    
    // Configurar controles
    this.setupControls();
    
    // Inicializar managers
    this.adManager.initialize('demo');
    this.iapManager.initialize('demo');
    
    console.log('✅ Juego listo para jugar!');
    console.log('📋 Controles: ← → para mover, ↑ para saltar, ESC para pausar');
  }
  
  createWorld() {
    // Fondo degradado
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xE0F6FF, 0xE0F6FF, 1);
    graphics.fillRect(0, 0, 800, 600);
    
    // Plataforma base
    this.platforms = this.physics.add.staticGroup();
    const ground = this.add.rectangle(400, 580, 800, 40, 0x8B4513);
    this.platforms.add(ground);
  }
  
  createPlayerSprite() {
    // Crear sprite del jugador (placeholder)
    this.playerSprite = this.add.circle(100, 450, 20, 0xFF6B6B);
    this.physics.add.existing(this.playerSprite);
    this.playerSprite.body.setCollideWorldBounds(true);
    
    // Colisión con plataformas
    this.physics.add.collider(this.playerSprite, this.platforms);
  }
  
  loadLevel(levelNumber) {
    console.log(`📍 Cargando nivel ${levelNumber}...`);
    
    this.currentLevel = this.levelManager.loadLevel(levelNumber);
    this.levelStartTime = Date.now();
    
    // Limpiar elementos anteriores
    if (this.collectiblesGroup) {
      this.collectiblesGroup.clear(true, true);
    }
    
    // Crear grupos
    this.collectiblesGroup = this.physics.add.group();
    this.platformsGroup = this.physics.add.staticGroup();
    
    // Generar plataformas
    this.createPlatforms();
    
    // Generar coleccionables
    this.createCollectibles();
    
    // Setup colisiones
    this.physics.add.overlap(
      this.playerSprite,
      this.collectiblesGroup,
      this.collectItem,
      null,
      this
    );
    
    console.log(`✅ Nivel ${levelNumber} cargado`);
  }
  
  createPlatforms() {
    const platforms = this.currentLevel.platforms;
    
    platforms.forEach(platform => {
      const color = this.getPlatformColor(platform.type);
      const plat = this.add.rectangle(
        platform.x,
        platform.y,
        platform.width,
        20,
        color
      );
      this.platformsGroup.add(plat);
    });
    
    // Colisión jugador con plataformas
    this.physics.add.collider(this.playerSprite, this.platformsGroup);
  }
  
  getPlatformColor(type) {
    const colors = {
      normal: 0x8B4513,
      ice: 0xADD8E6,
      bouncy: 0xFF69B4,
      fragile: 0xDEB887,
      moving: 0x9370DB
    };
    return colors[type] || colors.normal;
  }
  
  createCollectibles() {
    const collectibles = this.currentLevel.collectibles;
    
    collectibles.forEach(item => {
      const { color, radius } = this.getCollectibleStyle(item.type);
      const sprite = this.add.circle(item.x, item.y, radius, color);
      sprite.setData('type', item.type);
      this.collectiblesGroup.add(sprite);
    });
  }
  
  getCollectibleStyle(type) {
    const styles = {
      coin: { color: 0xFFD700, radius: 8 },
      star: { color: 0xFFFF00, radius: 12 },
      gem: { color: 0xFF00FF, radius: 10 }
    };
    return styles[type] || styles.coin;
  }
  
  collectItem(playerSprite, itemSprite) {
    const itemType = itemSprite.getData('type');
    
    // Recolectar en el player
    this.player.collect(itemType);
    
    // Actualizar score
    const points = { coin: 10, star: 50, gem: 100 };
    this.score += points[itemType] || 0;
    
    // Efecto visual
    this.tweens.add({
      targets: itemSprite,
      alpha: 0,
      scale: 1.5,
      duration: 200,
      onComplete: () => itemSprite.destroy()
    });
    
    // Actualizar UI
    this.updateUI();
    
    // Verificar logros
    this.checkLevelProgress();
    
    console.log(`✨ Recolectado: ${itemType} (+${points[itemType]} puntos)`);
  }
  
  createUI() {
    // Texto de score
    this.scoreText = this.add.text(16, 16, '', {
      fontSize: '20px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    });
    
    // Texto de vidas
    this.livesText = this.add.text(16, 50, '', {
      fontSize: '20px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    });
    
    // Texto de nivel
    this.levelText = this.add.text(400, 16, '', {
      fontSize: '20px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5, 0);
    
    // Instrucciones
    this.add.text(400, 570, '← → Mover  |  ↑ Saltar  |  ESC Pausa', {
      fontSize: '14px',
      fill: '#333333',
      backgroundColor: '#ffffff',
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5, 0.5);
    
    this.updateUI();
  }
  
  updateUI() {
    this.scoreText.setText(`🪙 Score: ${this.score}`);
    this.livesText.setText(`❤️ Vidas: ${this.player.lives}`);
    this.levelText.setText(`📍 Nivel ${this.levelManager.currentLevel}`);
  }
  
  setupControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
      ESC: Phaser.Input.Keyboard.KeyCodes.ESC,
      R: Phaser.Input.Keyboard.KeyCodes.R
    });
    
    // Pausar con ESC
    this.keys.ESC.on('down', () => this.togglePause());
    
    // Reiniciar con R
    this.keys.R.on('down', () => this.restartLevel());
  }
  
  update() {
    if (this.isPaused) return;
    
    // Movimiento horizontal
    if (this.cursors.left.isDown || this.keys.A.isDown) {
      this.playerSprite.body.setVelocityX(-200);
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      this.playerSprite.body.setVelocityX(200);
    } else {
      this.playerSprite.body.setVelocityX(0);
    }
    
    // Salto
    if ((this.cursors.up.isDown || this.keys.W.isDown || this.keys.SPACE.isDown) && this.playerSprite.body.touching.down) {
      this.playerSprite.body.setVelocityY(-400);
    }
    
    // Verificar si completó el nivel
    this.checkLevelCompletion();
  }
  
  checkLevelProgress() {
    // Actualizar progreso de logros
    this.achievementManager.updateProgress('coins_collected', this.player.coins);
    this.achievementManager.updateProgress('stars_collected', this.player.stars);
    this.achievementManager.updateProgress('gems_collected', this.player.gems);
  }
  
  checkLevelCompletion() {
    // Por simplicidad, nivel se completa al recolectar todos los items
    if (this.collectiblesGroup.getChildren().length === 0) {
      this.completeLevel();
    }
  }
  
  completeLevel() {
    console.log('🎉 ¡Nivel completado!');
    
    const levelTime = Math.floor((Date.now() - this.levelStartTime) / 1000);
    
    const stats = {
      coins: this.player.coins,
      time: levelTime
    };
    
    const result = this.levelManager.completeLevel(
      this.levelManager.currentLevel,
      stats
    );
    
    console.log(`⭐ Estrellas obtenidas: ${result.stars}/3`);
    
    // Actualizar logros
    this.achievementManager.updateProgress('level_complete', this.levelManager.currentLevel);
    this.achievementManager.updateProgress('levels_completed', this.levelManager.levelsCompleted.length);
    
    if (result.stars === 3) {
      this.achievementManager.updateProgress('three_stars', 1);
    }
    
    if (levelTime < 30) {
      this.achievementManager.updateProgress('level_time_under', levelTime);
    }
    
    // Mostrar anuncio si corresponde
    this.adManager.onLevelComplete();
    if (this.adManager.shouldShowAd()) {
      console.log('📺 Mostrando anuncio...');
      this.adManager.showInterstitialAd();
    }
    
    // Cargar siguiente nivel después de 2 segundos
    this.time.delayedCall(2000, () => {
      const nextLevel = this.levelManager.currentLevel + 1;
      if (nextLevel <= 20) {
        this.loadLevel(nextLevel);
      } else {
        console.log('🏆 ¡Juego completado!');
      }
    });
  }
  
  restartLevel() {
    console.log('🔄 Reiniciando nivel...');
    this.loadLevel(this.levelManager.currentLevel);
    this.playerSprite.setPosition(100, 450);
  }
  
  togglePause() {
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      console.log('⏸️ Juego pausado');
      this.physics.pause();
      
      // Mostrar texto de pausa
      this.pauseText = this.add.text(400, 300, 'PAUSA\nESC para continuar', {
        fontSize: '48px',
        fill: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 20, y: 15 },
        align: 'center'
      }).setOrigin(0.5);
    } else {
      console.log('▶️ Juego reanudado');
      this.physics.resume();
      
      if (this.pauseText) {
        this.pauseText.destroy();
      }
    }
  }
  
  showReviveOptions() {
    console.log('💀 Game Over - Opciones de revivir disponibles');
    console.log('1. Ver anuncio para continuar');
    console.log('2. Usar vida extra (IAP)');
    console.log('3. Reiniciar nivel');
    
    // Aquí mostrarías un menú con opciones
    this.restartLevel();
  }
}

export default Game;
