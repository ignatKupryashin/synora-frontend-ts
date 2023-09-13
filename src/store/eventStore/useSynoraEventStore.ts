import {ISynoraEvent} from "../../models/SynoraEvent/ISynoraEvent";
import {create} from "zustand";
import {BASE_URL} from "../../BASE_URL";
import axios, {AxiosResponse} from "axios";

type eventStore = {
    events: ISynoraEvent[];
    isLoading: boolean,
    errors: string[],
    addEvent: (event:ISynoraEvent) => void,
    removeEvent: (id:string) => void,
    fetchEvents: (userId: string, projectId: string) => Promise<void>;
    sendEvent: (event: ISynoraEvent) => Promise<AxiosResponse<ISynoraEvent>>;
    deleteEvent: (event: ISynoraEvent) => Promise<ISynoraEvent>;
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
        const url = `https://${BASE_URL}/event/project/${projectId}/user/${userId}/`;
        try {
            const data = await axios.get(url).then(
                (response) => (response.data));
            set({events: data})
        } catch (e) {
            console.log((e as Error).message) // Вывод ошибки если не получены события
        }
    },

    sendEvent: async (event: ISynoraEvent) => {
        const url = `https://${BASE_URL}/event/project/${event.project_identifier}/user/${event.user_identifier}/`;
        return await axios.post(url, event);
    },

    deleteEvent: async (event: ISynoraEvent) => {
        const url = `https://${BASE_URL}/event/project/${event.project_identifier}/user/${event.user_identifier}/id/${event.id}/`;
        const data = await axios.delete(url)
        return data.data;
    },
}));