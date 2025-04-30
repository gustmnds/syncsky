const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/plugin/module.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  external: [],
  outdir: "dist",
  minify: false,
  legalComments: "none"
});

esbuild.build({
  entryPoints: ["src/plugin/ui.ts"],
  bundle: true,
  format: "esm",
  platform: "browser",
  external: [],
  outdir: "dist",
  minify: false,
  legalComments: "none",
  loader: {
    ".png": "file",
  }
});
