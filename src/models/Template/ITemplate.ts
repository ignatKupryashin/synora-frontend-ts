import {Protocol} from "../Protocol";
import MessageBody from "../MessageBody";

export interface ITemplate {
    "id": string; // id_template
    "template_name": string;
    "body": MessageBody; //
    "protocol_name": Protocol,
    "project_identifier": string, // project_id
    "user_identifier": string, // user_id
    "transport_default": string | undefined //пока оставлю пустым
    "letter_topic": string | undefined // тема письма
    "parameters": any[] | undefined;
}

