import {create} from "zustand";
import {ITransport} from "../../models/Transport/ITransport";
import {BASE_URL} from "../../BASE_URL";
import axios from "axios";

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
            const url = `https://${BASE_URL}/transport/project/${projectId}/user/${userId}/`;
            console.log(url)
            try {
                const data = await axios.get(url).then(
                    (response) => (response.data));
                set({transports: data})
            } catch (e) {
                console.log((e as Error).message) // Вывод ошибки если не получены транспорты
            }
        },


        /**
         * Функция для отправки транспорта на сервер
         * @param transport - Входящий транспорт
         */
        sendTransport: async (transport: ITransport) => {
            const url = `https://${BASE_URL}/transport/project/${transport.project_identifier}/user/${transport.user_identifier}/`;
            try {
                const data = await axios.post(url, transport)
                return data.data;
            }
            catch (e) {
                console.log((e as Error).message)
            }
        },

        deleteTransport: async (transport: ITransport) => {
            const url = `https://${BASE_URL}/transport/project/${transport.project_identifier}/user/${transport.user_identifier}/id/${transport.id}/`;
            try {
                const data = await axios.delete(url)
                return data.data;
            }
            catch (e) {
                console.log((e as Error).message)
            }
        },


    }),



)
