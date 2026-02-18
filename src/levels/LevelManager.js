/**
 * Gestor de niveles del juego
 */

class LevelManager {
  constructor() {
    this.currentLevel = 1;
    this.levelsCompleted = [];
    this.levelStars = {}; // { levelId: starsEarned }
    this.levelTimes = {}; // { levelId: bestTime }
  }
  
  /**
   * Carga un nivel específico
   */
  loadLevel(levelNumber) {
    this.currentLevel = levelNumber;
    
    // Cargar configuración del nivel
    const levelData = this.getLevelData(levelNumber);
    
    return levelData;
  }
  
  /**
   * Obtiene los datos de un nivel
   */
  getLevelData(levelNumber) {
    // Esta función cargaría los datos del nivel desde archivos JSON
    // Por ahora retorna una estructura de ejemplo
    return {
      id: levelNumber,
      name: `Nivel ${levelNumber}`,
      difficulty: this.calculateDifficulty(levelNumber),
      platforms: this.generatePlatforms(levelNumber),
      collectibles: this.generateCollectibles(levelNumber),
      enemies: this.generateEnemies(levelNumber),
      puzzleElements: this.generatePuzzleElements(levelNumber),
      timeLimit: 120, // segundos
      starRequirements: {
        bronze: { coins: 50, time: 120 },
        silver: { coins: 80, time: 90 },
        gold: { coins: 100, time: 60 }
      }
    };
  }
  
  /**
   * Calcula la dificultad del nivel
   */
  calculateDifficulty(levelNumber) {
    if (levelNumber <= 5) return 'easy';
    if (levelNumber <= 12) return 'medium';
    return 'hard';
  }
  
  /**
   * Genera plataformas para el nivel
   */
  generatePlatforms(levelNumber) {
    // Lógica para generar plataformas según el nivel
    const platforms = [];
    const complexity = Math.min(levelNumber, 10);
    
    for (let i = 0; i < 5 + complexity; i++) {
      platforms.push({
        x: Math.random() * 700 + 50,
        y: Math.random() * 500 + 50,
        width: 100 + Math.random() * 100,
        type: this.getRandomPlatformType(levelNumber)
      });
    }
    
    return platforms;
  }
  
  /**
   * Genera coleccionables para el nivel
   */
  generateCollectibles(levelNumber) {
    const collectibles = [];
    
    // Monedas (muchas)
    for (let i = 0; i < 20 + levelNumber; i++) {
      collectibles.push({
        type: 'coin',
        x: Math.random() * 700 + 50,
        y: Math.random() * 500 + 50
      });
    }
    
    // Estrellas (3 por nivel)
    for (let i = 0; i < 3; i++) {
      collectibles.push({
        type: 'star',
        x: Math.random() * 700 + 50,
        y: Math.random() * 400 + 50
      });
    }
    
    // Gemas (pocas, más valiosas)
    if (levelNumber % 3 === 0) {
      collectibles.push({
        type: 'gem',
        x: Math.random() * 700 + 50,
        y: Math.random() * 300 + 50
      });
    }
    
    return collectibles;
  }
  
  /**
   * Genera enemigos para el nivel
   */
  generateEnemies(levelNumber) {
    const enemies = [];
    const enemyCount = Math.min(Math.floor(levelNumber / 2), 8);
    
    for (let i = 0; i < enemyCount; i++) {
      enemies.push({
        type: this.getRandomEnemyType(levelNumber),
        x: Math.random() * 700 + 50,
        y: Math.random() * 500 + 50,
        patrolDistance: 100 + Math.random() * 100
      });
    }
    
    return enemies;
  }
  
  /**
   * Genera elementos de puzzle
   */
  generatePuzzleElements(levelNumber) {
    const puzzles = [];
    
    // Interruptores y puertas
    if (levelNumber >= 3) {
      puzzles.push({
        type: 'switch_door',
        switch: { x: 200, y: 400 },
        door: { x: 600, y: 300 }
      });
    }
    
    // Plataformas móviles
    if (levelNumber >= 5) {
      puzzles.push({
        type: 'moving_platform',
        startX: 300,
        startY: 400,
        endX: 500,
        endY: 400,
        speed: 2
      });
    }
    
    // Bloques empujables
    if (levelNumber >= 7) {
      puzzles.push({
        type: 'pushable_block',
        x: 350,
        y: 450
      });
    }
    
    return puzzles;
  }
  
  /**
   * Tipo de plataforma aleatorio
   */
  getRandomPlatformType(levelNumber) {
    const types = ['normal', 'ice', 'bouncy', 'fragile', 'moving'];
    const availableTypes = types.slice(0, Math.min(1 + Math.floor(levelNumber / 3), types.length));
    return availableTypes[Math.floor(Math.random() * availableTypes.length)];
  }
  
  /**
   * Tipo de enemigo aleatorio
   */
  getRandomEnemyType(levelNumber) {
    const types = ['walker', 'jumper', 'flyer', 'shooter'];
    const availableTypes = types.slice(0, Math.min(1 + Math.floor(levelNumber / 4), types.length));
    return availableTypes[Math.floor(Math.random() * availableTypes.length)];
  }
  
  /**
   * Completa un nivel
   */
  completeLevel(levelNumber, stats) {
    if (!this.levelsCompleted.includes(levelNumber)) {
      this.levelsCompleted.push(levelNumber);
    }
    
    // Calcular estrellas ganadas
    const stars = this.calculateStars(levelNumber, stats);
    
    // Actualizar mejor puntuación
    if (!this.levelStars[levelNumber] || stars > this.levelStars[levelNumber]) {
      this.levelStars[levelNumber] = stars;
    }
    
    // Actualizar mejor tiempo
    if (!this.levelTimes[levelNumber] || stats.time < this.levelTimes[levelNumber]) {
      this.levelTimes[levelNumber] = stats.time;
    }
    
    return {
      stars: stars,
      newBest: stars > (this.levelStars[levelNumber] || 0)
    };
  }
  
  /**
   * Calcula estrellas ganadas
   */
  calculateStars(levelNumber, stats) {
    const levelData = this.getLevelData(levelNumber);
    const req = levelData.starRequirements;
    
    if (stats.coins >= req.gold.coins && stats.time <= req.gold.time) {
      return 3;
    } else if (stats.coins >= req.silver.coins && stats.time <= req.silver.time) {
      return 2;
    } else if (stats.coins >= req.bronze.coins && stats.time <= req.bronze.time) {
      return 1;
    }
    return 0;
  }
  
  /**
   * Obtiene progreso total
   */
  getTotalProgress() {
    const totalStars = Object.values(this.levelStars).reduce((a, b) => a + b, 0);
    const maxStars = this.levelsCompleted.length * 3;
    
    return {
      levelsCompleted: this.levelsCompleted.length,
      totalStars: totalStars,
      maxStars: maxStars,
      percentage: (this.levelsCompleted.length / 20) * 100
    };
  }
}

export default LevelManager;
