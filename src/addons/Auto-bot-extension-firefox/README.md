# WPlace AutoBOT - Extensión para Firefox

Esta es la versión de la extensión WPlace AutoBOT compatible con Firefox, adaptada desde la versión original de Chrome.

## Diferencias principales con la versión de Chrome

- Utiliza las APIs `browser.*` en lugar de `chrome.*`
- Manifest v2 (compatible con Firefox) en lugar de Manifest v3
- Background script en lugar de service worker
- Compatibilidad con el sistema de permisos de Firefox

## Instalación en Desarrollo

### Opción 1: Carga temporal (recomendada para desarrollo)

1. Abre Firefox
2. Navega a `about:debugging#/runtime/this-firefox`
3. Haz clic en "Cargar complemento temporal..."
4. Selecciona el archivo `manifest.json` en esta carpeta
5. La extensión se cargará temporalmente hasta que reinicies Firefox

### Opción 2: Instalación como archivo XPI (más permanente)

1. **Empaquetado manual:**
   ```bash
   cd /ruta/a/Auto-bot-extension-firefox
   zip -r ../wplace-autobot-firefox.xpi *
   ```

2. **Instalación del XPI:**
   - Opción A: Arrastra el archivo `.xpi` a una ventana de Firefox
   - Opción B: Ve a `about:addons` → Engranaje → "Instalar complemento desde archivo"

## Instalación para Uso Final

### Preparación para distribución

1. **Crear el paquete XPI:**
   ```bash
   # Desde la carpeta Auto-bot-extension-firefox
   zip -r wplace-autobot-firefox.xpi . -x "*.md" "*.txt"
   ```

2. **Firmar la extensión (para distribución pública):**
   - Crear cuenta en [AMO (addons.mozilla.org)](https://addons.mozilla.org/developers/)
   - Subir el XPI para revisión y firma automática
   - Una vez aprobada, se podrá instalar en cualquier Firefox

### Instalación por usuarios finales

**Método 1: Desde archivo XPI firmado**
```bash
# Los usuarios pueden instalar arrastrando el XPI a Firefox
# o usando about:addons → Instalar desde archivo
```

**Método 2: Distribución a través de AMO**
- Una vez publicada en AMO, los usuarios pueden buscar "WPlace AutoBOT"
- Instalación directa desde el navegador

## Compilación y Empaquetado Automatizado

### Script de compilación

Puedes crear un script para automatizar el proceso:

```bash
#!/bin/bash
# build-firefox.sh

# Limpiar compilaciones anteriores
rm -f *.xpi

# Crear el paquete
echo "Creando paquete para Firefox..."
zip -r "wplace-autobot-firefox-$(date +%Y%m%d).xpi" . \
    -x "*.md" "*.txt" "*.sh" "*.git*" "__pycache__/*" "*.pyc"

echo "Paquete creado: wplace-autobot-firefox-$(date +%Y%m%d).xpi"
```

### Validación de la extensión

Antes de distribuir, valida la extensión:

```bash
# Instalar web-ext (herramienta oficial de Mozilla)
npm install -g web-ext

# Validar la extensión
web-ext lint

# Ejecutar en un Firefox temporal para pruebas
web-ext run

# Crear XPI optimizado
web-ext build
```

## Desarrollo y Debug

### Debugging

1. Abre `about:debugging#/runtime/this-firefox`
2. Encuentra tu extensión en la lista
3. Haz clic en "Inspeccionar" para abrir las herramientas de desarrollo
4. Usa la consola para ver logs y errores

### Recarga durante desarrollo

- En `about:debugging`, haz clic en "Recargar" junto a tu extensión
- Los cambios en content scripts requieren recargar las páginas web

### Logs y errores

```javascript
// En cualquier parte del código, usa:
console.log("Debug:", datos);

// Para errores:
console.error("Error:", error);
```

## Estructura de Archivos

```
Auto-bot-extension-firefox/
├── manifest.json          # Configuración de la extensión (v2)
├── background.js          # Script de fondo
├── content.js            # Script de contenido
├── popup.html            # Interfaz del popup
├── popup.js              # Lógica del popup
├── icons/                # Iconos de la extensión
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # Este archivo
```

## Compatibilidad

- **Firefox Desktop:** 48+
- **Firefox Android:** 68+ (con limitaciones)
- **Firefox ESR:** Versiones soportadas

## Problemas Comunes

### Error de permisos
- Verifica que todos los permisos estén declarados en `manifest.json`
- Las APIs `browser.*` requieren los mismos permisos que `chrome.*`

### Script no se ejecuta
- Verifica que el content script esté registrado para el dominio correcto
- Revisa la consola de errores en about:debugging

### Popup no aparece
- Verifica que `default_popup` esté correctamente configurado en manifest.json
- Asegúrate de que popup.html existe y es válido

## Recursos Adicionales

- [Documentación oficial de WebExtensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Guía de migración Chrome → Firefox](https://extensionworkshop.com/documentation/develop/porting-a-google-chrome-extension/)
- [web-ext tool](https://github.com/mozilla/web-ext)
- [AMO Developer Hub](https://addons.mozilla.org/developers/)