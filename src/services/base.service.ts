import { Db } from "mongodb"
import { IUser } from "../db/interface";

export interface IService {}

export default class Base implements IService {
    protected db: Db;
    private user;
    private session;
    constructor(DB: Db, session: any) {
        this.db = DB;
        this.session = session;
        this.user = this.session.user;
    }

    protected buildService<T extends IService>(service: { new(...args): T }): T {
        return new service(this.db, this.session);
    }

    protected get getUser() : IUser {
        return this.user;
    }

    protected buildDataAccess<T>(Model: { new(db: Db): T }): T {
        return new Model(this.db);
    }
}