import DB, { IConnectionDB } from "./db"
import { ALLOWANCE } from "./schema/allowance";
import { Db } from "mongodb";
let DbConnect: IConnectionDB;
let db: Db;
export default class {
    public static async start() {
        if (!DbConnect) {
            DbConnect = new DB();
        }

        if (!DbConnect.checkConnection()) {
            db = await DbConnect.connect();
            try {
                await DbConnect.createCollection("allowances", ALLOWANCE);
            } catch (error) {
                console.log(error);
            }
        }
        return db;
    }
    
    public static get getClient() {
        if (!DbConnect) {
            DbConnect = new DB();
        }
        return DbConnect.getClient();
    }
}