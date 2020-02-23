import DB, { IConnectionDB } from "./db"
import { GROUP } from "./schema/group";
import { USER } from "./schema/user";
import { MESSAGE } from "./schema/message";
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
                db["groups"] = await DbConnect.createCollection("groups", GROUP);
                db["users"] = await DbConnect.createCollection("users", USER);
                db["messages"] = await DbConnect.createCollection("messages",MESSAGE);
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