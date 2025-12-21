import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import Admin from '../models/Admin.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Токен доступа отсутствует' 
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Недействительный токен' 
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Недействительный токен' 
    });
  }
};

export const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });
};
