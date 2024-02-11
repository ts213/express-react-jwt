import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
});

await sequelize.authenticate();

export const Token = sequelize.define('Token', {
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

export const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activationLink: {
      type: DataTypes.STRING,
    }
  }
);

User.hasMany(Token);
Token.belongsTo(User);
// await User.sync({ force: true });
// await Token.sync({ force: true });
