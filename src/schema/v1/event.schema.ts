import mongoose, { Schema } from "mongoose";
import { IEvent } from "../../types/schema/v1/event.type";

const eventSchema = new Schema<IEvent>(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventSpeakers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    venue: {
      type: String,
      required: true,
    },
    numberOfPeople: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['upcoming', 'completed'],
      default: 'upcoming',
    },
  },
  { timestamps: true }
);

 export default mongoose.model<IEvent>('Event', eventSchema);
