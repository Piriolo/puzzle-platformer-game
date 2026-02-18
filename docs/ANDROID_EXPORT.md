# Exportar a Android 📱

## Método 1: Capacitor (Recomendado)

Capacitor es la herramienta moderna de Ionic para convertir aplicaciones web en apps nativas.

### Requisitos Previos

1. **Android Studio**: [Descargar aquí](https://developer.android.com/studio)
2. **Java JDK 17** o superior
3. **Node.js** instalado
4. Tu juego compilado (`npm run build`)

### Paso 1: Instalar Capacitor

```bash
# En la raíz de tu proyecto
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
```

### Paso 2: Inicializar Capacitor

```bash
npx cap init
```

Responde las preguntas:
- **App name**: Puzzle Platformer Game
- **App Package ID**: com.tudominio.puzzleplatformer (debe ser único)
- **Web asset directory**: dist

### Paso 3: Configurar capacitor.config.json

Edita el archivo `capacitor.config.json`:

```json
{
  "appId": "com.tudominio.puzzleplatformer",
  "appName": "Puzzle Platformer",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "androidScheme": "https"
  }
}
```

### Paso 4: Compilar el Juego

```bash
npm run build
```

### Paso 5: Añadir Plataforma Android

```bash
npx cap add android
```

Esto creará una carpeta `android/` con el proyecto de Android Studio.

### Paso 6: Sincronizar Assets

```bash
npx cap sync
```

Este comando copia los archivos de `dist/` al proyecto Android.

### Paso 7: Abrir en Android Studio

```bash
npx cap open android
```

O manualmente:
1. Abre Android Studio
2. File > Open
3. Selecciona la carpeta `android/` de tu proyecto

### Paso 8: Configurar en Android Studio

#### Configurar SDK
1. Tools > SDK Manager
2. Asegúrate de tener instalado:
   - Android SDK Platform 33 o superior
   - Android SDK Build-Tools
   - Android SDK Platform-Tools

#### Configurar Variables de Entorno (opcional pero recomendado)

**Windows:**
```bash
setx ANDROID_HOME "C:\Users\TuUsuario\AppData\Local\Android\Sdk"
setx PATH "%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools"
```

**macOS/Linux:**
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### Paso 9: Probar en Emulador

1. En Android Studio, haz clic en **AVD Manager** (ícono de teléfono)
2. Create Virtual Device
3. Selecciona un dispositivo (ej: Pixel 6)
4. Descarga una imagen del sistema (ej: Android 13)
5. Finish

**Ejecutar:**
- Selecciona el emulador en la lista de dispositivos
- Haz clic en el botón verde "Run" (▶️)

### Paso 10: Probar en Dispositivo Real

1. **Habilitar Modo Desarrollador en tu teléfono:**
   - Ve a Configuración > Acerca del teléfono
   - Toca 7 veces en "Número de compilación"
   - Vuelve a Configuración > Opciones de desarrollador
   - Activa "Depuración USB"

2. **Conecta tu teléfono por USB**

3. **En Android Studio:**
   - Tu dispositivo aparecerá en la lista
   - Selecciónalo y haz clic en Run

### Paso 11: Generar APK de Prueba

```bash
cd android
./gradlew assembleDebug
```

El APK estará en:
`android/app/build/outputs/apk/debug/app-debug.apk`

### Paso 12: Generar APK/AAB para Producción
#### Crear Keystore

```bash
keytool -genkey -v -keystore puzzle-platformer.keystore -alias puzzle-platformer -keyalg RSA -keysize 2048 -validity 10000
```

Guarda el archivo `.keystore` en un lugar seguro.

#### Configurar Firma

Crea `android/key.properties`:

```properties
storePassword=TU_PASSWORD
keyPassword=TU_PASSWORD
keyAlias=puzzle-platformer
storeFile=/ruta/absoluta/a/puzzle-platformer.keystore
```

Edita `android/app/build.gradle`:

```gradle
android {
    ...
    signingConfigs {
        release {
            def keystorePropertiesFile = rootProject.file("key.properties")
            def keystoreProperties = new Properties()
            keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
            
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### Generar Release APK

```bash
cd android
./gradlew assembleRelease
```

APK en: `android/app/build/outputs/apk/release/app-release.apk`

#### Generar AAB (para Google Play Store)

```bash
./gradlew bundleRelease
```

AAB en: `android/app/build/outputs/bundle/release/app-release.aab`

### Paso 13: Actualizar la App

Cuando hagas cambios en tu juego:

```bash
npm run build
npx cap sync
```

Luego reconstruye en Android Studio.

---

## Método 2: Cordova

Cordova es la opción clásica, más establecida pero menos flexible.

### Instalar Cordova

```bash
npm install -g cordova
```

### Crear Proyecto Cordova

```bash
cordova create puzzleplatformer com.tudominio.puzzleplatformer PuzzlePlatformer
cd puzzleplatformer
```

### Copiar Archivos del Juego

Copia todo el contenido de tu carpeta `dist/` a `www/`

### Modificar index.html

Agrega antes de cerrar `</body>`:

```html
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript">
  document.addEventListener('deviceready', function() {
    console.log('Cordova listo');
    // Tu código de inicialización del juego aquí
  }, false);
</script>
```

### Añadir Plataforma Android

```bash
cordova platform add android
```

### Construir APK

```bash
cordova build android
```

### Ejecutar en Dispositivo

```bash
cordova run android
```

APK en: `platforms/android/app/build/outputs/apk/debug/`

---

## Método 3: WebView Nativo en Android Studio

Para más control, puedes crear una app Android nativa con WebView.

### Paso 1: Crear Proyecto en Android Studio

1. File > New > New Project
2. Empty Activity
3. Name: PuzzlePlatformer
4. Package: com.tudominio.puzzleplatformer
5. Language: Kotlin
6. Finish

### Paso 2: Modificar AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<application
    android:usesCleartextTraffic="true"
    ...>
    <activity
        android:name=".MainActivity"
        android:configChanges="orientation|screenSize|keyboardHidden"
        android:hardwareAccelerated="true"
        ...>
    </activity>
</application>
```

### Paso 3: Modificar activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <WebView
        android:id="@+id/webView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</RelativeLayout>
```

### Paso 4: Modificar MainActivity.kt

```kotlin
package com.tudominio.puzzleplatformer

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import android.webkit.WebSettings
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        webView.webViewClient = WebViewClient()

        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true
        webSettings.domStorageEnabled = true
        webSettings.databaseEnabled = true
        webSettings.cacheMode = WebSettings.LOAD_DEFAULT

        // Cargar tu juego
        // Opción 1: Desde URL online
        webView.loadUrl("https://tu-sitio.com/puzzle-platformer")
        
        // Opción 2: Desde assets locales (copia dist/ a app/src/main/assets/)
        // webView.loadUrl("file:///android_asset/index.html")
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
```

### Paso 5: Copiar Archivos (si usas assets locales)

1. Compila tu juego: `npm run build`
2. Copia todo el contenido de `dist/` a `app/src/main/assets/`
3. En MainActivity.kt usa: `webView.loadUrl("file:///android_asset/index.html")`

---

## Integración de Monetización
### AdMob con Capacitor

```bash
npm install @capacitor-community/admob
npx cap sync
```

### Configurar AdMob

En `android/app/src/main/AndroidManifest.xml`:

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"/>
```

### In-App Purchases con Capacitor

```bash
npm install @capacitor-community/in-app-purchases
npx cap sync
```

---

## Publicar en Google Play Store

### Requisitos

1. Cuenta de Google Play Developer ($25 única vez)
2. APK/AAB firmado
3. Gráficos de la tienda:
   - Ícono: 512x512 px
   - Feature Graphic: 1024x500 px
   - Screenshots: mínimo 2, 16:9 o 9:16

### Pasos

1. Ve a [Google Play Console](https://play.google.com/console)
2. Crear aplicación
3. Completa la ficha de la tienda
4. Sube tu AAB
5. Completa el cuestionario de contenido
6. Configura precios y disponibilidad
7. Envía a revisión

---

## Consejos

- **Capacitor** es más moderno y fácil de mantener
- **Cordova** tiene más plugins pero está siendo reemplazado por Capacitor
- **WebView nativo** da más control pero requiere más trabajo
- Siempre prueba en dispositivos reales antes de publicar
- Optimiza el tamaño de assets para reducir el tamaño del APK
- Usa AAB en lugar de APK para Google Play (tamaño optimizado)

¡Buena suerte con tu publicación! 🚀
