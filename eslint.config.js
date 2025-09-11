import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: [
      'Auto-Farm.js',
      'Auto-Guard.js', 
      'Auto-Image.js',
      'Auto-Launcher.js',
      'node_modules/**'
    ]
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        fetch: 'readonly',
        alert: 'readonly',
        localStorage: 'readonly',
        AbortController: 'readonly',
        Promise: 'readonly',
        Map: 'readonly',
        createImageBitmap: 'readonly',
        OffscreenCanvas: 'readonly',
        Request: 'readonly',
  Response: 'readonly',
  process: 'readonly',
  // Añadidos para bundle generado
  MutationObserver: 'readonly',
  Node: 'readonly',
  Blob: 'readonly',
  URL: 'readonly',
  Event: 'readonly',
  WebSocket: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['warn', { 
        args: 'none',
        vars: 'all',
        varsIgnorePattern: '^_',
        caughtErrors: 'none'
      }],
      'no-implicit-globals': 'error',
      'no-alert': 'off',
      'no-empty': ['error', { 'allowEmptyCatch': true }]
    }
  }
];
