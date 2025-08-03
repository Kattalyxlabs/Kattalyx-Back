import mongoose, { Schema, Document } from "mongoose";

interface ILocation {
  longitude: string;
  latitude: string;
}

export interface IUser extends Document {
  user_id: number;
  user_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  phone?: number;
  location?: ILocation;
  created_at: Date;
  updated_at: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  user_id: {
    type: Number,
    required: true,
    unique: true,
  },
  user_name: {
    type: String,
    maxlength: 25,
  },
  first_name: {
    type: String,
    maxlength: 25,
  },
  last_name: {
    type: String,
    maxlength: 25,
  },
  email: {
    type: String,
    maxlength: 25,
  },
  address: {
    type: String,
    maxlength: 150,
  },
  phone: {
    type: Number,
  },
  location: {
    longitude: { type: String },
    latitude: { type: String },
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Optionally add pre-save hook to update `updated_at`
UserSchema.pre<IUser>("save", function (next) {
  this.updated_at = new Date();
  next();
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
