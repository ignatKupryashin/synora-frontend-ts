import {create} from "zustand";
import {ITemplate} from "../../models/Template/ITemplate";
import {BASE_URL} from "../../BASE_URL";
import axios from "axios";

type templateStore = {
    templates: ITemplate[];
    isLoading: boolean,
    errors: string[],
    addTemplate: (template:ITemplate) => void,
    removeTemplate: (id:string) => void,
    fetchTemplates: (userId: string, projectId: string) => Promise<void>;
    sendTemplate: (template: ITemplate) => Promise<ITemplate>;
    deleteTemplate: (template: ITemplate) => Promise<ITemplate>;
}
export const useTemplateStore = create<templateStore>((set) => ({
    templates: [],
    isLoading: false,
    errors: [],


    /**
     * add Template to store
     * @param template
     */
    addTemplate: (template: ITemplate) => {
        set((state) => ({
            templates: [...state.templates, template]
        }))
    },

    removeTemplate: (id: string) => {
        set((state) => ({
            templates: state.templates.filter((template: ITemplate) => template.id !== id),
        }))
    },

    fetchTemplates: async (userId: string, projectId: string) => {
        const url = `https://${BASE_URL}/template/project/${projectId}/user/${userId}/`;
        try {
            const data = await axios.get(url).then(
                (response) => (response.data));
            set({templates: data})
        } catch (e) {
            console.log((e as Error).message) // Вывод ошибки если не получены транспорты
        }
    },

    sendTemplate: async (template: ITemplate) => {
        const url = `https://${BASE_URL}/template/project/${template.project_identifier}/user/${template.user_identifier}/`;
        try {
            const data = await axios.post(url, template)
            return data.data;
        }
        catch (e) {
            console.log((e as Error).message)
        }
    },

    deleteTemplate: async (template: ITemplate) => {
        const url = `https://${BASE_URL}/template/project/${template.project_identifier}/user/${template.user_identifier}/id/${template.id}/`;
        try {
            const data = await axios.delete(url)
            return data.data;
        }
        catch (e) {
            console.log((e as Error).message)
        }
    },
}));