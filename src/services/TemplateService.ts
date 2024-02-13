import {$mainApi} from "../http";
import {ITemplate} from "../models/Template/ITemplate";
import {AxiosResponse} from "axios";

export default class TemplateService {
    static async getAllTemplates():Promise<AxiosResponse<ITemplate[]>> {
        return await $mainApi.get(`/templates/`);
    }

    static async createTemplate(template: ITemplate):Promise<AxiosResponse<ITemplate>>{
        return await $mainApi.post(`/templates/`, template);
    }

    static async deleteTemplate(templateId: string):Promise<AxiosResponse<ITemplate>>{
        return await $mainApi.delete(`/templates/${templateId}`);
    }

    static async patchTemplate(template: ITemplate):Promise<AxiosResponse<ITemplate>>{
        return await $mainApi.patch(`templates/${template.id}`, template);
    }
}