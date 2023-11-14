import {ISynoraEvent} from "../../models/SynoraEvent/ISynoraEvent";
import {create} from "zustand";
import {AxiosResponse} from "axios";
import {$mainApi} from "../../http";
import {ITransport} from "../../models/Transport/ITransport";
import {ITemplate} from "../../models/Template/ITemplate";
import {unsuccessful} from "../../components/UI/Toast/Toast";

type eventStore = {
    events: ISynoraEvent[];
    isLoading: boolean,
    errors: string[],
    addEvent: (event:ISynoraEvent) => void,
    removeEvent: (id:string) => void,
    fetchEvents: (userId: string, projectId: string) => Promise<boolean>;
    sendEvent: (event: ISynoraEvent) => Promise<AxiosResponse<ISynoraEvent>>;
    deleteEvent: (event: ISynoraEvent) => Promise<ISynoraEvent>;
    addConfigToEvent: (event: ISynoraEvent, transport: ITransport, template: ITemplate) => Promise<ISynoraEvent>;
    getEventWithConfig: (event: ISynoraEvent) => Promise<AxiosResponse<ISynoraEvent>>
}

export const useSynoraEventStore = create<eventStore>((set) => ({
    events: [],
    isLoading: false,
    errors: [],

    addEvent: (event: ISynoraEvent) => {
        set((state) => ({
            events: [...state.events, event]
        }))
    },

    removeEvent: (id: string) => {
        set((state) => ({
            events: state.events.filter((event: ISynoraEvent) => event.id !== id),
        }))
    },

    fetchEvents: async (userId: string, projectId: string) => {
        try {
            const data = await $mainApi.get(`/event/project/${projectId}/user/${userId}/`).then(
                (response) => (response.data));
            set({events: data})
            return true;
        } catch (e) {
            unsuccessful((e as Error).message) // Вывод ошибки если не получены события
        }
        return false
    },

    sendEvent: async (event: ISynoraEvent) => {
        return $mainApi.post(`/event/project/${event.project_identifier}/user/${event.user_identifier}/`, event);
    },

    deleteEvent: async (event: ISynoraEvent) => {
        const data = await $mainApi.delete(`/event/project/${event.project_identifier}/user/${event.user_identifier}/id/${event.id}/`)
        return data.data;
    },

    getEventWithConfig: async (event: ISynoraEvent) => {
        return await $mainApi.get(`/event/project/${event.project_identifier}/user/${event.user_identifier}/event_code/${event.event_code}/`);
        },

    addConfigToEvent: async (event: ISynoraEvent, transport: ITransport, template: ITemplate) => {
        const data = await $mainApi.post(`/event_connections/project/${event.project_identifier}/user/${event.user_identifier}/`,
            {
                "event_code": event.event_code,
                "template_id": template.id,
                "transport_id": transport.id
            }
            )
        return data.data;
    }
}));