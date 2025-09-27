// src/models/user.model.ts
import bcrypt from 'bcrypt'; // bcryptjs → bcrypt
import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../interfaces/user.interface';

const userSchema: Schema<User & Document> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    userStatus: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true },
);

// Password hashing before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const UserModel = mongoose.model<User & Document>('User', userSchema);
