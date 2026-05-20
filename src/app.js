import express from "express";
import cookieParser from "cookie-parser";
import Subscription from "./models/subscription.model.js";
import authRouter from "./routes/auth.route.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/subscription",subscriptionRouter);
app.use("/api/v1/workflows",workflowRouter);


app.get("/",(req,res) => {
    res.send(`welcome to Subcription Tracker API`);
});

export default app;