import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('missoes.db');

export function criarTabela() {

  db.execSync(`
    CREATE TABLE IF NOT EXISTS missoes ( 
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      xp INTEGER NOT NULL
    );
  `);

}

export default db;