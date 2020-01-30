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
        var allowanceDAO = this.buildDataAccess<IAllowanceDAO>(Allowance);
        return allowanceDAO.getAll({});
    }

    async insertOne(allowance : IAllowance): Promise<IAllowance> {
        var allowanceDAO = this.buildDataAccess<IAllowanceDAO>(Allowance);
        return await allowanceDAO.create(allowance);
    }
}