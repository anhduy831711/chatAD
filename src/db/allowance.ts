import Base, { ICommunicationDB } from "./base";
import { IAllowance } from "./interface";

export interface IAllowanceDAO extends ICommunicationDB<IAllowance> {

}

export default class extends Base<IAllowance> implements IAllowanceDAO {
    constructor(DB) {
        super(DB);
    }

    protected getName()
    {
        return "allowances";
    }
}