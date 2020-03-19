import { Db, Collection, ObjectId, UpdateWriteOpResult } from "mongodb";

export interface ICommunicationDB<T> {
    find(query: any, project?: object): Promise<Array<T>>,
    create(data: T): Promise<any>,
    createMany(datas: Array<T>): Promise<any>,
    updateOne(query: object, update: object): Promise<any>,
    deleteById(id: ObjectId): Promise<any>,
    findOne(query: object, project?: object): Promise<T>,
    aggregate(query: Array<object>),
    count(query: object): Promise<number>,
    save(data: T)
}

export default abstract class <T> implements ICommunicationDB<T> {
    private db: Db;
    protected collection: Collection<T>;
    constructor(DB: Db) {
        this.db = DB;
        this.collection = this.db[this.getName()];
    }

    public find(query: any, project?: Object): Promise<Array<T>> {
        return this.collection.find(query).project(this.buildProject(project)).toArray();
    }

    public create(data: T) {
        return this.collection.insertOne(data);
    }

    public createMany(datas: Array<T>) {
        return this.collection.insertMany(datas);
    }

    protected abstract getName(): string;
    protected getProject() {
        return {};
    }

    private buildProject(project: any) {
        return {
            ...project,
            ...this.getProject()
        }
    }

    public updateOne(query: object, update: object) {
        return this.collection.updateOne(query, update);
    };

    public deleteById(_id: ObjectId) {
        let query: object = { _id };
        return this.collection.deleteOne(query);
    }

    public findOne(query: object, project: object): Promise<T> {
        return this.collection.findOne(query, project);
    }

    public aggregate(query: Array<object>) {
        return this.collection.aggregate(query).toArray();
    }

    public count(query: object): Promise<number> {
        return this.collection.find(query).count();
    }

    public save(data: T) {
        return this.collection.save(data);
    }
}
