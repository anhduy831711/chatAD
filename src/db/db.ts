import { MongoClient, Db } from "mongodb";

export interface IConnectionDB {
    connect(): Promise<Db>,
    createCollection(name: string, schema): Promise<any>,
    checkConnection(): boolean,
    disConnect() : Promise<boolean>,
    getClient(): MongoClient
}

export default class implements IConnectionDB {
    private db: Db;
    private client: MongoClient;
    public async connect() {
        if (!this.db) {
            const URI = process.env.DB_URL;
            const DATABASENAME = process.env.DATABASENAME;
            this.client = await MongoClient.connect(URI, { useUnifiedTopology: true });
            this.db = this.client.db(DATABASENAME);
        }
        return this.db;
    }

    public async createCollection(name: string, schema) {
        return new Promise((resolve,reject)=>{
            this.db.createCollection(name,schema,(error,result)=>{
                if(error)
                {
                    reject(error);
                }
                resolve(result);
            })
        })
    }

    public checkConnection(): boolean {
        return this.client != null;
    }

    public async disConnect() : Promise<boolean>
    {
        try {
            await this.client.close()
            return true;
        } catch (error) {
            return false
        }
    }

    public getClient(){
        return this.client;
    }
}