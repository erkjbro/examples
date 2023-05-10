import { GET, Path, POST } from 'typescript-rest';
import Event, { EventDoc } from '../models/events';

@Path('/api/events')
export class EventsController {
  public constructor() {
    console.log('Events controller created');
  }

  @GET
  listAllEvents(): Promise<Array<EventDoc>> {
    return Event.find({}).exec();
  }

  @POST
  createNewEvent(newEvent: EventDoc): Promise<EventDoc> {
    return Event.create(newEvent);
  }
}
