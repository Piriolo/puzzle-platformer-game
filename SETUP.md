# Guía de Instalación y Prueba 🚀

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior): [Descargar aquí](https://nodejs.org/)
- **Git**: [Descargar aquí](https://git-scm.com/)
- Un editor de código (recomendado: [VS Code](https://code.visualstudio.com/))

### Verificar Instalación

Abre una terminal y ejecuta:

```bash
node --version
# Debería mostrar: v16.0.0 o superior

npm --version
# Debería mostrar: 8.0.0 o superior

git --version
# Debería mostrar: git version 2.x.x
```

## Paso 1: Clonar el Repositorio

Abre tu terminal y ejecuta:

```bash
# Clonar el repositorio
git clone https://github.com/Piriolo/puzzle-platformer-game.git

# Entrar al directorio del proyecto
cd puzzle-platformer-game
```

## Paso 2: Instalar Dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- Phaser 3 (motor de juego)
- Webpack (empaquetador)
- Babel (transpilador)
- Herramientas de desarrollo

**Tiempo estimado**: 2-3 minutos

## Paso 3: Iniciar el Servidor de Desarrollo

```bash
npm start
```

Esto hará lo siguiente:
1. Compilará el código
2. Iniciará un servidor local
3. Abrirá automáticamente tu navegador en `http://localhost:8080`

**¡El juego debería cargarse automáticamente!**

## Paso 4: Probar el Juego

### Controles Básicos

- **← →** o **A D**: Mover izquierda/derecha
- **↑** o **W** o **Espacio**: Saltar
- **ESC**: Pausar
- **R**: Reiniciar nivel

### Elementos del Juego

- **🪙 Monedas doradas**: +10 puntos
- **⭐ Estrellas**: +50 puntos
- **💎 Gemas**: +100 puntos y bonus
- **❤️ Corazones**: Vida extra
- **⚡ Rayos**: Power-ups temporales

### Qué Probar

1. **Movimiento y Salto**: Practica los controles básicos
2. **Recolección**: Intenta recoger todos los objetos
3. **Puzzles**: Activa interruptores para abrir puertas
4. **Enemigos**: Evita o salta sobre ellos
5. **Plataformas especiales**: Prueba plataformas móviles y de hielo
6. **Sistema de vidas**: Observa cómo se reduce al recibir daño
7. **Logros**: Completa desafíos para desbloquear logros

## Paso 5: Desarrollo y Hot Reload

Con el servidor corriendo, cualquier cambio que hagas en los archivos se reflejará automáticamente en el navegador.

### Ejemplo de Modificación

1. Abre `src/game/GameConfig.js`
2. Cambia el valor de `playerSpeed` de 200 a 300
3. Guarda el archivo
4. El navegador se recargará automáticamente

## Paso 6: Ver la Consola de Desarrollo

Abre las herramientas de desarrollo del navegador:

- **Chrome/Edge**: F12 o Ctrl+Shift+I (Cmd+Option+I en Mac)
- **Firefox**: F12 o Ctrl+Shift+I (Cmd+Option+I en Mac)

Aquí verás:
- Logs del juego
- Notificaciones de logros
- Información de anuncios
- Errores si los hay

## Paso 7: Compilar para Producción

Cuando estés listo para crear una versión optimizada:

```bash
npm run build
```

Esto creará una carpeta `dist/` con los archivos optimizados listos para publicar.

## Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Compilar para producción
npm run build

# Ejecutar tests
npm test

# Verificar código con ESLint
npm run lint
```

## Solución de Problemas Comunes

### Error: "Cannot find module"

```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules
npm install
```

### Puerto 8080 ya en uso

Modifica `webpack.config.js` y cambia el puerto:

```javascript
devServer: {
  port: 3000, // Cambiar a otro puerto
}
```

### El juego no carga

1. Verifica la consola del navegador para errores
2. Asegúrate de que el servidor esté corriendo
3. Prueba en modo incógnito
4. Limpia la caché del navegador

### Rendimiento lento

- Reduce `perPage` en los generadores de objetos
- Disminuye el número de partículas
- Verifica que no haya otros procesos pesados corriendo

## Estructura de Archivos para Testing

```
puzzle-platformer-game/
├── src/
│   ├── game/
│   │   ├── GameConfig.js      # Modifica valores aquí
│   │   └── Game.js            # Loop principal
│   ├── player/
│   │   └── Player.js          # Comportamiento del jugador
│   ├── levels/
│   │   └── LevelManager.js    # Generación de niveles
│   └── index.js               # Punto de entrada
└── dist/                      # Archivos compilados (después de build)
```

## Próximos Pasos

1. **Personalizar el personaje**: Edita sprites en `assets/sprites/`
2. **Crear niveles custom**: Modifica `LevelManager.js`
3. **Ajustar dificultad**: Cambia valores en `GameConfig.js`
4. **Agregar sonidos**: Añade archivos a `assets/audio/`
5. **Testear monetización**: Implementa providers de ads reales

## Recursos Adicionales

- [Documentación de Phaser 3](https://photonstorm.github.io/phaser3-docs/)
- [Ejemplos de Phaser](https://phaser.io/examples)
- [Tutorial de Webpack](https://webpack.js.org/guides/)

## Soporte

Si encuentras problemas, abre un issue en:
https://github.com/Piriolo/puzzle-platformer-game/issues

---

¡Diviértete desarrollando! 🎮✨
