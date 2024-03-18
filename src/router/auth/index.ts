import { Router } from "express";
import { AuthController } from "../../controllers/auth/AuthController";
import { body } from "express-validator";

const router: Router = Router();

const authController = new AuthController();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  body("name").isLength({ min: 2, max: 32 }),
  body("lastname").isLength({ min: 2, max: 32 }),
  authController.register
);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/activate/:activationLink", authController.activate);
router.post("/refresh-token", authController.refresh);
router.get("/users", authController.getUsers);

export default router;
