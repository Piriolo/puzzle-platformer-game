# Solución de Problemas Android 🔧

## Problemas Comunes y Soluciones

### 1. "SDK location not found"

**Problema:** Android Studio no encuentra el SDK.

**Solución:**

1. Abre Android Studio
2. Tools > SDK Manager
3. Copia la ruta "Android SDK Location"
4. Crea `android/local.properties`:

```properties
sdk.dir=/ruta/a/tu/Android/Sdk
```

**Windows:**
```properties
sdk.dir=C:\\Users\\TuUsuario\\AppData\\Local\\Android\\Sdk
```

**macOS:**
```properties
sdk.dir=/Users/TuUsuario/Library/Android/sdk
```

**Linux:**
```properties
sdk.dir=/home/TuUsuario/Android/Sdk
```

---

### 2. Gradle Build Failed

**Error:** `Execution failed for task ':app:processDebugResources'`

**Solución:**

```bash
cd android
./gradlew clean
./gradlew build
```

O en Android Studio:
- Build > Clean Project
- Build > Rebuild Project

---

### 3. "Java version incompatible"

**Error:** `Unsupported class file major version 61`

**Solución:**

En `android/gradle.properties`:

```properties
org.gradle.jvmargs=-Xmx4096m
org.gradle.java.home=/ruta/a/jdk-17
```

Verifica tu versión de Java:

```bash
java -version
# Debe ser 17 o superior
```

---

### 4. El juego no carga / Pantalla Blanca

**Problema:** La app abre pero muestra pantalla blanca.

**Soluciones:**

#### Verifica la Ruta del WebView

En `capacitor.config.json`:

```json
{
  "webDir": "dist"
}
```

Asegúrate de que `dist/index.html` existe.

#### Verifica Permisos de Internet

En `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

#### Habilita ClearText Traffic (para desarrollo)

```xml
<application
    android:usesCleartextTraffic="true"
    ...>
```

#### Verifica la Consola de Chrome

1. Conecta tu dispositivo
2. Abre Chrome en tu PC
3. Ve a `chrome://inspect`
4. Encuentra tu app
5. Haz clic en "inspect"
6. Revisa errores en la consola

---

### 5. "cleartext traffic not permitted"

**Error al cargar desde HTTP**

**Solución:**

Crea `android/app/src/main/res/xml/network_security_config.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
</network-security-config>
```

Referencia en `AndroidManifest.xml`:

```xml
<application
    android:networkSecurityConfig="@xml/network_security_config"
    ...>
```

---

### 6. Performance Lento / Lag

**Problema:** El juego corre lento en el dispositivo.

**Soluciones:**

#### Habilitar Aceleración Hardware

En `AndroidManifest.xml`:

```xml
<activity
    android:hardwareAccelerated="true"
    ...>
```

#### Optimizar WebView Settings

Si usas WebView nativo:

```kotlin
webSettings.cacheMode = WebSettings.LOAD_DEFAULT
webSettings.setRenderPriority(WebSettings.RenderPriority.HIGH)
webSettings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
```

#### Reducir Resolución del Canvas

En tu `GameConfig.js`:

```javascript
scale: {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  // Reduce la resolución en móviles
  resolution: window.devicePixelRatio > 2 ? 1.5 : window.devicePixelRatio
}
```

---

### 7. Assets No Cargan (404)

**Problema:** Sprites, audio u otros assets no se cargan.

**Solución:**

Verifica rutas relativas en tu código:

```javascript
// Incorrecto
this.load.image('player', '/assets/player.png');

// Correcto
this.load.image('player', 'assets/player.png');
```

Asegúrate de que assets estén en `dist/assets/` después del build.

---

### 8. Tamaño del APK Muy Grande

**Problema:** APK supera 100 MB.

**Soluciones:**

#### Usar AAB en lugar de APK

```bash
./gradlew bundleRelease
```

Google Play optimiza automáticamente el tamaño.

#### Comprimir Imágenes

Usa herramientas como:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)

#### Habilitar Shrinking

En `android/app/build.gradle`:

```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

#### Usar WebP para Imágenes

Android soporta WebP nativamente, usa este formato en lugar de PNG.

---

### 9. Problema con Orientación de Pantalla

**Problema:** La app rota cuando no debería.

**Solución:**

En `AndroidManifest.xml`:

```xml
<!-- Para landscape (horizontal) solamente -->
<activity
    android:screenOrientation="landscape"
    ...>

<!-- Para portrait (vertical) solamente -->
<activity
    android:screenOrientation="portrait"
    ...>
```

---

### 10. Audio No Funciona

**Problema:** Los sonidos no se reproducen.

**Soluciones:**

#### Usa Formatos Compatibles

- **Recomendado:** MP3, OGG
- **Evita:** WAV (muy pesados)

#### Precarga el Audio

```javascript
preload() {
  this.load.audio('coin', 'assets/audio/coin.mp3');
}

create() {
  this.coinSound = this.sound.add('coin');
}

collectCoin() {
  this.coinSound.play();
}
```

#### Verifica Permisos de Audio

No necesitas permisos especiales para reproducir audio en Android.

---

### 11. Firma del APK Falla

**Error:** `Failed to read key from keystore`

**Solución:**

Verifica `key.properties`:

```properties
# Asegúrate de que no haya espacios extra
storePassword=miPassword123
keyPassword=miPassword123
keyAlias=puzzle-platformer
storeFile=/ruta/completa/puzzle-platformer.keystore
```

Ruta absoluta en Windows:
```properties
storeFile=C:/Users/TuUsuario/puzzle-platformer.keystore
```

---

### 12. Crashea al Abrir

**Problema:** La app crashea inmediatamente.

**Solución:**

Revisa los logs:

```bash
adb logcat | grep -i "error\|exception\|crash"
```

Problemas comunes:
- Falta de permisos necesarios
- Versión mínima de Android muy baja
- Dependencias faltantes

---

### 13. Capacitor Sync Falla

**Error:** `Error running update`

**Solución:**

```bash
# Eliminar plataforma y volver a agregar
npx cap remove android
npm run build
npx cap add android
npx cap sync
```

---

### 14. Pantalla Notch (Muesca) Cubre Contenido

**Problema:** El juego se ve cortado en dispositivos con notch.

**Solución:**

En `AndroidManifest.xml`:

```xml
<activity
    android:theme="@style/Theme.AppCompat.NoActionBar"
    ...>
    <meta-data
        android:name="android.notch_support"
        android:value="true"/>
</activity>
```

En `res/values/styles.xml`:

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>
</style>
```

---

### 15. Debugging Remoto

**Cómo ver logs del dispositivo:**

```bash
# Instalar ADB
# En Windows: Incluido con Android Studio
# En macOS: brew install android-platform-tools
# En Linux: apt-get install android-tools-adb

# Ver dispositivos conectados
adb devices

# Ver logs en tiempo real
adb logcat

# Filtrar solo tu app
adb logcat | grep "com.tudominio.puzzleplatformer"
```

---

## Recursos Útiles

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/guide)
- [Phaser Mobile Guide](https://phaser.io/tutorials/getting-started-phaser3/part5)
- [Stack Overflow - Capacitor](https://stackoverflow.com/questions/tagged/capacitor)

---

## Aún Tienes Problemas?

1. Revisa los logs completos: `adb logcat`
2. Busca el error específico en Stack Overflow
3. Abre un issue en el repositorio del proyecto
4. Pregunta en el [Phaser Discord](https://discord.gg/phaser)
5. Revisa la [documentación de Capacitor](https://capacitorjs.com/docs)

¡No te rindas! La mayoría de problemas tienen solución. 🚀
