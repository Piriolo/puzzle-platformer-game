# Puzzle Platformer Game 🎮

## Descripción
Videojuego de plataformas con niveles tipo puzzle diseñado para audiencia infantil. El juego incluye un personaje adorable, sistema de logros, objetos coleccionables y monetización mediante publicidad y compras in-app.

## Características Principales

### Jugabilidad
- **Personaje Atractivo**: Diseño colorido y amigable para niños
- **Niveles Puzzle**: Plataformas que requieren pensamiento lógico
- **Sistema de Logros**: Recompensas por completar desafíos
- **Coleccionables**: Estrellas, monedas y objetos especiales

### Monetización
- **Publicidad**: Anuncios entre niveles y recompensados
- **Compras In-App**:
  - Vidas extras
  - Nuevos diseños de personaje (skins)
  - Potenciadores y ventajas
  - Eliminación de anuncios

## Estructura del Proyecto

```
puzzle-platformer-game/
├── src/
│   ├── game/           # Lógica principal del juego
│   ├── player/         # Sistema del personaje
│   ├── levels/         # Diseño de niveles
│   ├── ui/             # Interfaz de usuario
│   ├── collectibles/   # Sistema de coleccionables
│   ├── achievements/   # Sistema de logros
│   └── monetization/   # Publicidad e IAP
├── assets/
│   ├── sprites/        # Gráficos del personaje y objetos
│   ├── levels/         # Datos de niveles
│   └── audio/          # Música y efectos de sonido
└── docs/              # Documentación
```

## Tecnologías
- **Motor**: HTML5/JavaScript con Phaser 3 o similar
- **Ads**: AdMob o Unity Ads
- **IAP**: Integración con stores (Google Play, App Store)

## Instalación

```bash
git clone https://github.com/Piriolo/puzzle-platformer-game.git
cd puzzle-platformer-game
npm install
npm start
```

## Roadmap

- [x] Creación del repositorio
- [ ] Implementación del motor de juego base
- [ ] Diseño del personaje principal
- [ ] Sistema de física y colisiones
- [ ] Primeros 5 niveles puzzle
- [ ] Sistema de coleccionables
- [ ] Sistema de logros
- [ ] Integración de publicidad
- [ ] Sistema de compras in-app
- [ ] Menú principal y UI
- [ ] Audio y música
- [ ] Testing y optimización

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## Licencia

MIT License - ver archivo LICENSE para más detalles
