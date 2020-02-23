import Base, { ICommunicationDB } from "./base";
import { IMessage } from "./interface";

export interface IMessageDAO extends ICommunicationDB<IMessage> {

}

export default class extends Base<IMessage> implements IMessageDAO {
    constructor(DB) {
        super(DB);
    }

    protected getName()
    {
        return "messages";
    }
}