import {$mainApi} from "../http";
import {ITransport} from "../models/Transport/ITransport";
import {AxiosResponse} from "axios";

export default class TransportService {

    static async getAllTransports():Promise<AxiosResponse<ITransport[]>> {
        return await $mainApi.get(`/transports/`);
    }

    static async createTransport(transport: ITransport):Promise<AxiosResponse<ITransport>>{
        return await $mainApi.post(`/transports/`, transport);
    }

    static async deleteTransport(transportId: string):Promise<AxiosResponse<ITransport>>{
        return await $mainApi.delete(`/transports/${transportId}`);
    }

    static async patchTransport(transport: ITransport):Promise<AxiosResponse<ITransport>>{
        return await $mainApi.patch(`transports/${transport.id}`, transport);
    }
}