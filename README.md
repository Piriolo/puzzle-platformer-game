# Puzzle Platformer Game 🎮

## Descripción
Videojuego de plataformas con niveles tipo puzzle diseñado para audiencia infantil. El juego incluye un personaje adorable y animado, sistema de logros, objetos coleccionables y monetización mediante publicidad y compras in-app.

## ✨ Características de la Versión Actual

### Gráficos Mejorados
- **Personaje Animado**: Diseño colorido con ojos expresivos, brazos y piernas
- **Animaciones Fluidas**: Diferentes estados (idle, salto) con transiciones suaves
- **Efectos Visuales**:
  - Sistema de partículas para coleccionables
  - Animaciones de flotación y rotación
  - Texto flotante al recolectar objetos
  - Estrellas parpadeantes de fondo
  - Nubes animadas en movimiento

### Jugabilidad
- **Movimiento Mejorado**: Inclinación del personaje al moverse
- **Salto Dinámico**: Partículas al saltar
- **Coleccionables Animados**: 
  - Monedas que rotan
  - Estrellas con efecto de pulso
  - Gemas brillantes
- **Sistema de Progreso**: Barra visual de completado del nivel
- **Pantalla de Victoria**: Muestra estrellas ganadas y estadísticas

### UI Mejorada
- Panel superior semi-transparente
- Iconos para score, vidas y tiempo
- Barra de progreso del nivel
- Instrucciones que desaparecen automáticamente
- Contador de tiempo en vivo

### Sistema de Niveles
- 20 niveles con dificultad progresiva
- Plataformas de diferentes tipos con texturas
- Sistema de 3 estrellas por nivel
- Elementos puzzle (interruptores, plataformas móviles, bloques empujables)

### Monetización
- **Publicidad**: Anuncios entre niveles y recompensados
- **Compras In-App**:
  - Vidas extras
  - Nuevos diseños de personaje (skins)
  - Potenciadores y ventajas
  - Eliminación de anuncios

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 16 o superior
- npm o yarn

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/Piriolo/puzzle-platformer-game.git
cd puzzle-platformer-game

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

El juego se abrirá automáticamente en `http://localhost:8080`

## 🎮 Controles

- **← →** o **A D**: Mover izquierda/derecha
- **↑** o **W** o **Espacio**: Saltar
- **ESC**: Pausar/Reanudar
- **R**: Reiniciar nivel

## 📱 Exportar a Android/iOS

Consulta las guías detalladas en:
- [Guía de Exportación Android](docs/ANDROID_EXPORT.md)
- [Solución de Problemas Android](docs/TROUBLESHOOTING_ANDROID.md)

### Resumen Rápido

```bash
# Instalar Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init

# Compilar juego
npm run build

# Añadir plataforma Android
npx cap add android
npx cap sync

# Abrir en Android Studio
npx cap open android
```

## 📚 Estructura del Proyecto

```
puzzle-platformer-game/
├── src/
│   ├── game/
│   │   ├── GameConfig.js      # Configuración del juego
│   │   └── Game.js            # Escena principal (mejorada)
│   ├── player/
│   │   └── Player.js          # Lógica del personaje
│   ├── levels/
│   │   └── LevelManager.js    # Gestión de niveles
│   ├── achievements/
│   │   └── AchievementManager.js  # Sistema de logros
│   ├── monetization/
│   │   ├── AdManager.js       # Publicidad
│   │   └── IAPManager.js      # Compras in-app
│   └── index.js               # Punto de entrada
├── dist/
│   └── index.html             # HTML principal
├── docs/
│   ├── ANDROID_EXPORT.md      # Guía Android
│   └── TROUBLESHOOTING_ANDROID.md
├── package.json
├── webpack.config.js
└── SETUP.md                  # Guía de instalación
```

## 🎨 Personalización

### Cambiar Velocidad del Jugador

Edita `src/game/GameConfig.js`:

```javascript
physics: {
  playerSpeed: 250, // Cambiar aquí
  jumpForce: -450
}
```

### Ajustar Dificultad

Edita `src/levels/LevelManager.js` para modificar:
- Número de plataformas
- Cantidad de enemigos
- Complejidad de puzzles

### Cambiar Colores del Personaje

Edita `src/game/Game.js` en `createProceduralGraphics()`:

```javascript
// Línea ~45
playerGraphics.fillStyle(0x4ECDC4, 1); // Color principal
// Cambiar a otro color hexadecimal
```

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm start              # Servidor con hot-reload

# Producción
npm run build         # Compilar para producción

# Testing
npm test              # Ejecutar tests

# Calidad de Código
npm run lint          # Verificar código
```

## 🌟 Roadmap

- [x] Personaje animado con expresiones
- [x] Sistema de partículas
- [x] Efectos visuales mejorados
- [x] UI moderna y responsive
- [x] Pantalla de victoria
- [x] Sistema de pausa
- [ ] Más skins de personaje
- [ ] Efectos de sonido
- [ ] Música de fondo
- [ ] Enemigos animados
- [ ] Power-ups visuales
- [ ] Modo multijugador local
- [ ] Tabla de clasificación online

## 🐛 Problemas Conocidos

- Los gráficos son procedurales (generados por código). Para gráficos profesionales, reemplaza con sprites PNG.
- El audio está simulado en consola. Implementa con archivos MP3/OGG reales.

## 📝 Licencia

MIT License - ver archivo LICENSE para más detalles

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/MejoraNueva`)
3. Commit tus cambios (`git commit -m 'Agregar nueva mejora'`)
4. Push a la rama (`git push origin feature/MejoraNueva`)
5. Abre un Pull Request

## 🔗 Enlaces Útiles

- [Documentación Phaser 3](https://photonstorm.github.io/phaser3-docs/)
- [Ejemplos Phaser](https://phaser.io/examples)
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Google Play Console](https://play.google.com/console)

## 💬 Soporte

Si encuentras problemas:
- Abre un [Issue](https://github.com/Piriolo/puzzle-platformer-game/issues)
- Revisa la [Guía de Troubleshooting](docs/TROUBLESHOOTING_ANDROID.md)

---

¡Diviértete desarrollando! 🎉🚀

Hecho con ❤️ usando Phaser 3
