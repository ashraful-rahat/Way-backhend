import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { generateToken } from '../../utils/jwt';
import { UserModel } from '../models/user.model';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log('👉 Request body:', req.body);

    const user = await UserModel.findOne({ email });
    console.log('👉 User from DB:', user);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials (user not found)' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('👉 Compare result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials (password mismatch)' });
    }

    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
