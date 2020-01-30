import Base, { ICommunicationDB } from "./base";
import { IUser } from "./interface";

export interface IUserDAO extends ICommunicationDB<IUser> {

}

export default class extends Base<IUser> implements IUserDAO {
    constructor(DB) {
        super(DB);
    }

    protected getName()
    {
        return "users";
    }
}