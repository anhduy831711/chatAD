import { Db } from "mongodb"

export interface IService {
    getUser(): any
}

export default class Base implements IService {
    protected db: Db;
    private user;
    protected currentUser;
    constructor(DB: Db, user: any) {
        this.db = DB;
        this.user = user;
    }

    protected buildService<T extends IService>(service: { new(...args): T }): T {
        return new service(this.db, this.user);
    }

    public getUser() {
        return this.user;
    }

    protected buildDataAccess<T>(Model: { new(db: Db): T }): T {
        return new Model(this.db);
    }
}