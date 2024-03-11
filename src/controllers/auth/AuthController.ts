import { Request, Response } from 'express';
import { AuthService } from '../../service/auth/AuthService';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    try {
      const { name, lastname, email, password }: { name: string, lastname: string, email: string, password: string } = req.body;
      const userData = await this.authService.register(name, lastname, email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password }: { email: string, password: string } = req.body;
      // logic
    } catch (error) {
      console.error(error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      // logic
    } catch (error) {
      console.error(error);
    }
  }

  async activate(req: Request, res: Response) {
    try {
      const activationLink: string = req.params.activationLink;
      // logic
    } catch (error) {
      console.error(error);
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      // logic
    } catch (error) {
      console.error(error);
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      res.json({ message: "Get all users" });
    } catch (error) {
      console.error(error);
    }
  }
}