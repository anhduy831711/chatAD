import Base, { IService } from "../base";
import User, { IUserDAO } from "../../db/user"
import { IUser } from "../../db/interface"
import { validate } from "../../utility/validate";
import { scrypto } from "../../utility/crypto";
import { log } from "../../constant";
import { v1, v4 } from "uuid";
import { ObjectId } from "mongodb";

const { ERROR } = log;

export interface IUserService extends IService {
    getAll(): Promise<Array<IUser>>,
    registerUser(user: IUser): Promise<string>,
    updateById(id: ObjectId, user: any),
    deleteOne(id: ObjectId),
    getOne(query: object, project?: object): Promise<IUser>
}

export interface IValidateUser extends IService {
    validate_email(email: string): void,
    validate_password(password: string): void
}

export default class extends Base implements IUserService, IValidateUser {
    getAll(): Promise<Array<IUser>> {
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        return userDAO.getAll({});
    }

    async registerUser(user: IUser): Promise<string> {
        user.salt = v4();
        user.password = scrypto.sha512(user.password, user.salt);
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        let userCheck = await userDAO.findOne({ email: user.email });
        if (userCheck) {
            throw ERROR.USER_EXIST;
        }
        await userDAO.create(user);
        return "success";
    }

    async updateById(id: ObjectId, user: any) {
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        await userDAO.updateOne({ _id: id }, user);
    }

    async deleteOne(id: ObjectId) {
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        //await userDAO.
    }

    validate_email(email) {
        if (!validate.email(email))
            throw ERROR.EMAIL_FAIL;
    }

    validate_password(password) {
        if (!validate.valid_string(password, 4, 64))
            throw ERROR.PASSWORD_FAIL;
    }

    getOne(query: object, project?: object): Promise<IUser> {
        let userDAO = this.buildService<IUserDAO>(User);
        return userDAO.findOne(query, project);
    }
}