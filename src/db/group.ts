import Base, { ICommunicationDB } from "./base";
import { IGroup } from "./interface";

export interface IGroupDAO extends ICommunicationDB<IGroup> {

}

export default class extends Base<IGroup> implements IGroupDAO {
    constructor(DB) {
        super(DB);
    }

    protected getName()
    {
        return "groups";
    }
}