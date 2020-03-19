import { Db } from "mongodb"
import { IUser } from "../db/interface";

export interface IService { 
    buildAggregate(aggregate: Array<object>, limit? : number, start? : number, sort? : object)
}

export default class Base implements IService {
    protected db: Db;
    private user : IUser;
    constructor(DB: Db, user: IUser) {
        this.db = DB;
        this.user = user;
    }

    protected buildService<T extends IService>(service: { new(...args): T }): T {
        return new service(this.db, this.user);
    }

    protected get getUser(): IUser {
        return this.user;
    }

    protected buildDataAccess<T>(Model: { new(db: Db): T }): T {
        return new Model(this.db);
    }

    public buildAggregate(aggregate: Array<object>, limit = 10, start = 0, sort = { _id: 1 }) {
        aggregate.push({
            $facet: {
                count: [{ $count: "count" }],
                docs: [{
                    $sort: sort
                }, {
                    $skip: start
                }, {
                    $limit: limit
                }]
            }
        });

        aggregate.push({
            $project: {
                count: { $arrayElemAt: ["$count", 0] },
                docs: 1
            }
        })

        aggregate.push({
            $project: {
                docs: 1,
                total: "$count.count"
            }
        })
    }
}