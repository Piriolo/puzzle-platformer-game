/**
 * Punto de entrada principal del juego
 */

import Phaser from 'phaser';
import Game from './game/Game.js';
import GameConfig from './game/GameConfig.js';

// Esperar a que el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  console.log('🎮 Iniciando Puzzle Platformer Game...');
  
  // Configuración de Phaser
  const phaserConfig = {
    type: Phaser.AUTO,
    width: GameConfig.width,
    height: GameConfig.height,
    backgroundColor: GameConfig.backgroundColor,
    parent: 'game-container',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: GameConfig.physics.gravity },
        debug: false // Cambiar a true para ver hitboxes
      }
    },
    scene: [Game],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  };
  
  // Crear instancia del juego
  const game = new Phaser.Game(phaserConfig);
  
  console.log('✅ Juego inicializado correctamente');
  
  // Exponer game globalmente para debugging
  window.game = game;
});
