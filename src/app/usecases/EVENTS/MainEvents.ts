import IEventsUsecases from "../IEventsUsecases";
import { CreateEvent } from "./functions/CreateEvent";
import { DeleteEvent } from "./functions/DeleteEvent";
import { FindEvent } from "./functions/FindEvent";
import { ListEvents } from "./functions/ListEvents";
import { UpdateEvent } from "./functions/UpdateEvent";

export interface EventParams {
    event_id?: string;
    local_id?: string;
    adm_id?: string;
}

export interface EventResponse {
    status_code: number;
    body: {
        msg?: string;
        event?: any;
        events?: any[];
    };
}

class MainEvents implements IEventsUsecases {
    createEvent(data: any, params: EventParams): Promise<EventResponse> {
        return CreateEvent(data)
    }

    findEvent(data: any, params: EventParams): Promise<EventResponse> {
        if (!params.event_id) {
            return Promise.reject({
                status_code: 400,
                body: { msg: "ID do evento é obrigatório" }
            });
        }
        return FindEvent(params.event_id)
    }

    listEvents(data: any, params: EventParams): Promise<EventResponse> {
        if (!params.local_id) {
            return Promise.reject({
                status_code: 400,
                body: { msg: "ID do local é obrigatório" }
            });
        }
        return ListEvents(params.local_id)
    }

    updateEvent(data: any, params: EventParams): Promise<EventResponse> {
        if (!params.event_id) {
            return Promise.reject({
                status_code: 400,
                body: { msg: "ID do evento é obrigatório" }
            });
        }
        return UpdateEvent(params.event_id, data)
    }

    deleteEvent(data: any, params: EventParams): Promise<EventResponse> {
        if (!params.event_id) {
            return Promise.reject({
                status_code: 400,
                body: { msg: "ID do evento é obrigatório" }
            });
        }
        return DeleteEvent(params.event_id)
    }
}

export default MainEvents; 