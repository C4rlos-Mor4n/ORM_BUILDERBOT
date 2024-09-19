import mysql from "mysql2/promise";
import { IDatabase, Schema, Query } from "../interface/IDatabase";

export class MySQLDatabase implements IDatabase {
  private connection!: mysql.Connection;

  constructor(private config: mysql.ConnectionOptions) {}

  async connect(): Promise<void> {
    try {
      this.connection = await mysql.createConnection(this.config);
      console.log("¡Conectado a MySQL!✅");
    } catch (error) {
      console.error("Error al conectar a MySQL:", error);
      throw error;
    }
  }

  async createTable(tableName: string, schema: Schema): Promise<void> {
    const fields = Object.entries(schema)
      .map(([key, type]) => `${key} ${type}`)
      .join(", ");
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${fields})`;
    await this.connection.execute(query);
    console.log(`Tabla ${tableName} creada en MySQL`);
  }

  async insert(tableName: string, data: Record<string, any>): Promise<void> {
    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data)
      .map(() => "?")
      .join(", ");
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
    const values = Object.values(data);
    await this.connection.execute(query, values);
    console.log("Fila insertada en MySQL");
  }

  async find(tableName: string, query: Query): Promise<any[]> {
    const whereClause = Object.entries(query)
      .map(([key, value]) => `${key} = ?`)
      .join(" AND ");
    const sqlQuery = `SELECT * FROM ${tableName} WHERE ${whereClause}`;
    const values = Object.values(query);
    const [rows] = await this.connection.execute(sqlQuery, values);
    return rows as any[];
  }

  async disconnect(): Promise<void> {
    await this.connection.end();
    console.log("Desconectado de MySQL.");
  }
}
