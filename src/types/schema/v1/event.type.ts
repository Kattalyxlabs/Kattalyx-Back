import { Document, Types } from 'mongoose';
import { IUser } from './user.type';


export type EventStatus = 'upcoming' | 'completed';

export interface IEvent extends Document {
  eventName: string;
  eventDate: Date;
  eventSpeakers: Types.ObjectId[] | IUser[];
  venue: string;
  numberOfPeople: number;
  status: EventStatus;
}
