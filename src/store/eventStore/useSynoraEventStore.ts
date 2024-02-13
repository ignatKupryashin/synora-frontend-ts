import {ISynoraEvent} from "../../models/SynoraEvent/ISynoraEvent";
import {create} from "zustand";
import {AxiosResponse} from "axios";
import {$mainApi} from "../../http";
import {ITransport} from "../../models/Transport/ITransport";
import {ITemplate} from "../../models/Template/ITemplate";
import {unsuccessful} from "../../components/UI/Toast/Toast";
import SynoraEventService from "../../services/SynoraEventService";

type eventStore = {
    events: ISynoraEvent[];
    isLoading: boolean,
    errors: string[],
    addEvent: (event:ISynoraEvent) => void,
    removeEvent: (id:string) => void,
    getEventById: (synoraEventId: string) => ISynoraEvent | undefined;
    fetchEvents: () => Promise<boolean>;
    createEvent: (event: ISynoraEvent) => Promise<AxiosResponse<ISynoraEvent>>;
    deleteEvent: (event: ISynoraEvent) => Promise<ISynoraEvent>;
    addConfigToEvent: (event: ISynoraEvent, transport: ITransport, template: ITemplate) => Promise<ISynoraEvent>;
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


    getEventById: (synoraEventId: string) => {
        const data: ISynoraEvent[] = useSynoraEventStore.getState().events.filter((item) => item.id === synoraEventId);
        return (data.length > 0) ? data[0] : undefined;
    },


    fetchEvents: async () => {
        try {
            const data = await SynoraEventService.getAllEvents();
            set({events: data.data});
            return true;
        } catch (e) {
            unsuccessful((e as Error).message) // Вывод ошибки если не получены события
        }
        return false
    },
    //TODO
    //Change ISynoraEvent to eventName (string)

    createEvent: async (event: ISynoraEvent) => {
        return SynoraEventService.createEvent(event.id);
    },

    deleteEvent: async (event: ISynoraEvent) => {
        const data = await SynoraEventService.deleteEvent(event.id);
        return data.data;
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
    },

    // fetchEvents: async (userId: string, projectId: string) => {
    //     try {
    //         const data = await $mainApi.get(`/event/project/${projectId}/user/${userId}/`).then(
    //             (response) => (response.data));
    //         set({events: data})
    //         return true;
    //     } catch (e) {
    //         unsuccessful((e as Error).message) // Вывод ошибки если не получены события
    //     }
    //     return false
    // },

    // sendEvent: async (event: ISynoraEvent) => {
    //     return $mainApi.post(`/event/project/${event.project_identifier}/user/${event.user_identifier}/`, event);
    // },

    // deleteEvent: async (event: ISynoraEvent) => {
    //     const data = await $mainApi.delete(`/event/project/${event.project_identifier}/user/${event.user_identifier}/id/${event.id}/`)
    //     return data.data;
    // },

    // getEventById: (synoraEventId: string) => {
    //     const data: ISynoraEvent[] = useSynoraEventStore.getState().events.filter((item) => item.id === synoraEventId);
    //     console.log(data.length)
    //     console.log(data[0]);
    //     return (data.length > 0) ? data[0] : undefined;
    // },




}));