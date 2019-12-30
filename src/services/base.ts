import { Db } from "mongodb"

export interface IService{}

export default class Base implements IService {
    protected db: Db;
    private session;
    protected currentUser;
    constructor(DB: Db, session : any) {
        this.db = DB;
        this.session = session;
        this.currentUser = this.session.user;
    }

    protected buildService<T extends IService>(service: { new(...args): T }): T{
        return new service(this.db, this.session);
    }
}