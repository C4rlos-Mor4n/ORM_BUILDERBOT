import { IDatabase } from "./interface/IDatabase";
import { DatabaseFactory } from "./database/DatabaseFactory";

export class ORM {
  private db: IDatabase;

  constructor(dbType: string, config: any) {
    this.db = DatabaseFactory.createDatabase(dbType, config);
  }

  async connect(): Promise<void> {
    await this.db.connect();
  }

  async createTable(
    tableName: string,
    schema: Record<string, string>
  ): Promise<void> {
    await this.db.createTable(tableName, schema);
  }

  async insert(tableName: string, data: Record<string, any>): Promise<void> {
    await this.db.insert(tableName, data);
  }

  async find(tableName: string, query: Record<string, any>): Promise<any[]> {
    return this.db.find(tableName, query);
  }

  async disconnect(): Promise<void> {
    await this.db.disconnect();
  }
}
