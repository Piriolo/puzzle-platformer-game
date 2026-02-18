/**
 * Escena principal del juego - Versión mejorada con personaje animado
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
    
    // Particles
    this.particles = null;
  }
  
  preload() {
    console.log('⏳ Cargando recursos...');
    
    // Como no tenemos sprites externos, crearemos gráficos procedurales
    // En una versión completa cargarías sprites reales aquí
    
    this.load.on('complete', () => {
      console.log('✅ Recursos cargados');
    });
  }
  
  create() {
    console.log('🎨 Creando escena del juego...');
    
    // Crear gráficos procedurales
    this.createProceduralGraphics();
    
    // Crear mundo del juego
    this.createWorld();
    
    // Crear sistema de partículas
    this.createParticleSystem();
    
    // Crear jugador animado
    this.player = new Player(this, 100, 450);
    this.createAnimatedPlayer();
    
    // Cargar primer nivel
    this.loadLevel(1);
    
    // Crear UI mejorada
    this.createEnhancedUI();
    
    // Configurar controles
    this.setupControls();
    
    // Inicializar managers
    this.adManager.initialize('demo');
    this.iapManager.initialize('demo');
    
    // Efectos de fondo
    this.createBackgroundEffects();
    
    console.log('✅ Juego listo para jugar!');
    console.log('📋 Controles: ← → para mover, ↑ para saltar, ESC para pausar');
  }
  
  createProceduralGraphics() {
    // Crear sprite del personaje (un lindo personaje cuadrado con ojos)
    const playerGraphics = this.add.graphics();
    
    // Cuerpo principal (redondeado)
    playerGraphics.fillStyle(0x4ECDC4, 1);
    playerGraphics.fillRoundedRect(-20, -25, 40, 50, 8);
    
    // Ojos
    playerGraphics.fillStyle(0xFFFFFF, 1);
    playerGraphics.fillCircle(-10, -10, 6);
    playerGraphics.fillCircle(10, -10, 6);
    
    // Pupilas
    playerGraphics.fillStyle(0x000000, 1);
    playerGraphics.fillCircle(-10, -10, 3);
    playerGraphics.fillCircle(10, -10, 3);
    
    // Boca sonriente
    playerGraphics.lineStyle(2, 0x000000, 1);
    playerGraphics.beginPath();
    playerGraphics.arc(0, 0, 8, 0, Math.PI);
    playerGraphics.strokePath();
    
    // Brazos
    playerGraphics.fillStyle(0x4ECDC4, 1);
    playerGraphics.fillRoundedRect(-25, -5, 8, 20, 4); // Brazo izquierdo
    playerGraphics.fillRoundedRect(17, -5, 8, 20, 4); // Brazo derecho
    
    // Piernas
    playerGraphics.fillRoundedRect(-15, 20, 10, 8, 4); // Pierna izquierda
    playerGraphics.fillRoundedRect(5, 20, 10, 8, 4); // Pierna derecha
    
    playerGraphics.generateTexture('player_idle', 50, 60);
    playerGraphics.destroy();
    
    // Crear sprite del personaje saltando
    const playerJumpGraphics = this.add.graphics();
    playerJumpGraphics.fillStyle(0x4ECDC4, 1);
    playerJumpGraphics.fillRoundedRect(-20, -25, 40, 50, 8);
    playerJumpGraphics.fillStyle(0xFFFFFF, 1);
    playerJumpGraphics.fillCircle(-10, -12, 6);
    playerJumpGraphics.fillCircle(10, -12, 6);
    playerJumpGraphics.fillStyle(0x000000, 1);
    playerJumpGraphics.fillCircle(-10, -14, 3);
    playerJumpGraphics.fillCircle(10, -14, 3);
    // Boca sorprendida
    playerJumpGraphics.fillCircle(0, 2, 5);
    // Brazos hacia arriba
    playerJumpGraphics.fillRoundedRect(-25, -20, 8, 20, 4);
    playerJumpGraphics.fillRoundedRect(17, -20, 8, 20, 4);
    // Piernas juntas
    playerJumpGraphics.fillRoundedRect(-10, 20, 20, 8, 4);
    playerJumpGraphics.generateTexture('player_jump', 50, 60);
    playerJumpGraphics.destroy();
    
    // Crear sprites de coleccionables mejorados
    this.createCollectibleGraphics();
  }
  
  createCollectibleGraphics() {
    // Moneda animada
    const coinGraphics = this.add.graphics();
    coinGraphics.fillStyle(0xFFD700, 1);
    coinGraphics.fillCircle(12, 12, 10);
    coinGraphics.fillStyle(0xFFA500, 1);
    coinGraphics.fillCircle(12, 12, 6);
    coinGraphics.lineStyle(2, 0xFFFF00, 1);
    coinGraphics.strokeCircle(12, 12, 10);
    coinGraphics.generateTexture('coin', 24, 24);
    coinGraphics.destroy();
    
    // Estrella brillante
    const starGraphics = this.add.graphics();
    starGraphics.fillStyle(0xFFFF00, 1);
    const points = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI * 2) / 10 - Math.PI / 2;
      const radius = i % 2 === 0 ? 15 : 7;
      points.push(18 + Math.cos(angle) * radius);
      points.push(18 + Math.sin(angle) * radius);
    }
    starGraphics.fillPoints(points, true);
    starGraphics.lineStyle(2, 0xFFFFFF, 1);
    starGraphics.strokePoints(points, true);
    starGraphics.generateTexture('star', 36, 36);
    starGraphics.destroy();
    
    // Gema preciosa
    const gemGraphics = this.add.graphics();
    gemGraphics.fillStyle(0xFF00FF, 1);
    gemGraphics.beginPath();
    gemGraphics.moveTo(15, 5);
    gemGraphics.lineTo(25, 15);
    gemGraphics.lineTo(15, 28);
    gemGraphics.lineTo(5, 15);
    gemGraphics.closePath();
    gemGraphics.fillPath();
    gemGraphics.lineStyle(2, 0xFF69B4, 1);
    gemGraphics.strokePath();
    gemGraphics.generateTexture('gem', 30, 30);
    gemGraphics.destroy();
  }
  
  createWorld() {
    // Cielo con nubes
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xE0F6FF, 0xE0F6FF, 1);
    sky.fillRect(0, 0, 800, 600);
    
    // Nubes decorativas
    this.createClouds();
    
    // Plataforma base con textura
    this.platforms = this.physics.add.staticGroup();
    const groundGraphics = this.add.graphics();
    groundGraphics.fillStyle(0x8B4513, 1);
    groundGraphics.fillRect(0, 0, 800, 40);
    groundGraphics.fillStyle(0x654321, 1);
    for (let i = 0; i < 800; i += 40) {
      groundGraphics.fillRect(i, 0, 38, 5);
    }
    groundGraphics.generateTexture('ground', 800, 40);
    groundGraphics.destroy();
    
    const ground = this.add.image(400, 580, 'ground');
    this.physics.add.existing(ground, true);
    this.platforms.add(ground);
  }
  
  createClouds() {
    this.clouds = [];
    for (let i = 0; i < 5; i++) {
      const cloud = this.add.graphics();
      cloud.fillStyle(0xFFFFFF, 0.7);
      cloud.fillCircle(0, 0, 20);
      cloud.fillCircle(15, -5, 15);
      cloud.fillCircle(-15, -5, 15);
      cloud.fillCircle(25, 5, 12);
      cloud.fillCircle(-25, 5, 12);
      
      cloud.x = Phaser.Math.Between(50, 750);
      cloud.y = Phaser.Math.Between(50, 200);
      cloud.speed = Phaser.Math.FloatBetween(0.1, 0.3);
      
      this.clouds.push(cloud);
    }
  }
  
  createParticleSystem() {
    // Sistema de partículas para efectos
    this.particlesGraphics = this.add.graphics();
    this.particlesGraphics.fillStyle(0xFFFFFF, 1);
    this.particlesGraphics.fillCircle(4, 4, 4);
    this.particlesGraphics.generateTexture('particle', 8, 8);
    this.particlesGraphics.destroy();
    
    this.particles = this.add.particles('particle');
  }
  
  createAnimatedPlayer() {
    // Crear sprite del jugador con animaciones
    this.playerSprite = this.add.sprite(100, 450, 'player_idle');
    this.playerSprite.setScale(1);
    
    // Añadir física
    this.physics.add.existing(this.playerSprite);
    this.playerSprite.body.setCollideWorldBounds(true);
    this.playerSprite.body.setSize(40, 50);
    this.playerSprite.body.setBounce(0.1);
    
    // Colisión con plataformas
    this.physics.add.collider(this.playerSprite, this.platforms);
    
    // Estado del jugador
    this.playerSprite.isJumping = false;
    this.playerSprite.facingRight = true;
  }
  
  createBackgroundEffects() {
    // Estrellas de fondo parpadeantes
    this.backgroundStars = [];
    for (let i = 0; i < 20; i++) {
      const star = this.add.circle(
        Phaser.Math.Between(0, 800),
        Phaser.Math.Between(0, 400),
        2,
        0xFFFFFF,
        0.5
      );
      
      this.tweens.add({
        targets: star,
        alpha: 1,
        duration: Phaser.Math.Between(1000, 2000),
        yoyo: true,
        repeat: -1
      });
      
      this.backgroundStars.push(star);
    }
  }
  
  loadLevel(levelNumber) {
    console.log(`📍 Cargando nivel ${levelNumber}...`);
    
    this.currentLevel = this.levelManager.loadLevel(levelNumber);
    this.levelStartTime = Date.now();
    
    // Limpiar elementos anteriores
    if (this.collectiblesGroup) {
      this.collectiblesGroup.clear(true, true);
    }
    if (this.platformsGroup) {
      this.platformsGroup.clear(true, true);
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
      const graphics = this.add.graphics();
      const color = this.getPlatformColor(platform.type);
      
      // Dibujar plataforma con borde
      graphics.fillStyle(color, 1);
      graphics.fillRoundedRect(0, 0, platform.width, 20, 5);
      graphics.lineStyle(2, this.darkenColor(color), 1);
      graphics.strokeRoundedRect(0, 0, platform.width, 20, 5);
      
      // Añadir detalles según tipo
      if (platform.type === 'ice') {
        graphics.fillStyle(0xFFFFFF, 0.5);
        graphics.fillCircle(10, 5, 3);
        graphics.fillCircle(25, 8, 2);
        graphics.fillCircle(40, 6, 3);
      }
      
      graphics.generateTexture(`platform_${platform.type}_${platforms.indexOf(platform)}`, platform.width, 20);
      graphics.destroy();
      
      const plat = this.add.image(platform.x, platform.y, `platform_${platform.type}_${platforms.indexOf(platform)}`);
      this.physics.add.existing(plat, true);
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
  
  darkenColor(color) {
    const r = ((color >> 16) & 0xFF) * 0.7;
    const g = ((color >> 8) & 0xFF) * 0.7;
    const b = (color & 0xFF) * 0.7;
    return (r << 16) | (g << 8) | b;
  }
  
  createCollectibles() {
    const collectibles = this.currentLevel.collectibles;
    
    collectibles.forEach(item => {
      const sprite = this.add.sprite(item.x, item.y, item.type);
      sprite.setData('type', item.type);
      
      // Animación flotante
      this.tweens.add({
        targets: sprite,
        y: sprite.y - 10,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
      
      // Rotación para monedas
      if (item.type === 'coin') {
        this.tweens.add({
          targets: sprite,
          angle: 360,
          duration: 2000,
          repeat: -1
        });
      }
      
      // Pulso para estrellas
      if (item.type === 'star') {
        this.tweens.add({
          targets: sprite,
          scale: 1.2,
          duration: 500,
          yoyo: true,
          repeat: -1
        });
      }
      
      this.collectiblesGroup.add(sprite);
    });
  }
  
  collectItem(playerSprite, itemSprite) {
    const itemType = itemSprite.getData('type');
    
    // Recolectar en el player
    this.player.collect(itemType);
    
    // Actualizar score
    const points = { coin: 10, star: 50, gem: 100 };
    this.score += points[itemType] || 0;
    
    // Efecto de partículas
    const emitter = this.particles.createEmitter({
      x: itemSprite.x,
      y: itemSprite.y,
      speed: { min: 100, max: 200 },
      angle: { min: 0, max: 360 },
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
      lifespan: 600,
      gravityY: 200,
      quantity: 10
    });
    
    emitter.explode();
    
    // Efecto visual mejorado
    this.tweens.add({
      targets: itemSprite,
      alpha: 0,
      scale: 2,
      angle: 360,
      duration: 300,
      ease: 'Back.easeIn',
      onComplete: () => {
        itemSprite.destroy();
        emitter.stop();
      }
    });
    
    // Texto flotante
    const pointsText = this.add.text(itemSprite.x, itemSprite.y, `+${points[itemType]}`, {
      fontSize: '24px',
      fill: '#FFD700',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: pointsText,
      y: pointsText.y - 50,
      alpha: 0,
      duration: 1000,
      ease: 'Cubic.easeOut',
      onComplete: () => pointsText.destroy()
    });
    
    // Sonido (simulado en consola)
    console.log(`🔔 *${itemType} sound*`);
    
    // Actualizar UI
    this.updateUI();
    
    // Verificar logros
    this.checkLevelProgress();
    
    console.log(`✨ Recolectado: ${itemType} (+${points[itemType]} puntos)`);
  }
  
  createEnhancedUI() {
    // Panel superior con fondo
    const uiPanel = this.add.graphics();
    uiPanel.fillStyle(0x000000, 0.5);
    uiPanel.fillRoundedRect(10, 10, 780, 80, 10);
    uiPanel.setScrollFactor(0);
    uiPanel.setDepth(100);
    
    // Contenedor de UI
    this.uiContainer = this.add.container(0, 0);
    this.uiContainer.setScrollFactor(0);
    this.uiContainer.setDepth(101);
    
    // Score con icono
    this.add.text(30, 25, '🪙', { fontSize: '32px' });
    this.scoreText = this.add.text(70, 30, '', {
      fontSize: '24px',
      fill: '#FFD700',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 3
    });
    
    // Vidas con iconos
    this.add.text(30, 60, '❤️', { fontSize: '28px' });
    this.livesText = this.add.text(70, 65, '', {
      fontSize: '20px',
      fill: '#FF6B6B',
      fontStyle: 'bold'
    });
    
    // Nivel
    this.levelText = this.add.text(400, 30, '', {
      fontSize: '28px',
      fill: '#FFFFFF',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5, 0);
    
    // Tiempo
    this.timeText = this.add.text(400, 65, '', {
      fontSize: '20px',
      fill: '#FFFFFF'
    }).setOrigin(0.5, 0);
    
    // Coleccionables restantes
    this.collectiblesText = this.add.text(700, 30, '', {
      fontSize: '20px',
      fill: '#FFFFFF'
    }).setOrigin(1, 0);
    
    // Barra de progreso del nivel
    this.progressBarBg = this.add.graphics();
    this.progressBarBg.fillStyle(0x333333, 1);
    this.progressBarBg.fillRoundedRect(250, 78, 300, 8, 4);
    
    this.progressBar = this.add.graphics();
    
    // Instrucciones al inicio
    this.instructionsText = this.add.text(400, 550, '← → Mover  |  ↑ Saltar  |  ESC Pausa  |  R Reiniciar', {
      fontSize: '16px',
      fill: '#333333',
      backgroundColor: '#FFFFFF',
      padding: { x: 12, y: 6 },
      borderRadius: 5
    }).setOrigin(0.5, 0.5).setDepth(100);
    
    // Hacer desaparecer las instrucciones después de 5 segundos
    this.time.delayedCall(5000, () => {
      this.tweens.add({
        targets: this.instructionsText,
        alpha: 0,
        duration: 1000,
        onComplete: () => this.instructionsText.destroy()
      });
    });
    
    this.updateUI();
  }
  
  updateUI() {
    this.scoreText.setText(`${this.score}`);
    this.livesText.setText(`x${this.player.lives}`);
    this.levelText.setText(`Nivel ${this.levelManager.currentLevel}`);
    
    // Actualizar tiempo
    const elapsed = Math.floor((Date.now() - this.levelStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    this.timeText.setText(`⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`);
    
    // Actualizar coleccionables restantes
    const remaining = this.collectiblesGroup.getChildren().length;
    this.collectiblesText.setText(`⭐ ${remaining}`);
    
    // Actualizar barra de progreso
    const total = this.currentLevel.collectibles.length;
    const collected = total - remaining;
    const progress = collected / total;
    
    this.progressBar.clear();
    this.progressBar.fillStyle(0x4ECDC4, 1);
    this.progressBar.fillRoundedRect(250, 78, 300 * progress, 8, 4);
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
    
    // Actualizar nubes
    this.clouds.forEach(cloud => {
      cloud.x += cloud.speed;
      if (cloud.x > 850) cloud.x = -50;
    });
    
    // Movimiento del jugador con animación
    const velocity = this.playerSprite.body.velocity;
    
    if (this.cursors.left.isDown || this.keys.A.isDown) {
      this.playerSprite.body.setVelocityX(-250);
      if (this.playerSprite.facingRight) {
        this.playerSprite.setFlipX(true);
        this.playerSprite.facingRight = false;
      }
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      this.playerSprite.body.setVelocityX(250);
      if (!this.playerSprite.facingRight) {
        this.playerSprite.setFlipX(false);
        this.playerSprite.facingRight = true;
      }
    } else {
      this.playerSprite.body.setVelocityX(0);
    }
    
    // Salto con animación
    if ((this.cursors.up.isDown || this.keys.W.isDown || this.keys.SPACE.isDown) && this.playerSprite.body.touching.down) {
      this.playerSprite.body.setVelocityY(-450);
      this.playerSprite.setTexture('player_jump');
      this.playerSprite.isJumping = true;
      
      // Partículas de salto
      const jumpEmitter = this.particles.createEmitter({
        x: this.playerSprite.x,
        y: this.playerSprite.y + 25,
        speed: { min: 50, max: 100 },
        angle: { min: 60, max: 120 },
        scale: { start: 0.5, end: 0 },
        lifespan: 400,
        quantity: 5
      });
      jumpEmitter.explode();
    }
    
    // Volver a sprite normal al tocar el suelo
    if (this.playerSprite.body.touching.down && this.playerSprite.isJumping) {
      this.playerSprite.setTexture('player_idle');
      this.playerSprite.isJumping = false;
    }
    
    // Inclinación durante el movimiento
    if (Math.abs(velocity.x) > 50) {
      this.playerSprite.angle = Phaser.Math.Clamp(velocity.x * 0.05, -10, 10);
    } else {
      this.playerSprite.angle = 0;
    }
    
    // Actualizar UI
    this.updateUI();
    
    // Verificar si completó el nivel
    this.checkLevelCompletion();
  }
  
  checkLevelProgress() {
    this.achievementManager.updateProgress('coins_collected', this.player.coins);
    this.achievementManager.updateProgress('stars_collected', this.player.stars);
    this.achievementManager.updateProgress('gems_collected', this.player.gems);
  }
  
  checkLevelCompletion() {
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
    
    // Mostrar pantalla de victoria
    this.showVictoryScreen(result.stars, levelTime);
    
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
  }
  
  showVictoryScreen(stars, time) {
    // Fondo semi-transparente
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.7);
    overlay.fillRect(0, 0, 800, 600);
    overlay.setDepth(200);
    
    // Panel de victoria
    const panel = this.add.graphics();
    panel.fillStyle(0xFFFFFF, 1);
    panel.fillRoundedRect(200, 150, 400, 300, 20);
    panel.lineStyle(5, 0x4ECDC4, 1);
    panel.strokeRoundedRect(200, 150, 400, 300, 20);
    panel.setDepth(201);
    
    // Título
    const title = this.add.text(400, 200, '¡NIVEL COMPLETADO!', {
      fontSize: '32px',
      fill: '#4ECDC4',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(202);
    
    // Estrellas
    const starsContainer = this.add.container(400, 270).setDepth(202);
    for (let i = 0; i < 3; i++) {
      const starSprite = this.add.sprite((i - 1) * 60, 0, 'star');
      if (i >= stars) {
        starSprite.setAlpha(0.3);
      } else {
        this.tweens.add({
          targets: starSprite,
          scale: 1.5,
          duration: 300,
          yoyo: true,
          delay: i * 200
        });
      }
      starsContainer.add(starSprite);
    }
    
    // Estadísticas
    const statsText = this.add.text(400, 340, [
      `Tiempo: ${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`,
      `Puntuación: ${this.score}`,
      `Monedas: ${this.player.coins}`
    ], {
      fontSize: '20px',
      fill: '#333333',
      align: 'center',
      lineSpacing: 10
    }).setOrigin(0.5).setDepth(202);
    
    // Botón continuar
    const button = this.add.text(400, 410, 'CONTINUAR', {
      fontSize: '24px',
      fill: '#FFFFFF',
      backgroundColor: '#4ECDC4',
      padding: { x: 30, y: 10 },
      borderRadius: 10
    }).setOrigin(0.5).setDepth(202).setInteractive();
    
    button.on('pointerover', () => button.setScale(1.1));
    button.on('pointerout', () => button.setScale(1));
    button.on('pointerdown', () => {
      overlay.destroy();
      panel.destroy();
      title.destroy();
      starsContainer.destroy();
      statsText.destroy();
      button.destroy();
      
      const nextLevel = this.levelManager.currentLevel + 1;
      if (nextLevel <= 20) {
        this.loadLevel(nextLevel);
        this.playerSprite.setPosition(100, 450);
      } else {
        console.log('🏆 ¡Juego completado!');
      }
    });
  }
  
  restartLevel() {
    console.log('🔄 Reiniciando nivel...');
    this.score = 0;
    this.player.coins = 0;
    this.player.stars = 0;
    this.player.gems = 0;
    this.loadLevel(this.levelManager.currentLevel);
    this.playerSprite.setPosition(100, 450);
    this.playerSprite.body.setVelocity(0, 0);
  }
  
  togglePause() {
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      console.log('⏸️ Juego pausado');
      this.physics.pause();
      
      // Panel de pausa
      this.pauseOverlay = this.add.graphics();
      this.pauseOverlay.fillStyle(0x000000, 0.7);
      this.pauseOverlay.fillRect(0, 0, 800, 600);
      this.pauseOverlay.setDepth(200);
      
      this.pauseText = this.add.text(400, 300, 'PAUSA', {
        fontSize: '64px',
        fill: '#FFFFFF',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 8
      }).setOrigin(0.5).setDepth(201);
      
      this.pauseSubText = this.add.text(400, 370, 'ESC para continuar', {
        fontSize: '24px',
        fill: '#FFFFFF'
      }).setOrigin(0.5).setDepth(201);
    } else {
      console.log('▶️ Juego reanudado');
      this.physics.resume();
      
      if (this.pauseOverlay) this.pauseOverlay.destroy();
      if (this.pauseText) this.pauseText.destroy();
      if (this.pauseSubText) this.pauseSubText.destroy();
    }
  }
  
  showReviveOptions() {
    console.log('💀 Game Over - Opciones de revivir disponibles');
    console.log('1. Ver anuncio para continuar');
    console.log('2. Usar vida extra (IAP)');
    console.log('3. Reiniciar nivel');
    
    this.restartLevel();
  }
}

export default Game;
