import {create} from "zustand";
import {ITransport} from "../../models/Transport/ITransport";
import {$mainApi} from "../../http";
import {unsuccessful} from "../../components/UI/Toast/Toast";

type transportStore = {
    transports: ITransport[],
    isLoading: boolean,
    errors: string[],
    addTransport: (transport:ITransport) => void,
    removeTransport: (id:string) => void,
    fetchTransports: (userId: string, projectId: string) => Promise<void>;
    sendTransport: (transport: ITransport) => Promise<ITransport>;
    deleteTransport: (transport: ITransport) => Promise<ITransport>;
}

export const useTransportStore = create<transportStore>((set) => ({
        transports: [],
        isLoading: false,
        errors: [],


        /**
         * Add transport to store
         * @param transport
         */
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

        fetchTransports: async (userId: string, projectId: string) => {
            try {
                const data = await $mainApi.get(`/transport/project/${projectId}/user/${userId}/`)
                    .then(
                    (response) => (response.data));
                set({transports: data})
            } catch (e) {
                unsuccessful((e as Error).message) // Вывод ошибки если не получены транспорты
            }
        },


        /**
         * Функция для отправки транспорта на сервер
         * @param transport - Входящий транспорт
         */
        sendTransport: async (transport: ITransport) => {
            try {
                const data =
                    await $mainApi.post(`/transport/project/${transport.project_identifier}/user/${transport.user_identifier}/`, transport)
                return data.data;
            }
            catch (e) {
                unsuccessful((e as Error).message)
            }
        },

        deleteTransport: async (transport: ITransport) => {
            try {
                const data = await $mainApi.delete(`/transport/project/${transport.project_identifier}/user/${transport.user_identifier}/id/${transport.id}/`)
                return data.data;
            }
            catch (e) {
                unsuccessful((e as Error).message)
            }
        },


    }),



)
