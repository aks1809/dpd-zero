import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import network from '../config/network.js';

const privateKey = fs.readFileSync('./private.key', 'utf8');

const user = (sequelize, DataTypes) => {
  const UserSchema = sequelize.define(
    'users',
    {
      user_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: 'users_UN',
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: 'email_UNIQUE',
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value));
        },
      },
      full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
        {
          name: 'email_UNIQUE',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'email' }],
        },
        {
          name: 'users_UN',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'username' }],
        },
      ],
    }
  );

  // eslint-disable-next-line func-names
  UserSchema.prototype.authenticateUser = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // eslint-disable-next-line func-names
  UserSchema.prototype.createToken = function () {
    return jwt.sign(
      {
        email: this.email,
        username: this.username,
        full_name: this.full_name,
      },
      privateKey,
      {
        issuer: 'DPD',
        audience: `${this.user_id}`,
        expiresIn: network.JWT_EXPIRATION,
        algorithm: 'RS256',
      }
    );
  };
  // eslint-disable-next-line func-names
  UserSchema.prototype.toAuthJSON = function () {
    return `${this.createToken()}`;
  };
  return UserSchema;
};

export default user;
