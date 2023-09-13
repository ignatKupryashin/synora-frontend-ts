import {ITemplate} from "./ITemplate";
import {Protocol} from "../Protocol";
import MessageBody from "../MessageBody";

class EmailTemplate implements ITemplate{
    id: string;
    letter_topic: string;
    template_name: string;
    body: MessageBody;
    protocol_name: Protocol;
    user_identifier: string;
    project_identifier: string;
    parameters: any[]| undefined;
    transport_default: string | undefined;


    constructor(
                template_name: string,
                letter_topic: string,
                bodyData: string,
                project_identifier: string,
                user_identifier: string) {
        this.body = new MessageBody(bodyData);
        this.id = ''
        this.template_name = template_name;
        this.letter_topic = letter_topic;
        this.project_identifier = project_identifier;
        this.protocol_name = 'email';
        this.user_identifier = user_identifier;
    }
}

export default EmailTemplate;