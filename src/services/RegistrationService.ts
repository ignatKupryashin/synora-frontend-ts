import {$mainApi} from "../http";

export default class RegistrationService {

    static async registration(login: string,
                              email: string,
                              password: string,
                              name?: string,
                              surname?: string) {

        const data = {
            login: login,
            email: email,
            password: password,
            name: name,
            surname: surname
        }

        return await $mainApi.post(
            '/user/',
            data
        );
    }

}