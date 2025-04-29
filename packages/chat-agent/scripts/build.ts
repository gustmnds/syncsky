import { buildApp } from "@syncsky/node-builder";


async function main() {
    await buildApp(require("../node-build.json"));
}

main();
