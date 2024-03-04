export interface ISynoraEvent {
    id: string,
    event_code: string,
    transport_default: any,
    project_identifier: string,
    user_identifier: string,
    created_date: string | undefined,
    updated_date: string | undefined,
    transports?: string[],
    templates?: string[]
}