import {ISynoraEvent} from "./ISynoraEvent";

class SynoraEvent implements ISynoraEvent {
    event_code: string;
    id: string;
    project_identifier: string;
    transport_default: any;
    user_identifier: string;
    transports: string[];
    templates: string[];
    created_date: string | undefined;
    updated_date: string | undefined


    constructor(event_code: string,
                user_identifier: string,
                project_identifier: string,
                transports?: string[],
                templates?: string[],
                created_date?: string,
                updated_date?: string
    ) {
        this.event_code = event_code;
        this.id = '';
        this.project_identifier = project_identifier;
        this.transport_default = {};
        this.user_identifier = user_identifier;
        this.templates = templates || [];
        this.transports = transports || [];
        this.created_date = created_date;
        this.updated_date = updated_date;
    }
}

export default SynoraEvent;