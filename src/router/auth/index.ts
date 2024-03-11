import { Router } from "express";
import { AuthController } from "../../controllers/auth/AuthController";

const router: Router = Router();

const authController = new AuthController();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get("/logout", authController.logout.bind(authController));
router.get("/activate/:activationLink", authController.activate.bind(authController));
router.post("/refresh-token", authController.refresh.bind(authController));
router.get("/users", authController.getUsers.bind(authController));

export default router;
