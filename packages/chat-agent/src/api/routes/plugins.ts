import { Router } from "express";
import { PluginController } from "../controllers/plugin-controller";

const pluginRoutes = Router();

pluginRoutes.get("/:pluginName/{*filePath}", PluginController.getResource);
pluginRoutes.get("/", PluginController.getUiPlugins);

export { pluginRoutes };
