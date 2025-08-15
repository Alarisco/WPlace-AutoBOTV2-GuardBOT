export const LAUNCHER_CONFIG = {
  RAW_BASE: 'https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main',
  REFRESH_INTERVAL: 60000, // 1 minuto
  THEME: {
    primary: '#000000',
    secondary: '#111111',
    accent: '#222222',
    text: '#ffffff',
    highlight: '#775ce3',
    success: '#00ff00',
    error: '#ff0000'
  }
};

export const LAUNCHER_TEXTS = {
  es: {
    title: 'WPlace AutoBOT',
    autoFarm: '🌾 Auto-Farm',
    autoImage: '🎨 Auto-Image',
    selection: 'Selección',
    user: 'Usuario',
    charges: 'Cargas',
    backend: 'Backend',
    database: 'Database',
    uptime: 'Uptime',
    close: 'Cerrar',
    launch: 'Lanzar',
    loading: 'Cargando…',
    executing: 'Ejecutando…',
    downloading: 'Descargando script…',
    chooseBot: 'Elige un bot y presiona Lanzar',
    readyToLaunch: 'Listo para lanzar',
    loadError: 'Error al cargar',
    loadErrorMsg: 'No se pudo cargar el bot seleccionado. Revisa tu conexión o inténtalo de nuevo.',
    checking: '🔄 Verificando...',
    online: '🟢 Online',
    offline: '🔴 Offline',
    ok: '🟢 OK',
    error: '🔴 Error',
    unknown: '-'
  }
};

export const launcherState = {
  me: null,
  health: null,
  refreshTimer: null,
  selectedBot: null
};
