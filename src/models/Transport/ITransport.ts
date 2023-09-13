import {Protocol} from "../Protocol";

export interface ITransport {
    "transport_name": string,
    "id": string,
    "protocol_name": Protocol,
    "project_identifier": string,
    "user_identifier": string,
    "transport_configs": any
}