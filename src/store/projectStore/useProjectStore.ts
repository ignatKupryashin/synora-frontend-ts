import {create} from "zustand";
import {IProject} from "../../models/Project/IProject";
import {REGISTRY_URL} from "../../BASE_URL";
import axios, {AxiosResponse} from "axios";

interface IProjectStore {
    currentProject: IProject | undefined;
    projects: IProject[];
    setCurrentProject: (newProject: IProject) => void;
    fetchLinks: (userId: string) => Promise<string[]>;
    fetchProjects: (projectIds: string[]) => Promise<IProject[]>;
    setProjects: (projects: IProject[]) => void;
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
        console.log(inputProjects);
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

    fetchLinks: async (userId: string) => {
        const url = `${REGISTRY_URL}/links/?object1=${userId}`;
        const response = await axios.get(url);

        if (response.status >= 200 && response.status < 300) {
            // console.log(response)
            return (response as AxiosResponse<Link[]>).data.map(element => element.object2);
        } else {
            throw new Error('Invalid response status');
        }
    },

    fetchProjects: async  (projectIds) => {
        const url = `${REGISTRY_URL}/projects/?id=${projectIds.toString()}`;
        const response = await axios.get(url);
        if (response.status >= 200 && response.status < 300) {
            console.log(response.data);
            return (response as AxiosResponse<IProject[]>).data;
        }
        else {
            throw new Error('Invalid response status (projects))');
        }
    }


}))

