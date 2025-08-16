import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../types/schema/v1/user.type';

const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      enum: ['normal_user', 'admin', 'super_admin', 'speaker'],
      default: 'normal_user',
      required: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
