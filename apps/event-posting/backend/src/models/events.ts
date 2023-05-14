import { Document, Model, model, Schema } from 'mongoose';

export interface EventType {
  name: string;
  link: string;
  date: Date;
  organizer: string;
}

export type EventDoc = EventType & Document;

export interface EventModel extends Model<EventDoc> {
  build(attr: any): EventDoc;
}

const EventSchema = new Schema(
  {
    name: String,
    link: String,
    date: Date,
    organizer: String,
  },
  { timestamps: true },
);

const Event: Model<EventDoc> = model<EventDoc, EventModel>('Event', EventSchema);
export default Event;
