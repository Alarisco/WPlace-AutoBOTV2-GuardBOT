// Entry point para Auto-Slave
import { runSlave } from '../slave/index.js';

// Ejecutar el slave automáticamente
runSlave().catch(error => {
  console.error('[Auto-Slave] Error fatal:', error);
});