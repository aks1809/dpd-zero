import network from '../config/network.js';
import { createUser } from './dao.js';

export const loginService = async (req) => {
  const access_token = req.user.toAuthJSON();
  return {
    access_token,
    expires_in: network.JWT_EXPIRATION,
  };
};

export const registerService = async (body) => {
  try {
    const [user, created] = await createUser(body);
    // is user already exists then return 400
    if (!created) {
      if (body.username === user.username) {
        return [
          false,
          {},
          'USERNAME_EXISTS',
          'The provided username is already taken. Please choose a different username.',
        ];
      }
      return [
        false,
        {},
        'EMAIL_EXISTS',
        'The provided email is already registered. Please use a different email address.',
      ];
    }
    const userData = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      full_name: user.first_name,
      age: user.age,
      gender: user.gender,
    };
    return [true, userData, null, 'User successfully registered!'];
  } catch (error) {
    console.log(
      '------user_authentication service.js registerService error-------',
      error
    );
    return [false];
  }
};
