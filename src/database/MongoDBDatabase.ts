import { MongoClient, Db } from "mongodb";
import { IDatabase, Schema, Query } from "../interface/IDatabase";

export class MongoDBDatabase implements IDatabase {
  private client: MongoClient;
  private db!: Db;

  constructor(private uri: string, private dbName: string) {
    this.client = new MongoClient(this.uri);
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log("MongoDB connected!✅");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  async createTable(tableName: string, schema: Schema): Promise<void> {
    console.log(`Colección ${tableName} creada con el esquema`, schema);
  }

  async insert(tableName: string, data: Record<string, any>): Promise<void> {
    const collection = this.db.collection(tableName);
    await collection.insertOne(data);
    console.log("Documento insertado en MongoDB");
  }

  async find(tableName: string, query: Query): Promise<any[]> {
    const collection = this.db.collection(tableName);
    return collection.find(query).toArray();
  }

  async disconnect(): Promise<void> {
    await this.client.close();
    console.log("MongoDB desconectado.");
  }
}
