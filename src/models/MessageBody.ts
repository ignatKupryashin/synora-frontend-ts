
interface IMessageBody {
    body: string;
}

class MessageBody implements IMessageBody{
    body: string

    constructor(body: string) {
        this.body = body;
    }
}

export default MessageBody;