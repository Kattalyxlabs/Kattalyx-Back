import mongoose, { Schema } from "mongoose";
import { IPackage } from "../../types/schema/v1/package.type";

const packageSchema = new Schema<IPackage>(
  {
    packageName: String,
    price: Number,
    features: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model<IPackage>('Package', packageSchema);
