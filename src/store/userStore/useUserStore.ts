import {create} from "zustand";
import {IUser} from "@/models/User/IUser.ts";
import {unsuccessful} from "../../components/UI/Toast/Toast";
import AuthService from "../../services/AuthService";
import axios from "axios";
import {AuthResponse} from "@/models/AuthResponse.ts";
import {MAIN_API_URL} from "@/http";

interface IUserStore {
    user: IUser | undefined;
    isLogin: boolean;
    setUser: (newUser: IUser | undefined) => void;
    setIsLogin: () => void;
    userId: () => string;
    login: (login: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({

            user: undefined,
            isLogin: false,

            userId: (): string => {
                    const user: IUser | undefined = useUserStore.getState().user;
                    return user ? user.id : '';
                },

            setUser: (newUser: IUser | undefined) => {
                set(() => ({user: newUser}));
                useUserStore.getState().setIsLogin();
            },

            setIsLogin: () => {
                const isLogin = useUserStore.getState().user !== undefined;
                set(() => ({isLogin: isLogin}));
            },

            login: async (login: string, password: string) => {
                try {
                    const response = await AuthService.login(login, password);
                    console.log(response);
                    localStorage.setItem('token', response.data.access_token);
                    useUserStore.getState().setUser(response.data.user);
                    console.log(useUserStore.getState().isLogin);
                }
                catch (e) {
                    unsuccessful((e as Error).message)
                }
                
            },

            logout: () => {
                localStorage.removeItem('token');
                useUserStore.getState().setUser(undefined);
            },

            checkAuth: async () => {
                try {
                    await axios.get<AuthResponse>(`${MAIN_API_URL}/`)
                }
                catch (e) {

                }
            }

        }

    )
)