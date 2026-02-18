/**
 * Clase del personaje jugable
 */

class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    
    // Propiedades del jugador
    this.lives = 3;
    this.coins = 0;
    this.stars = 0;
    this.gems = 0;
    this.currentSkin = 'default';
    this.unlockedSkins = ['default'];
    
    // Estado
    this.isJumping = false;
    this.canDoubleJump = false;
    this.isInvulnerable = false;
    
    // Power-ups activos
    this.activePowerUps = {
      doubleCoins: false,
      invincibility: false,
      speedBoost: false
    };
  }
  
  /**
   * Actualiza el estado del jugador
   */
  update(controls) {
    // Movimiento horizontal
    if (controls.left) {
      this.moveLeft();
    } else if (controls.right) {
      this.moveRight();
    } else {
      this.stop();
    }
    
    // Salto
    if (controls.jump && !this.isJumping) {
      this.jump();
    }
  }
  
  moveLeft() {
    // Implementar movimiento
  }
  
  moveRight() {
    // Implementar movimiento
  }
  
  stop() {
    // Detener movimiento
  }
  
  jump() {
    this.isJumping = true;
    // Implementar salto
  }
  
  /**
   * Recolecta un objeto
   */
  collect(itemType) {
    const multiplier = this.activePowerUps.doubleCoins ? 2 : 1;
    
    switch(itemType) {
      case 'coin':
        this.coins += 10 * multiplier;
        break;
      case 'star':
        this.stars += 1;
        break;
      case 'gem':
        this.gems += 1;
        this.coins += 100 * multiplier;
        break;
    }
    
    // Verificar logros
    this.checkAchievements();
  }
  
  /**
   * Recibe daño
   */
  takeDamage() {
    if (this.isInvulnerable || this.activePowerUps.invincibility) {
      return;
    }
    
    this.lives -= 1;
    this.isInvulnerable = true;
    
    // Parpadeo de invulnerabilidad
    setTimeout(() => {
      this.isInvulnerable = false;
    }, 2000);
    
    if (this.lives <= 0) {
      this.die();
    }
  }
  
  /**
   * Muerte del jugador
   */
  die() {
    // Mostrar opción de revivir con anuncio o compra
    this.scene.showReviveOptions();
  }
  
  /**
   * Cambia el skin del personaje
   */
  changeSkin(skinId) {
    if (this.unlockedSkins.includes(skinId)) {
      this.currentSkin = skinId;
      return true;
    }
    return false;
  }
  
  /**
   * Desbloquea un nuevo skin
   */
  unlockSkin(skinId) {
    if (!this.unlockedSkins.includes(skinId)) {
      this.unlockedSkins.push(skinId);
      return true;
    }
    return false;
  }
  
  /**
   * Verifica logros completados
   */
  checkAchievements() {
    // Implementar verificación de logros
  }
}

export default Player;
