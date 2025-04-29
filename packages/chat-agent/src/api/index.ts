import CORS from "cors";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ORIGINS, OVERLAY_URL } from "../settings";
import { appRoutes } from "./routes/routes";

const app = express();
app.use(CORS({ origin: ORIGINS }));

app.use(function(req, res, next) {
    if (!req.headers.origin || ORIGINS.includes(req.headers.origin)) {
        return next();
    }
    res.end();
});

app.use("/api", appRoutes);

app.use(createProxyMiddleware({
    target: OVERLAY_URL,
    changeOrigin: true
}));

export { app }
