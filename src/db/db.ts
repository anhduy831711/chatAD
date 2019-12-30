import { MongoClient, Db } from "mongodb";

export interface IConnectionDB {
    connect(): Promise<Db>,
    createCollection(name: string, schema): Promise<void>,
    checkConnection(): boolean,
    disConnect() : Promise<boolean>,
    client : MongoClient
}

export default class implements IConnectionDB {
    private db: Db;
    public client: MongoClient;
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
        return await this.db.createCollection(name, schema)
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
}