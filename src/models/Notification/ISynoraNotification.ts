export interface Recipient {
    telegram_chat_id?: number;
    email?: string;
}

export interface ISynoraNotification {
    "event_code": string;
    "user_identifier": string,
    "project_identifier": string,
    "message_recipients": Recipient[],
    "parameters": any;
}