import { existsSync, readFileSync } from "fs";
import path from "path";
import { buildApp } from ".";

async function main(args: string[]) {
    if (args.length !== 1) {
        throw new Error("Invalid args");
    }

    const buildSettins = path.join(process.cwd(), args[0]);

    if (!existsSync(buildSettins)) {
        throw new Error(`"${buildSettins}" not found`);
    }

    const data = JSON.parse(readFileSync(buildSettins, "utf8"));
    await buildApp(data);
}

main(process.argv.slice(2))
