import path from "path"
import fs from "fs";

interface PluginInfo {
    path: string;
    name: string;
    entryPoints: Record<string, string>
}

export class PluginResolver {
    public static readonly plugins = Array<PluginInfo>();
    private static readonly PLUGIN_FILES = ["module.js", "ui.js"];

    public static searchPlugins() {
        const pluginsFolder = this.getPluginsFolder();
        for (const dir of fs.readdirSync(pluginsFolder, { withFileTypes: true })) {
            if (!dir.isDirectory() && !dir.isSymbolicLink()) continue;

            const pluginInfo: PluginInfo = {
                name: dir.name,
                path: path.join(dir.parentPath, dir.name),
                entryPoints: {}
            }

            const results = PluginResolver.PLUGIN_FILES.map(
                (file) => this.checkPluginEntry(pluginInfo, file)
            );

            if (results.some(Boolean)) {
                console.log("plugin found:", pluginInfo.name);
                this.plugins.push(pluginInfo);
            }
        }
    }

    private static checkPluginEntry(plugin: PluginInfo, file: string) {
        const entryPath = path.join(plugin.path, file);
        if (fs.existsSync(entryPath)) {
            const { name } = path.parse(file);
            plugin.entryPoints[name] = entryPath;
            return true;
        }
    }

    private static getPluginsFolder() {
        return path.join(process.cwd(), "plugins");
    }
}
