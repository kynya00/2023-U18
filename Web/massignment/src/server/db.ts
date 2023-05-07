import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

let db: Database;
export async function getDB() {
  if (!db) {
    db = await open({
      filename: ":memory:",
      driver: sqlite3.Database,
    });
    await db.exec(
      "CREATE TABLE users (id TEXT NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL)"
    );
    await db.exec("CREATE UNIQUE INDEX idx_users_id ON users (id)");
    await db.exec("CREATE UNIQUE INDEX idx_users_username ON users (username)");
  }
  return db;
}
