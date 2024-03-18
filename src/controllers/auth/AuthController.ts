import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../service/auth/AuthService";
import { FieldValidationError, validationResult } from "express-validator";
import { ApiError } from "../../exception/ApiError";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  private validateRequest = (req: Request): string[] | null => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errors.array().map((error) => {
        if ("param" in error) {
          return `${error.param}: ${error.msg}`;
        }
        return error.msg;
      });
    }
    return null;
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorMessages = this.validateRequest(req);
      if (errorMessages) {
        return next(ApiError.BadRequest("Validation error", errorMessages));
      }

      const { name, lastname, email, password } = req.body;
      const userData = await this.authService.register(
        name,
        lastname,
        email,
        password
      );

      if (userData instanceof Error) {
        return next(userData);
      }

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error: any) {
      next(error);
    }
  };

  activate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const activationLink: string = req.params.activationLink;
      await this.authService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL as string);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: { email: string; password: string } = req.body;
      // logic
    } catch (error) {
      next(error);
    }
  };

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // logic
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      // logic
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ message: "Get all users" });
    } catch (error) {
      next(error);
    }
  }
}
