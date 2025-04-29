import { Request, Response } from "express";
import { getLocalIp } from "../../utils/local-ip";

export class IPController {
    public static getIp(req: Request, res: Response) {
        res.write(getLocalIp());
        res.end();
    }
}
