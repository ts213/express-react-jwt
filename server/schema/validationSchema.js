import { User } from '../models/models.js';

const emailValidation = {
  isEmail: true,
  errorMessage: 'Incorrect email',
};

const passwordValidation = {
  isLength: { options: { min: 5, max: 32 } },
  errorMessage: 'password < 5 or > 32',
};

export const registrationSchema = {
  email: {
    ...emailValidation,
    emailNotInUse: {
      custom: async (email) => {
        const user = await User.findOne({ where: { email } });
        if (user) throw new Error('E-mail already in use');
      },
    },
  },
  password: passwordValidation,
};

export const loginSchema = {
  email: emailValidation,
  password: passwordValidation,
};

export const refreshTokenSchema = {
  refreshToken: { isJWT: true, errorMessage: 'invalid refresh token' },
};

export const activationLinkSchema = {
  activationLink: { isUUID: true, errorMessage: "Invalid link" },
};
