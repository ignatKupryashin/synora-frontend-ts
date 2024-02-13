import {$mainApi} from "../http";
import {AxiosResponse} from "axios";
import {ISynoraEvent} from "../models/SynoraEvent/ISynoraEvent";
import {ITransport} from "../models/Transport/ITransport";
import {ITemplate} from "../models/Template/ITemplate";

export default class SynoraEventService {

    static async getAllEvents():Promise<AxiosResponse<ISynoraEvent[]>> {
        return await $mainApi.get('/events/');
    }

    static async getEvent(eventId: string):Promise<AxiosResponse<ISynoraEvent>> {
        return await $mainApi.get(`/events/${eventId}/`);
    }

    static async deleteEvent(eventId: string):Promise<AxiosResponse<ISynoraEvent>> {
        return await $mainApi.get(`/events/${eventId}`);
    }

    static async createEvent(eventName: string): Promise<AxiosResponse<ISynoraEvent>>{
        return await $mainApi.post('/events/', {"event_code":`${eventName}`});
    }

    static async patchEvent(event: ISynoraEvent): Promise<AxiosResponse<ISynoraEvent>>{
        return await $mainApi.patch(`/events/${event.id}/`, event);
    }

    static async addConfigToEvent(event: ISynoraEvent, transport: ITransport | undefined, template: ITemplate | undefined){

    }


}