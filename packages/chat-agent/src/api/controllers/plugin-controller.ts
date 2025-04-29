import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { PluginResolver } from "../../plugins/plugin-resolver";
import { APP_PORT } from "../../settings";
export class PluginController {
    public static getResource(req: Request, res: Response) {
        const { pluginName, filePath } = req.params;
        const targetPlugin = PluginResolver.plugins.find((item) => item.name == pluginName)

        if (!targetPlugin) {
            return void res.status(404).end();
        }

        const assetPath = path.join(targetPlugin.path, ...filePath);
        if (!fs.existsSync(assetPath)) {
            return void res.status(404).end();
        }

        return void res.sendFile(assetPath);
    }

    public static getUiPlugins(req: Request, res: Response) {
        const importPaths = [];
        for (let plugin of PluginResolver.plugins) {
            const UIEntry = plugin.entryPoints["ui"];
            if (UIEntry) {
                importPaths.push("http://127.0.0.1:" + APP_PORT + "/api/plugins/" + plugin.name + "/ui.js");
            }
        }

        res.json(importPaths);
    }
}
