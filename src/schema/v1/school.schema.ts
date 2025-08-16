import mongoose, { Schema } from "mongoose";
import { ISchool } from "../../types/schema/v1/school..type";


const schoolSchema = new Schema<ISchool>(
  {
    schoolName: {
      type: String,
      required: true,
    },
    schoolAddress: {
      type: String,
      required: true,
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    packages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
      },
    ],
    principalName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<ISchool>('School', schoolSchema);
