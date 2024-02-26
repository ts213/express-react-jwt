import jwt from 'jsonwebtoken';
import { Token } from '../models/models.js';

export default new class TokenService {
  generateTokens(payload) {
    // const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' });
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '66s' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '60s' });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, data) => data);
  }

  validateRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, data) => data);
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.update({ refreshToken });
    } else {
      Token.create({ UserId: userId, refreshToken });
    }
  }

  async removeToken(refreshToken) {
    return Token.destroy({ where: { refreshToken } });
  }

  async findToken(refreshToken) {
    return Token.findOne({ where: { refreshToken } });
  }
}
