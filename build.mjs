import { build } from "esbuild";
import { copyFileSync } from "fs";

const args = new Set(process.argv.slice(2));
const dev = args.has("--dev");
const watch = args.has("--watch");

// Por ahora, usar archivos originales hasta completar la migración
const useOriginals = false; // ✅ Migración del farm completada

if (useOriginals) {
  console.log("🔄 Usando archivos originales temporalmente...");
  
  try {
    copyFileSync("Auto-Farm.original.js", "Auto-Farm.js");
    copyFileSync("Auto-Image.original.js", "Auto-Image.js");
    copyFileSync("Auto-Launcher.original.js", "Auto-Launcher.js");
    
    console.log("✅ Archivos originales copiados exitosamente");
    console.log("📋 Para completar la migración modular, edita build.mjs y cambia useOriginals = false");
  } catch (error) {
    console.error("❌ Error copiando archivos originales:", error.message);
    process.exit(1);
  }
  
  process.exit(0);
}

// Código de build modular (para cuando la migración esté completa)
const common = {
  bundle: true,
  format: "iife",             // ideal para bookmarklet
  target: ["es2019"],
  legalComments: "none",
  banner: {
    js:
      "/* WPlace AutoBOT — uso bajo tu responsabilidad. " +
      "Compilado " + new Date().toISOString() + " */"
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(dev ? "development" : "production")
  }
};

const jobs = [
  { in: "src/entries/farm.js",     out: "Auto-Farm.js" },
  { in: "src/entries/image.js",    out: "Auto-Image.js" },
  { in: "src/entries/launcher.js", out: "Auto-Launcher.js" }
].map(({ in: entry, out: outfile }) => {
  const buildOptions = {
    entryPoints: [entry],
    outfile,
    ...common,
    minify: !dev,
    sourcemap: dev ? "inline" : false
  };
  
  if (watch) {
    buildOptions.watch = {
      onRebuild(error) {
        if (error) console.error(`⛔ Rebuild failed for ${outfile}`, error);
        else console.log(`✅ Rebuilt ${outfile}`);
      }
    };
  }
  
  return build(buildOptions);
});

await Promise.all(jobs);
console.log(
  `✨ Build ${dev ? "DEV" : "PROD"} listo. Archivos en raíz: Auto-Farm.js, Auto-Image.js, Auto-Launcher.js`
);
