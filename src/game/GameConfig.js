/**
 * Configuración principal del juego
 */

const GameConfig = {
  // Configuración de pantalla
  width: 800,
  height: 600,
  backgroundColor: '#87CEEB',
  
  // Configuración de física
  physics: {
    gravity: 800,
    playerSpeed: 200,
    jumpForce: -400
  },
  
  // Sistema de vidas
  startingLives: 3,
  maxLives: 5,
  
  // Coleccionables
  collectibles: {
    coin: { points: 10 },
    star: { points: 50 },
    gem: { points: 100 }
  },
  
  // Sistema de niveles
  totalLevels: 20,
  starsPerLevel: 3,
  
  // Monetización
  monetization: {
    showAdEveryNLevels: 3,
    rewardedAdBonusCoins: 100,
    iapProducts: {
      removeAds: { id: 'remove_ads', price: 2.99 },
      extraLives5: { id: 'lives_5', price: 0.99 },
      extraLives10: { id: 'lives_10', price: 1.99 },
      skinPack1: { id: 'skin_pack_1', price: 1.99 },
      skinPack2: { id: 'skin_pack_2', price: 1.99 },
      doubleCoins: { id: 'double_coins', price: 3.99 }
    }
  },
  
  // Configuración de logros
  achievements: {
    firstSteps: { requirement: 'complete_level_1', reward: 100 },
    collector: { requirement: 'collect_100_coins', reward: 200 },
    starGazer: { requirement: 'collect_50_stars', reward: 300 },
    perfect: { requirement: 'complete_level_3_stars', reward: 500 },
    speedster: { requirement: 'complete_level_under_30s', reward: 300 },
    noHitWonder: { requirement: 'complete_level_no_damage', reward: 400 }
  }
};

export default GameConfig;
