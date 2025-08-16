import { Document } from 'mongoose';

export interface IPackage extends Document {
  packageName: string;
  price: number;
  features: string[];
}
