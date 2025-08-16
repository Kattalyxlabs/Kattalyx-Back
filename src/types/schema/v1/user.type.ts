import { Document } from 'mongoose';

export type UserRole = 'normal_user' | 'admin' | 'super_admin' | 'speaker';

export interface IUser extends Document {
  role: UserRole;
  name: string;
  email: string;
  password: string;
}
