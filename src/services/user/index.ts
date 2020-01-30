import Base from "../base";
import User, { IUserDAO } from "../../db/user"
import { IUser } from "../../db/interface"
import { IService } from "../base";

export interface IChat extends IService {
    getAll(): Promise<Array<IUser>>,
    insertOne(user: IUser): Promise<IUser>,
    updateById(id: string, user: any),
    deleteOne(id: string),
}

export default class extends Base implements IChat {
    getAll(): Promise<Array<IUser>> {
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        return userDAO.getAll({});
    }

    async insertOne(user: IUser): Promise<IUser> {
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        return await userDAO.create(user);
    }

    async updateById(id: string, user: any) {
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        await userDAO.updateOne({ _id: id }, user);
    }

    async deleteOne(id: string) {
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        //await userDAO.
    }
}