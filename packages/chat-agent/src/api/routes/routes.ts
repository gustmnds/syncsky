import { Router } from "express";
import { ipRoutes } from "./ip-routes";
import { pluginRoutes } from "./plugins";

const appRoutes = Router();

appRoutes.use("/ip", ipRoutes);
appRoutes.use("/plugins", pluginRoutes);

export { appRoutes };
