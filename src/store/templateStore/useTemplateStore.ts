import {create} from "zustand";
import {ITemplate} from "../../models/Template/ITemplate";
import {unsuccessful} from "../../components/UI/Toast/Toast";
import TemplateService from "../../services/TemplateService";

type templateStore = {
    templates: ITemplate[];
    isLoading: boolean,
    errors: string[],
    addTemplate: (template:ITemplate) => void,
    removeTemplate: (id:string) => void,
    getTemplateById: (templateId: string) => ITemplate | undefined;
    fetchTemplates: () => Promise<void>;
    createTemplate: (template: ITemplate) => Promise<ITemplate>;
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

    getTemplateById: (templateId: string) => {
        const data: ITemplate[] = useTemplateStore.getState().templates.filter((item) => item.id === templateId);
        return data.length > 0 ? data[0] : undefined;
    },

    fetchTemplates: async () => {
        try {
            const data = await TemplateService.getAllTemplates()
                    .then(
                (response) => (response.data));
            set({templates: data})
        } catch (e) {
            unsuccessful((e as Error).message) // Вывод ошибки если не получены транспорты
        }
    },

    createTemplate: async (template: ITemplate) => {
            const data = await TemplateService.createTemplate(template);
            return data.data;
    },

    deleteTemplate: async (template: ITemplate) => {
            const data = await TemplateService.deleteTemplate(template.id);
            return data.data;
    },


    // fetchTemplates: async (userId: string, projectId: string) => {
    //     try {
    //         const data = await $mainApi.get(`/template/project/${projectId}/user/${userId}/`)
    //             .then(
    //                 (response) => (response.data));
    //         set({templates: data})
    //     } catch (e) {
    //         unsuccessful((e as Error).message) // Вывод ошибки если не получены транспорты
    //     }
    // },



    // createTemplate: async (template: ITemplate) => {
    //     try {
    //         const data = await $mainApi.post(`/template/project/${template.project_identifier}/user/${template.user_identifier}/`, template);
    //         return data.data;
    //     }
    //     catch (e) {
    //         unsuccessful((e as Error).message)
    //     }
    // },

    // deleteTemplate: async (template: ITemplate) => {
    //     try {
    //         const data = await $mainApi.delete(`/template/project/${template.project_identifier}/user/${template.user_identifier}/id/${template.id}/`)
    //         return data.data;
    //     }
    //     catch (e) {
    //         unsuccessful((e as Error).message)
    //     }
    // },

}));