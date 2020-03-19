import Base, { IService } from "./base.service";
import User, { IUserDAO } from "../db/user"
import { IUser } from "../db/interface"
import { validate } from "../utility/validate";
import { scrypto } from "../utility/crypto";
import { log } from "../constant";
import { v1, v4 } from "uuid";
import { ObjectId } from "mongodb";

const { ERROR, USER_ERROR: USER } = log;

export interface IUserService extends IService {
    getAll(): Promise<Array<IUser>>,
    create(user: IUser): Promise<string>,
    updateById(id: ObjectId, user: object),
    deleteOne(id: ObjectId),
    find(query: object, project?: object): Promise<IUser[]>,
    findById(_id: ObjectId, project?: object): Promise<IUser>,
    findByEmail(email: string, project?: object): Promise<IUser>
}

export interface IValidateUser extends IService {
    validate_email(email: string): void,
    validate_password(password: string): void,
    check_exist_email(email: string): void
}

export default class extends Base implements IUserService, IValidateUser {
    getAll(): Promise<Array<IUser>> {
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        return userDAO.find({});
    }

    async create(user: IUser): Promise<string> {
        user.salt = v4();
        user.password = scrypto.sha512(user.password, user.salt);
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        let userCheck = await userDAO.findOne({ email: user.email });
        if (userCheck) {
            throw USER.USER_EXIST;
        }
        await userDAO.create(user);
        return "success";
    }

    async updateById(id: ObjectId, user: object) {
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        await userDAO.updateOne({ _id: id }, user);
    }

    async deleteOne(id: ObjectId) {
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        return userDAO.deleteById(id);
    }

    validate_email(email) {
        if (!validate.email(email))
            throw ERROR.EMAIL_FAIL;
    }

    async check_exist_email(email) {
        let user = await this.findByEmail(email, { _id: 1 });
        if (user) {
            throw ERROR.MAIL_EXISTED;
        }
    }

    validate_password(password) {
        if (!validate.valid_string(password, 4, 64))
            throw ERROR.PASSWORD_FAIL;
    }

    find(query: object, project?: object): Promise<IUser[]> {
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        return userDAO.find(query, project);
    }

    findById(_id: ObjectId, project?: object): Promise<IUser> {
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        let query: object = { _id };
        return userDAO.findOne(query, project);
    }
    findByEmail(email: string, project?: object): Promise<IUser> {
        let userDAO = this.buildDataAccess<IUserDAO>(User);
        let query: object = { email };
        return userDAO.findOne(query, project);
    }
}