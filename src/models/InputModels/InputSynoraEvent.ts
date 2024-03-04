export interface InputSynoraEvent {
    id: string,
    event_code: string,
    transport_default: any;
    project_identifier: string;
    user_identifier: string;
    transports?: string[],
    templates?: string[]
}