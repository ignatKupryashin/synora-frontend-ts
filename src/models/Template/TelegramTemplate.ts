import {ITemplate} from "./ITemplate";
import {Protocol} from "../Protocol";
import MessageBody from "../MessageBody";

export class TelegramTemplate implements ITemplate{
    body: MessageBody;
    id: string;
    letter_topic: undefined;
    parameters: any[];
    project_identifier: string;
    protocol_name: Protocol;
    template_name: string;
    transport_default: string | undefined;
    user_identifier: string;


    constructor(bodyData: string,
                template_name: string,
                project_identifier: string,
                user_identifier: string) {
        this.body = new MessageBody(bodyData);
        this.id = '';
        this.parameters = [];
        this.project_identifier = project_identifier;
        this.protocol_name = 'telegram';
        this.template_name = template_name;
        this.user_identifier = user_identifier;
    }
}