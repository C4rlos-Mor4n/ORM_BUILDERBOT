import { ORM } from "./ORM";

async function main() {
  const mongoConfig = {
    uri: "mongodb://localhost:27017",
    dbName: "testdb",
  };
  const mysqlConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "testbd",
  };

  const mongoORM = new ORM("mongodb", mongoConfig);
  await mongoORM.connect();
  await mongoORM.createTable("users", { name: "string", age: "number" });
  await mongoORM.insert("users", { name: "Aurik", age: 30 });
  const usersMongo = await mongoORM.find("users", { name: "Aurik" });
  console.log("Usuarios en MongoDB:", usersMongo);
  await mongoORM.disconnect();

  const mysqlORM = new ORM("mysql", mysqlConfig);
  await mysqlORM.connect();
  await mysqlORM.createTable("users", { name: "VARCHAR(255)", age: "INT" });
  await mysqlORM.insert("users", { name: "Aurik", age: 30 });
  const usersMySQL = await mysqlORM.find("users", { name: "Aurik" });
  console.log("Usuarios en MySQL:", usersMySQL);
  await mysqlORM.disconnect();
}

main();
