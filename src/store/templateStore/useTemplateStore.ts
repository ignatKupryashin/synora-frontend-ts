import {create} from "zustand";
import {ITemplate} from "../../models/Template/ITemplate";
import {$mainApi} from "../../http";
import {unsuccessful} from "../../components/UI/Toast/Toast";

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
        try {
            const data = await $mainApi.get(`/template/project/${projectId}/user/${userId}/`)
                    .then(
                (response) => (response.data));
            set({templates: data})
        } catch (e) {
            unsuccessful((e as Error).message) // Вывод ошибки если не получены транспорты
        }
    },

    sendTemplate: async (template: ITemplate) => {
        try {
            const data = await $mainApi.post(`/template/project/${template.project_identifier}/user/${template.user_identifier}/`, template);
            return data.data;
        }
        catch (e) {
            unsuccessful((e as Error).message)
        }
    },

    deleteTemplate: async (template: ITemplate) => {
        try {
            const data = await $mainApi.delete(`/template/project/${template.project_identifier}/user/${template.user_identifier}/id/${template.id}/`)
            return data.data;
        }
        catch (e) {
            unsuccessful((e as Error).message)
        }
    },
}));