import {create} from "zustand";

interface IUserStore {
    userId: string;
    projectId: string;
    setUserId: (newUserId: string) => void;
    setProjectId: (newProjectId: string) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
        userId: '',
        projectId: '',

        setUserId: (newUserId: string) =>
            set((state) => ({userId: newUserId})),

        setProjectId: (newProjectId: string) =>
            set((state) => ({projectId: newProjectId}))
    }

))