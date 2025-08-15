import { Document, Types } from 'mongoose';
import { IEvent } from './event.type';


export interface ISchool extends Document {
  schoolName: string;
  schoolAddress: string;
  events: Types.ObjectId[] | IEvent[];
  packages: Types.ObjectId[];
  principalName: string;
}
