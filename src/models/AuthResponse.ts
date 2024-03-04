import {IUser} from "./User/IUser";

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    user: IUser;
}

