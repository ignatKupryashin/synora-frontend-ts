import {$mainApi} from "../http";
import {AxiosResponse} from "axios";
import {ISynoraEvent} from "../models/SynoraEvent/ISynoraEvent";
import {ITransport} from "../models/Transport/ITransport";
import {ITemplate} from "../models/Template/ITemplate";
import {useProjectStore} from "../store/projectStore/useProjectStore";

export default class SynoraEventService {
    static async getAllEvents():Promise<AxiosResponse<ISynoraEvent[]>> {
        return await $mainApi.get('/events/');
    }

    static async getEvent(eventId: string):Promise<AxiosResponse<ISynoraEvent>> {
        return await $mainApi.get(`/events/${eventId}/`);
    }

    static async deleteEvent(eventId: string):Promise<AxiosResponse<ISynoraEvent>> {
        return await $mainApi.delete(`/events/${eventId}`);
    }

    static async createEvent(synoraEvent: ISynoraEvent): Promise<AxiosResponse<ISynoraEvent>>{
        return await $mainApi.post('/events/', synoraEvent);
    }

    static async patchEvent(event: ISynoraEvent): Promise<AxiosResponse<ISynoraEvent>>{
        return await $mainApi.patch(`/events/${event.id}/`, event);
    }

    static async addConfigToEvent(event: ISynoraEvent, transport: ITransport | undefined, template: ITemplate | undefined){
        return await $mainApi.post(`/events/${event.id}/relationships/`, {
            "template_id": template?.id,
            "transport_id": transport?.id
        });
    }


}