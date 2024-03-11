import User from "../../db/models/User";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { MailService } from "./MailService";
import { TokenService } from "./TokenService";
import { AuthDTO } from "../../dtos/auth/auth";

export class AuthService {
  private mailService: MailService;
  private tokenService: TokenService;

  constructor() {
    this.mailService = new MailService();
    this.tokenService = new TokenService();
  }

  async register(
    name: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<{ user: AuthDTO; accessToken: string; refreshToken: string }> {
    if (!email || !password) {
      throw new Error("Email and password must not be empty");
    }

    if (name.length < 2 || lastname.length < 2) {
      throw new Error("Name and lastname must be at least 2 characters long");
    }

    const candidate = await User.findOne({ email });

    if (candidate) {
      throw new Error(`User with email ${email} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuidv4();
    console.log(activationLink);
    const user = await User.create({
      name,
      lastname,
      email,
      password: hashPassword,
      activationLink,
      isActivated: false,
    });

    try {
      await this.mailService.sendActivationMail(email, activationLink);
    } catch (error) {
      throw new Error("Error sending activation mail");
    }

    const authDTO = new AuthDTO({
      email: user.email,
      _id: user._id.toString(),
      isActivated: user.isActivated,
    });
    const tokens = this.tokenService.generateTokens({ ...authDTO });
    await this.tokenService.saveToken(authDTO.id, tokens.refreshToken);

    return {
      ...tokens,
      user: authDTO,
    };
  }
}
