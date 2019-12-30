import { Db, Collection } from "mongodb";

export interface ICommunicationDB<T> {
    getAll(query): Promise<Array<T>>,
    create(data: T),
    createMany(datas: Array<T>)
}

export default abstract class <T> implements ICommunicationDB<T> {
    private db: Db;
    protected collection: Collection<T>;
    constructor(DB: Db) {
        this.db = DB;
        this.collection = this.db.collection<T>(this.getName());
    }

    public getAll(query): Promise<Array<T>> {
        return this.collection.find(query).toArray();
    }

    public create(data: T) {
        return this.collection.insertOne(data);
    }

    public createMany(datas: Array<T>) {
        return this.collection.insertMany(datas);
    }

    protected abstract getName(): string;
}
