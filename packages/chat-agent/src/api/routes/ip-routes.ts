import { Router } from "express";
import { IPController } from "../controllers/ip-controller";

const ipRoutes = Router();

ipRoutes.get("/", IPController.getIp);

export { ipRoutes };
