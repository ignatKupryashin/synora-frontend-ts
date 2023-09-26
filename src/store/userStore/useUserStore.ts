import {AxiosResponse} from "axios";
import {create} from "zustand";
import {IUser} from "../../models/User/IUser";
import {$registryApi} from "../../http";
import {unsuccessful} from "../../components/UI/Toast/Toast";
import AuthService from "../../services/AuthService";

interface IUserStore {
    user: IUser | undefined;
    isLogin: boolean;
    setUser: (newUser: IUser | undefined) => void;
    setIsLogin: () => void;
    getUser: (login: string) => Promise<AxiosResponse<IUser>>;
    userId: () => string;
    login: (login: string, password: string) => Promise<void>;
    logout: () => void;
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

            login: async (login: string, password: string) => {
                try {
                    const response = await AuthService.login(login, password);
                    localStorage.setItem('token', response.data.access_token);
                    useUserStore.getState().setUser(response.data.user[0]);
                    console.log(useUserStore.getState().user);
                }
                catch (e) {
                    unsuccessful((e as Error).message)
                }
                
            },

            logout: () => {
                localStorage.removeItem('token');
                useUserStore.getState().setUser(undefined);
            },


            getUser: async (login: string) => {
                return await $registryApi.get(`/users/?data=login__exact=${login}`)
            }
        }

    )
)