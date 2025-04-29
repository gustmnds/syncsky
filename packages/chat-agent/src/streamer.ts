import CORS from "cors";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { getLocalIp } from "./utils/local-ip";
import { ORIGINS, OVERLAY_URL } from "./settings";

const app = express();
app.use(CORS({ origin: ORIGINS }));

app.use(function(req, res, next) {
    if (!req.headers.origin || ORIGINS.includes(req.headers.origin)) {
        return next();
    }
    res.end();
});

app.get("/ip", function(req, res) {
    res.write(getLocalIp());
    res.end();
})

app.use(createProxyMiddleware({
    target: OVERLAY_URL,
    changeOrigin: true
}));

export { app }
