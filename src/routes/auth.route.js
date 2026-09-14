import { Router } from "express";
import { signUp, logIn, logOut, getCurrentUser } from "../controllers/auth.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/log-in", logIn);
authRouter.post("/log-out", logOut);
authRouter.get("/me", authorize, getCurrentUser);

export default authRouter;