import User from "../../db/models/User";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { MailService } from "./MailService";
import { TokenService } from "./TokenService";
import { AuthDTO } from "../../dtos/auth/auth";
import { ApiError } from "../../exception/ApiError";

export class AuthService {
  private mailService: MailService;
  private tokenService: TokenService;

  constructor() {
    this.mailService = new MailService();
    this.tokenService = new TokenService();
  }

  register = async (
    name: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<Error | { user: AuthDTO; accessToken: string; refreshToken: string; }> => {
      if (!email || !password) {
        throw ApiError.BadRequest("Email and password must not be empty");
      }
  
      if (name.length < 2 || lastname.length < 2) {
        throw ApiError.BadRequest("Name and lastname must be at least 2 characters long");
      }
  
      const candidate = await User.findOne({ email });
  
      if (candidate) {
        throw ApiError.Conflict(`User with email ${email} already exists`);
      }
  
      const hashPassword = await bcrypt.hash(password, 5);
      const activationLink = uuidv4();
  
      let user;
      try {
        user = await User.create({
          name,
          lastname,
          email,
          password: hashPassword,
          activationLink,
          isActivated: false,
        });
      } catch (error) {
        throw ApiError.InternalServerError();
      }
  
      try {
        await this.mailService.sendActivationMail(email, activationLink);
      } catch (error: any) {
        throw ApiError.InternalServerError();
      }
  
      const authDTO = new AuthDTO({
        email: user.email,
        _id: user._id.toString(),
        isActivated: user.isActivated,
      });
      const tokens = this.tokenService.generateTokens({ ...authDTO });
  
      try {
        await this.tokenService.saveToken(authDTO.id, tokens.refreshToken);
      } catch (error) {
        throw ApiError.InternalServerError();
      }
  
      return {
        ...tokens,
        user: authDTO,
      };
  }
  
  activate = async (activationLink: string) => {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiError.NotFound("Incorrect activation link");
    }
    user.isActivated = true;
    try {
      await user.save();
    } catch (error) {
      console.log("error save UserModel", error);
      throw ApiError.InternalServerError();
    }
  }
}
