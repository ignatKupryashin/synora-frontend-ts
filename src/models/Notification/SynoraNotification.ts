import {ISynoraNotification, Recipient} from "./ISynoraNotification";

export class SynoraNotification implements ISynoraNotification{
    event_code: string;
    message_recipients: Recipient[];
    parameters: any;
    project_identifier: string;
    user_identifier: string;


    constructor(event_code: string, project_identifier: string, user_identifier: string) {
        this.event_code = event_code;
        this.project_identifier = project_identifier;
        this.user_identifier = user_identifier;
        this.parameters = {};
        this.message_recipients = [];
    }
}