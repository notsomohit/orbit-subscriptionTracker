import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.route.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(arcjetMiddleware);

// API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscription", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

// Serve Frontend Static Files
const frontendDistPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDistPath));

// Catch-all route to serve React's index.html for client-side routing
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
});

export default app;