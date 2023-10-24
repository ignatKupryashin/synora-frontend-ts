import {ITransport} from "./ITransport";
import {Protocol} from "../Protocol";

export interface IEmailTransportConfig {
    USERNAME: string, // ??
    EMAIL_FROM: string, //Исходящий email
    EMAIL_PORT: number, // Порт сервера
    EMAIL_SERVER: string, //сервер
    EMAIL_FROM_NAME: string; // отображаемое имя
    PASSWORD: string; // пароль
}


class EmailTransport implements ITransport{
    id: string;
    project_identifier: string;
    protocol_name: Protocol;
    transport_configs: IEmailTransportConfig;
    transport_name: string;
    user_identifier: string;


    constructor(project_identifier: string,
                transport_name: string,
                user_identifier: string,
                userName: string,
                emailFrom: string,
                emailPort: number,
                emailServer: string,
                emailFromName:string,
                password: string
                ) {
        this.id = '';
        this.project_identifier = project_identifier;
        this.protocol_name = 'email';
        this.transport_name = transport_name;
        this.user_identifier = user_identifier;
        this.transport_configs = {
            USERNAME: userName,
            EMAIL_FROM: emailFrom,
            EMAIL_PORT: emailPort,
            EMAIL_SERVER: emailServer,
            EMAIL_FROM_NAME: emailFromName,
            PASSWORD: password
        };
    }
}

export default EmailTransport;


