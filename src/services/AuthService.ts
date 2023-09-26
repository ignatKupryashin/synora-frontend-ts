import {$mainApi} from "../http";
import {AxiosResponse} from "axios";
import {AuthResponse} from "../models/AuthResponse";
import qs from "qs";

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {

        const data = {
            username: username,
            password: password
        }

        const sendData = qs.stringify(data);
        return  await $mainApi.post(
            '/login/token',
            sendData,
        );

    }
    //
    // static async logout(): Promise<void> {
    //     return  await $mainApi.post('/login/token', {
    // }
}