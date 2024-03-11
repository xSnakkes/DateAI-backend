import jwt, { Secret } from "jsonwebtoken";
import Token from "../../db/jwt/Token";

export class TokenService {
  generateTokens(payload: any): { accessToken: string, refreshToken: string } {
    const accessSecret: string | undefined = process.env.JWT_ACCESS_SECRET;
    const refreshSecret: string | undefined = process.env.JWT_REFRESH_SECRET;

    if (!accessSecret || !refreshSecret) {
      throw new Error("JWT secret keys are not defined!");
    }

    const accessToken: Secret = jwt.sign(payload, accessSecret, { expiresIn: "30m" });
    const refreshToken: Secret = jwt.sign(payload, refreshSecret, { expiresIn: "30d" });

    return { accessToken, refreshToken };
  }

  async saveToken(userId: string, refreshToken: string): Promise<any> {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }
}
