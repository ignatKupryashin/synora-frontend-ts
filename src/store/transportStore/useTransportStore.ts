import {create} from "zustand";
import {ITransport} from "../../models/Transport/ITransport";
import {unsuccessful} from "../../components/UI/Toast/Toast";
import TransportService from "../../services/TransportService";

type transportStore = {
    transports: ITransport[],
    isLoading: boolean,
    errors: string[],
    addTransport: (transport: ITransport) => void,
    removeTransport: (id: string) => void,
    getTransportById: (transportId: string) => ITransport | undefined;
    fetchTransports: () => Promise<void>;
    createTransport: (transport: ITransport) => Promise<ITransport>;
    deleteTransport: (transport: ITransport) => Promise<boolean>;
}

export const useTransportStore = create<transportStore>((set) => ({
        transports: [],
        isLoading: false,
        errors: [],


        addTransport: (transport) => {
            set((state) => ({
                transports: [...state.transports, transport]
            }))
        },

        removeTransport: (id) => {
            set((state) => ({
                transports: state.transports.filter((transport) => transport.id !== id),
            }))
        },

        getTransportById: (transportId: string) => {
            const data: ITransport[] = useTransportStore.getState().transports.filter((item) => item.id === transportId);
            return data.length > 0 ? data[0] : undefined;
        },

        fetchTransports: async () => {
            try {
                const data = await TransportService.getAllTransports()
                    .then(
                        (response) => (response.data));
                set({transports: data})
            } catch (e) {
                unsuccessful((e as Error).message) // Вывод ошибки если не получены транспорты
            }
        },


        createTransport: async (transport: ITransport) => {
            const data = await TransportService.createTransport(transport);
            return data.data;
        },

        deleteTransport: async (transport: ITransport) => {
            try {
                const data = await TransportService.deleteTransport(transport.id);
                useTransportStore.getState().removeTransport(data.data.id)
                return true;
            } catch (e) {
                return false;
            }
        },

        // fetchTransports: async (userId: string, projectId: string) => {
        //     try {
        //         const data = await $mainApi.get(`/transport/project/${projectId}/user/${userId}/`)
        //             .then(
        //                 (response) => (response.data));
        //         set({transports: data})
        //     } catch (e) {
        //         unsuccessful((e as Error).message) // Вывод ошибки если не получены транспорты
        //     }
        // },
        // createTransport: async (transport: ITransport) => {
        //     try {
        //         const data =
        //             await $mainApi.post(`/transport/project/${transport.project_identifier}/user/${transport.user_identifier}/`, transport)
        //         return data.data;
        //     }
        //     catch (e) {
        //         unsuccessful((e as Error).message)
        //     }
        // },
        // deleteTransport: async (transport: ITransport) => {
        //     try {
        //         const data = await $mainApi.delete(`/transport/project/${transport.project_identifier}/user/${transport.user_identifier}/id/${transport.id}/`)
        //         return data.data;
        //     }
        //     catch (e) {
        //         unsuccessful((e as Error).message)
        //     }
        // },
    }),
)
