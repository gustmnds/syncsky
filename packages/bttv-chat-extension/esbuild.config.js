const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/plugin/extension.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  external: [],
  outdir: "dist",
  minify: false,
  legalComments: "none"
});
