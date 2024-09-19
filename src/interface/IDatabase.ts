export interface IDatabase {
  connect(): Promise<void>;
  createTable(tableName: string, schema: Record<string, string>): Promise<void>;
  insert(tableName: string, data: Record<string, any>): Promise<void>;
  find(tableName: string, query: Record<string, any>): Promise<any[]>;
  disconnect(): Promise<void>;
}

export type Query = Record<string, any>;
export type Schema = Record<string, string>;
