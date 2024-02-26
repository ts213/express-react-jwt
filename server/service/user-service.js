import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import tokenService from './token-service.js';
import { User } from '../models/models.js';
import { UserDto } from '../dtos/user-dto.js';

export default new class UserService {
  async registration(email, password) {
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await User.create({
      email,
      password: hashPassword,
      activationLink
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return new Error('Пользователь с таким email не найден');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      return new Error('Неверный пароль');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } });
    if (user) {
      user.update({ isActivated: true, activationLink: null });
    } else {
      return new Error('Неккоректная ссылка активации');
    }
  }

  async logout(refreshToken) {
    return tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);
    if (!userData || !dbToken) {
      return new Error('Incorrect token');
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    return User.findAll({
      attributes: ['id', 'email', 'isActivated',],
    });
  }
}
