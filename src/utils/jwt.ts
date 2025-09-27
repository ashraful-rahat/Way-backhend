import jwt from 'jsonwebtoken';
import config from '../app/config';

export const generateToken = (userId: string, role: 'admin' | 'user') => {
  // Implementation to generate JWT token
  return jwt.sign({ userId, role }, config.jwt_secret, { expiresIn: '3h' });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt_secret);
    return decoded;
  } catch (error) {
    return null;
  }
};
