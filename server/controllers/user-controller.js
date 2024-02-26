import UserService from '../service/user-service.js';
import ApiError from '../exceptions/api-error.js';

export default new class UserController {
  cookieProps = { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true };

  registration = async(req, res, next) => {
    const { email, password } = req.body;
    const userData = await UserService.registration(email, password);
    if (!userData) {
      return next(ApiError.ServerError('Server error'));
    }
    res.cookie('refreshToken', userData.refreshToken, this.cookieProps);
    return res.json(userData);
  };

  login = async(req, res, next) => {
    const { email, password } = req.body;
    const userData = await UserService.login(email, password);
    if (userData instanceof Error) {
      return next(ApiError.BadRequest(userData.message));
    }
    res.cookie('refreshToken', userData.refreshToken, this.cookieProps);
    return res.json(userData);
  };

  logout = async(req, res) => {
    const { refreshToken } = req.cookies;
    const token = await UserService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
  };

  activate = async(req, res, next) => {
    const activationLink = req.params.activationLink;
    const error = await UserService.activate(activationLink);
    if (error) {
      return next(ApiError.BadRequest(error.message));
    }
    return res.redirect(process.env.API_URL + '/api/');
  };

  refresh = async(req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = await UserService.refresh(refreshToken);
    if (userData instanceof Error) {
      return next(ApiError.UnauthorizedError(userData.message));
    }
    res.cookie('refreshToken', userData.refreshToken, this.cookieProps);
    return res.json(userData);
  };

  getUsers = async (req, res) => {
    const users = await UserService.getAllUsers();
    return res.json(users);
  };
}
