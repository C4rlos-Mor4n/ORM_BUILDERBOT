import { IDatabase } from "../interface/IDatabase";
import { MongoDBDatabase } from "./MongoDBDatabase";
import { MySQLDatabase } from "./MySQLDatabase";

export class DatabaseFactory {
  static createDatabase(dbType: string, config: any): IDatabase {
    switch (dbType) {
      case "mongodb":
        return new MongoDBDatabase(config.uri, config.dbName);
      case "mysql":
        return new MySQLDatabase(config);
      default:
        throw new Error(`Database type ${dbType} is not supported.`);
    }
  }
}
