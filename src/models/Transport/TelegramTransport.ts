import {ITransport} from "./ITransport";
import {Protocol} from "../Protocol";

export interface ITelegramTransportConfig {
    TOKEN: string;
}


class TelegramTransport implements ITransport{
    id: string;
    project_identifier: string;
    protocol_name: Protocol;
    transport_configs: ITelegramTransportConfig;
    transport_name: string;
    user_identifier: string;

    constructor(project_identifier: string, transport_name: string, user_identifier: string, telegramToken: string) {
        this.id = '';
        this.project_identifier = project_identifier;
        this.protocol_name = 'telegram';
        this.transport_name = transport_name;
        this.user_identifier = user_identifier;
        this.transport_configs = {
            TOKEN: telegramToken
        };
    }
}

export default TelegramTransport;


