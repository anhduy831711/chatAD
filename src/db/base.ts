import { Db, Collection, ObjectId, UpdateWriteOpResult } from "mongodb";

export interface ICommunicationDB<T> {
    getAll(query: any, project?: any): Promise<Array<T>>,
    create(data: T),
    createMany(datas: Array<T>),
    updateOne(query: object, data: object): Promise<UpdateWriteOpResult>,
    deleteOne(id: string)
}

export default abstract class <T> implements ICommunicationDB<T> {
    private db: Db;
    protected collection: Collection<T>;
    constructor(DB: Db) {
        this.db = DB;
        this.collection = this.db.collection<T>(this.getName());
    }

    public getAll(query: any, project?: Object): Promise<Array<T>> {
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

    public async updateOne(query: object, data: object): Promise<UpdateWriteOpResult> {
        return await this.collection.updateOne(query, data);
    };

    public async deleteOne(id: string) {
        let query: any = { _id: id };
        return this.collection.deleteOne(query)
    }
}
