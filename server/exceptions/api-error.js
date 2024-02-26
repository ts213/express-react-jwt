export default class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован');
    }

    static BadRequest(message = 'Bad request', errors = []) {
        return new ApiError(400, message, errors);
    }

    static ServerError(message, errors = []) {
        return new ApiError(500, message, errors);
    }
}
