import {ISynoraEvent} from "./ISynoraEvent";

class SynoraEvent implements ISynoraEvent{
    event_code: string;
    id: string;
    project_identifier: string;
    transport_default: any;
    user_identifier: string;


    constructor(event_code: string, user_identifier: string, project_identifier: string) {
        this.event_code = event_code;
        this.id = '';
        this.project_identifier = project_identifier;
        this.transport_default = {};
        this.user_identifier = user_identifier;
    }
}

export default SynoraEvent;