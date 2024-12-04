import { EventParams, EventResponse } from "./EVENTS/MainEvents";

interface IEventsUsecases {
    createEvent(data: any, params: EventParams): Promise<EventResponse>
    findEvent(data: any, params: EventParams): Promise<EventResponse>
    listEvents(data: any, params: EventParams): Promise<EventResponse>
    updateEvent(data: any, params: EventParams): Promise<EventResponse>
    deleteEvent(data: any, params: EventParams): Promise<EventResponse>
}

export default IEventsUsecases 