import {Protocol} from "../Protocol";

export interface InputTemplate {
    "id": string; // id_template
    "template_name": string;
    "body": InputMessageBody; //
    "protocol_name": Protocol,
    "project_identifier": string, // project_id
    "user_identifier": string, // user_id
    "transport_default": string | undefined //пока оставлю пустым
    "parameters": any[] | undefined
    "letter_topic"?: string // тема письма
}

export interface InputEmailTemplate extends InputTemplate{
    id: string;
    letter_topic: string;
    template_name: string;
    body: InputMessageBody;
    protocol_name: Protocol;
    user_identifier: string;
    project_identifier: string;
    parameters: any[]| undefined;
    transport_default: string | undefined;
}

export interface InputTelegramTemplate extends InputTemplate {
    body: InputMessageBody;
    id: string;
    parameters: any[];
    project_identifier: string;
    protocol_name: Protocol;
    template_name: string;
    transport_default: string | undefined;
    user_identifier: string;
    letter_topic?: undefined;
}

interface InputMessageBody {
    body: string;
}
