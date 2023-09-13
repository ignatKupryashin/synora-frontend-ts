import axios, {AxiosResponse} from "axios";
import {create} from "zustand";
import {REGISTRY_URL} from "../../BASE_URL";
import {IUser} from "../../models/User/IUser";

interface IUserStore {
    user: IUser | undefined;
    isLogin: boolean;
    setUser: (newUser: IUser | undefined) => void;
    setIsLogin: () => void;
    getUser: (userId: string) => Promise<AxiosResponse<IUser>>;
    userId: () => string;
}

export const useUserStore = create<IUserStore>((set) => ({

            user: undefined,
            isLogin: false,

            userId: (): string => {
                    const user: IUser | undefined = useUserStore.getState().user;
                    return user ? user.id : '';
                },

            setUser: (newUser: IUser | undefined) => {
                set((state) => ({user: newUser}));
                useUserStore.getState().setIsLogin();
            },

            setIsLogin: () => {
                const isLogin = useUserStore.getState().user !== undefined;
                set((state) => ({isLogin: isLogin}));
            },

            getUser: async (email: string) => {
                const url = REGISTRY_URL + '/users/?data=email__exact=' + email;
                return await axios.get(url);
            }
        }

    )
)