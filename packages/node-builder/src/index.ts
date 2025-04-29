import fs, { readFileSync } from "fs"
import path from "path"
import esbuild from "esbuild";
import * as ResEdit from "resedit";
import * as PELibrary from "pe-library";
import childProcess from "child_process"
import postject from "postject";
import { BuildSettings } from "./types";
import { parse } from "dotenv"

interface BuildSettingsExtra extends BuildSettings {
    build: {
        main: string,
        binary: string,
        seaConfig: string,
        seaPreb: string,
    }
}

async function runCommand(target: string, args: string[]) {
    return new Promise<void>((resolve) => {
        const process = childProcess.spawn(target, args);
        process.on("exit", () => resolve());
    });
}

function generateBinary(settings: BuildSettingsExtra) {
    const data = fs.readFileSync(process.execPath);
    const exe = PELibrary.NtExecutable.from(data, { ignoreCert: true });
    const res = PELibrary.NtExecutableResource.from(exe);

    //Hide Console
    //exe.newHeader.optionalHeader.subsystem = 2;

    //Change Icon
    const iconPath = path.resolve(settings.icon);
    const iconGroupId = ResEdit.Resource.IconGroupEntry.fromEntries(res.entries)[0].id;
    const iconGroup = ResEdit.Data.IconFile.from(fs.readFileSync(iconPath));
    const iconsData = iconGroup.icons.map((item) => item.data);
    ResEdit.Resource.IconGroupEntry.replaceIconsForResource(res.entries, iconGroupId, 0, iconsData);

    const viList = ResEdit.Resource.VersionInfo.fromEntries(res.entries);
    const vi = viList[0];

    //Change version
    vi.setFileVersion(1, 0, 0, 0, 1033);
    vi.setStringValues({ lang: 1033, codepage: 1200 }, {
        ...settings.versionInfo,
        OriginalFilename: settings.binary
    });

    vi.outputToResourceEntries(res.entries);
    res.outputResource(exe);

    fs.writeFileSync(settings.build.binary, Buffer.from(exe.generate()));
}

function getEnvInjection(settings: BuildSettingsExtra) {
    if (!settings.envFile) return "";
    const envFile = path.resolve(process.cwd(), settings.envFile);
    const envs = parse(readFileSync(envFile, "utf8"));
    return `Object.assign(process.env, ${JSON.stringify(envs)});`
}

async function buildSource(settings: BuildSettingsExtra) {
    await esbuild.build({
        outfile: settings.build.main,
        entryPoints: [path.resolve(settings.entryPoint)],
        bundle: true,
        logLevel: "error",
        platform: "node",
        format: "cjs",
        minify: true,
        legalComments: "none",
        banner: {
            js: getEnvInjection(settings)
        }
    });
}

async function generateSeaConfig(settings: BuildSettingsExtra) {
    fs.writeFileSync(settings.build.seaConfig, JSON.stringify({
        ...settings.seaConfig,
        main: settings.build.main,
        output: settings.build.seaPreb
    }));

    await runCommand(process.execPath, ["--experimental-sea-config", settings.build.seaConfig]);
}

function generateBuildExtra(settings: BuildSettings): BuildSettingsExtra {
    const outDir = path.resolve(process.cwd(), settings.outputDir);
    return {
        ...settings,
        build: {
            binary: path.join(outDir, settings.binary),
            main: path.join(outDir, "main.js"),
            seaConfig: path.join(outDir, "sea-config.json"),
            seaPreb: path.join(outDir, "sea-preb.bin"),
        }
    }
}

export async function buildApp(settings: BuildSettings) {
    const extraSettings = generateBuildExtra(settings);
    await buildSource(extraSettings);
    generateBinary(extraSettings);
    await generateSeaConfig(extraSettings);
    await postject.inject(extraSettings.build.binary, 'NODE_SEA_BLOB', fs.readFileSync(extraSettings.build.seaPreb), {
        sentinelFuse: "NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2"
    });
}
