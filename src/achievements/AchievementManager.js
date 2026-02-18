/**
 * Sistema de logros del juego
 */

class AchievementManager {
  constructor() {
    this.achievements = this.initializeAchievements();
    this.unlockedAchievements = [];
    this.progress = {};
  }
  
  /**
   * Inicializa todos los logros del juego
   */
  initializeAchievements() {
    return {
      // Logros de progresión
      first_steps: {
        id: 'first_steps',
        name: 'Primeros Pasos',
        description: 'Completa el primer nivel',
        icon: '🎯',
        reward: { coins: 100 },
        requirement: { type: 'level_complete', value: 1 }
      },
      halfway_there: {
        id: 'halfway_there',
        name: 'A Mitad de Camino',
        description: 'Completa 10 niveles',
        icon: '🏆',
        reward: { coins: 500 },
        requirement: { type: 'levels_completed', value: 10 }
      },
      master_platformer: {
        id: 'master_platformer',
        name: 'Maestro de Plataformas',
        description: 'Completa todos los niveles',
        icon: '👑',
        reward: { coins: 2000, skin: 'golden_hero' },
        requirement: { type: 'levels_completed', value: 20 }
      },
      
      // Logros de colección
      coin_collector: {
        id: 'coin_collector',
        name: 'Recolector de Monedas',
        description: 'Recolecta 1000 monedas',
        icon: '💰',
        reward: { coins: 200 },
        requirement: { type: 'coins_collected', value: 1000 }
      },
      star_gazer: {
        id: 'star_gazer',
        name: 'Cazador de Estrellas',
        description: 'Recolecta 50 estrellas',
        icon: '⭐',
        reward: { coins: 300 },
        requirement: { type: 'stars_collected', value: 50 }
      },
      gem_hunter: {
        id: 'gem_hunter',
        name: 'Cazador de Gemas',
        description: 'Recolecta 20 gemas',
        icon: '💎',
        reward: { coins: 500 },
        requirement: { type: 'gems_collected', value: 20 }
      },
      
      // Logros de perfección
      perfectionist: {
        id: 'perfectionist',
        name: 'Perfeccionista',
        description: 'Obtén 3 estrellas en un nivel',
        icon: '🌟',
        reward: { coins: 300 },
        requirement: { type: 'three_stars', value: 1 }
      },
      flawless_five: {
        id: 'flawless_five',
        name: 'Cinco Perfectos',
        description: 'Obtén 3 estrellas en 5 niveles',
        icon: '✨',
        reward: { coins: 800 },
        requirement: { type: 'three_stars', value: 5 }
      },
      
      // Logros de habilidad
      speedrunner: {
        id: 'speedrunner',
        name: 'Corredor Veloz',
        description: 'Completa un nivel en menos de 30 segundos',
        icon: '⚡',
        reward: { coins: 400 },
        requirement: { type: 'level_time_under', value: 30 }
      },
      untouchable: {
        id: 'untouchable',
        name: 'Intocable',
        description: 'Completa un nivel sin recibir daño',
        icon: '🛡️',
        reward: { coins: 350 },
        requirement: { type: 'no_damage_level', value: 1 }
      },
      iron_will: {
        id: 'iron_will',
        name: 'Voluntad de Hierro',
        description: 'Completa 5 niveles sin recibir daño',
        icon: '💪',
        reward: { coins: 1000, skin: 'armor_hero' },
        requirement: { type: 'no_damage_level', value: 5 }
      },
      
      // Logros especiales
      explorer: {
        id: 'explorer',
        name: 'Explorador',
        description: 'Encuentra todas las áreas secretas',
        icon: '🔍',
        reward: { coins: 600 },
        requirement: { type: 'secret_areas', value: 10 }
      },
      puzzle_master: {
        id: 'puzzle_master',
        name: 'Maestro de Puzzles',
        description: 'Resuelve todos los puzzles complejos',
        icon: '🧩',
        reward: { coins: 700 },
        requirement: { type: 'puzzles_solved', value: 15 }
      },
      dedicated_player: {
        id: 'dedicated_player',
        name: 'Jugador Dedicado',
        description: 'Juega durante 10 horas',
        icon: '🎮',
        reward: { coins: 500 },
        requirement: { type: 'play_time', value: 36000 } // segundos
      }
    };
  }
  
  /**
   * Actualiza el progreso de un logro
   */
  updateProgress(type, value) {
    // Buscar logros que coincidan con el tipo
    Object.keys(this.achievements).forEach(key => {
      const achievement = this.achievements[key];
      
      if (achievement.requirement.type === type) {
        // Inicializar progreso si no existe
        if (!this.progress[key]) {
          this.progress[key] = 0;
        }
        
        // Actualizar progreso
        if (type.includes('collected') || type.includes('completed') || type === 'play_time') {
          this.progress[key] = value;
        } else {
          this.progress[key] += value;
        }
        
        // Verificar si se completó
        if (this.progress[key] >= achievement.requirement.value) {
          this.unlockAchievement(key);
        }
      }
    });
  }
  
  /**
   * Desbloquea un logro
   */
  unlockAchievement(achievementId) {
    if (!this.unlockedAchievements.includes(achievementId)) {
      this.unlockedAchievements.push(achievementId);
      const achievement = this.achievements[achievementId];
      
      // Mostrar notificación
      this.showAchievementNotification(achievement);
      
      // Dar recompensa
      this.grantReward(achievement.reward);
      
      return true;
    }
    return false;
  }
  
  /**
   * Muestra notificación de logro desbloqueado
   */
  showAchievementNotification(achievement) {
    // Implementar UI de notificación
    console.log(`¡Logro Desbloqueado! ${achievement.icon} ${achievement.name}`);
    console.log(`Recompensa: ${achievement.reward.coins} monedas`);
  }
  
  /**
   * Otorga recompensa del logro
   */
  grantReward(reward) {
    if (reward.coins) {
      // Agregar monedas al jugador
    }
    
    if (reward.skin) {
      // Desbloquear skin
    }
  }
  
  /**
   * Obtiene progreso de todos los logros
   */
  getAllProgress() {
    const result = [];
    
    Object.keys(this.achievements).forEach(key => {
      const achievement = this.achievements[key];
      const current = this.progress[key] || 0;
      const required = achievement.requirement.value;
      const unlocked = this.unlockedAchievements.includes(key);
      
      result.push({
        ...achievement,
        progress: current,
        required: required,
        percentage: Math.min((current / required) * 100, 100),
        unlocked: unlocked
      });
    });
    
    return result;
  }
  
  /**
   * Obtiene estadísticas generales
   */
  getStats() {
    const total = Object.keys(this.achievements).length;
    const unlocked = this.unlockedAchievements.length;
    
    return {
      total: total,
      unlocked: unlocked,
      percentage: (unlocked / total) * 100,
      recentlyUnlocked: this.unlockedAchievements.slice(-3)
    };
  }
}

export default AchievementManager;
