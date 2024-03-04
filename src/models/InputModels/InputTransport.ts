import {Protocol} from "../Protocol";
import {IEmailTransportConfig} from "../Transport/IEmailTransport";
import {ITransport} from "../Transport/ITransport";

export interface InputTransport {
    "transport_name": string,
    "id": string,
    "protocol_name": Protocol,
    "project_identifier": string,
    "user_identifier": string,
    "transport_configs": any,
}


interface InputEmailTransport extends InputTransport {
    id: string;
    project_identifier: string;
    protocol_name: Protocol;
    transport_configs: IEmailTransportConfig;
    transport_name: string;
    user_identifier: string;
}


interface InputEmailTransportConfig {
    USERNAME: string, // ??
    EMAIL_FROM: string, //Исходящий email
    EMAIL_PORT: number, // Порт сервера
    EMAIL_SERVER: string, //сервер
    EMAIL_FROM_NAME: string; // отображаемое имя
    PASSWORD: string; // пароль
}

interface InputTelegramTransportConfig {
    TOKEN: string;
}

interface InputTelegramTransport extends ITransport {
    id: string;
    project_identifier: string;
    protocol_name: Protocol;
    transport_configs: InputTelegramTransportConfig;
    transport_name: string;
    user_identifier: string;
}