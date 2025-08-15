import { build } from "esbuild";

const args = new Set(process.argv.slice(2));
const dev = args.has("--dev");
const watch = args.has("--watch");

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
