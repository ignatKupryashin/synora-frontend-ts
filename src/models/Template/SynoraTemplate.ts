import {Protocol} from "../Protocol";
import MessageBody from "../MessageBody";
import {InputTelegramTemplate} from "../InputModels/InputTemplate";

export interface SynoraTemplate {
    id: string,
    templateName: string,
    body: IMessageBody,
    protocolName: Protocol,
    projectId: string,
    userId: string,
    transportDefault: string | undefined,
    parameters: any | undefined;
}


export interface IMessageBody {
    body: string;
}

export class SynoraEmailTemplate implements SynoraTemplate{
    body: IMessageBody;
    id: string;
    parameters: any;
    projectId: string;
    protocolName: Protocol;
    templateName: string;
    transportDefault: string | undefined;
    userId: string;

    constructor(
        body: IMessageBody,
        id: string,
        parameters: any,
        projectId: string,
        templateName: string,
        userId: string,
        transportDefault?: string
    ) {
        this.body = body;
        this.id = id;
        this.parameters = parameters;
        this.projectId = projectId;
        this.protocolName = "email";
        this.templateName = templateName;
        this.transportDefault = transportDefault
        this.userId = userId
    }


}


export class SynoraTelegramTemplate implements SynoraTemplate{

    body: IMessageBody;
    id: string;
    parameters: any;
    projectId: string;
    protocolName: Protocol;
    templateName: string;
    transportDefault: string | undefined;
    userId: string;

    constructor(
        body: IMessageBody,
        id: string,
        parameters: any,
        projectId: string,
        templateName: string,
        userId: string,
        transportDefault?: string
    ) {
        this.body = body;
        this.id = id;
        this.parameters = parameters;
        this.projectId = projectId;
        this.protocolName = "telegram";
        this.templateName = templateName;
        this.transportDefault = transportDefault
        this.userId = userId
    }

    public export(): InputTelegramTemplate {
        return {
            body: this.body,
            id: this.id,
            template_name: this.templateName,
            project_identifier: this.projectId,
            protocol_name: this.protocolName,
            user_identifier: this.userId,
            transport_default: this.transportDefault,
            parameters: this.parameters,
        }
    }

}