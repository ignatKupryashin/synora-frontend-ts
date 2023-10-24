import {create} from "zustand";
import {IProject} from "../../models/Project/IProject";
import {AxiosResponse} from "axios";
import {$mainApi} from "../../http";
import {successful, unsuccessful} from "../../components/UI/Toast/Toast";

interface IProjectStore {
    currentProject: IProject | undefined;
    projects: IProject[];
    setCurrentProject: (newProject: IProject) => void;
    // fetchLinks: (userId: string) => Promise<string[]>;
    fetchProjects: (userId: string) => Promise<IProject[]>;
    setProjects: (projects: IProject[]) => void;
    createProject:(userId: string) => Promise<boolean>;

}

//тип с сервера
type Link =  {
    "id": string,
    "link_type": string,
    "object1": string,
    "object2": string,
    "weight": number,
    "direction": 0 | 1 | 2 | 3,
    "created_date": Date,
    "modified_date": Date,
    "meta": any, // узнать после
    "data": any, // узнать после
    "project_id": string,
    "account_id": string,
    "user_id": string
}

export const useProjectStore = create<IProjectStore>((set) => ({
    currentProject: undefined,
    projects: [],

    setCurrentProject: (newProject: IProject) =>
        set((state) => ({currentProject: newProject})),

    setProjects: function (inputProjects) {
        set({projects: []});
        inputProjects.forEach((element) => {
                set(state => (
                    {
                        projects: [...state.projects, element]
                    }
                ))
            }
        )
    },

    // fetchLinks: async (userId: string) => {
    //     const response = await $registryApi.get(`/links/?object1=${userId}`)
    //
    //     if (response.status >= 200 && response.status < 300) {
    //         return (response as AxiosResponse<Link[]>).data.map(element => element.object2);
    //     } else {
    //         throw new Error('Invalid response status');
    //     }
    // },

    fetchProjects: async  (userId) => {
            const response = await $mainApi.get(`/projects/`);
            if (response.status >= 200 && response.status < 300) {
                console.log(response)
                return (response as AxiosResponse<IProject[]>).data;
            } else {
                throw new Error('Invalid response status (projects))');
            }
        },

    createProject: async (userId: string) => {
        const data = {
            "name": userId,
            "object_code": userId
        };
        const response: AxiosResponse<IProject> = await $mainApi.post('/project/', data);
        if (response.status >= 200 && response.status < 300) {
            successful("Проект успешно создан");
            return true
        }
        else {
            unsuccessful(response.statusText)
            return false
        }

    }
}))

