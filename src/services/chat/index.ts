import Base from "../base";
import Allowance, { IAllowanceDAO } from "../../db/allowance"
import { IAllowance } from "../../db/interface"
import { IService } from "../base";

export interface IChat extends IService {
    getAll(): Promise<Array<IAllowance>>,
    insertOne(allowance : IAllowance): Promise<IAllowance>
}

export default class extends Base implements IChat {
    getAll(): Promise<Array<IAllowance>> {
        let allowanceDAO: IAllowanceDAO = new Allowance(this.db);
        return allowanceDAO.getAll({});
    }

    async insertOne(allowance : IAllowance): Promise<IAllowance> {
        let allowanceDAO: IAllowanceDAO = new Allowance(this.db);
        return await allowanceDAO.create(allowance);
    }
}