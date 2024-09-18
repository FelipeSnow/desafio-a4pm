import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
  database.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      login TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      criado_em DATETIME NOT NULL,
      alterado_em DATETIME NOT NULL
    );


    CREATE TABLE IF NOT EXISTS categorias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT UNIQUE
    );

    CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_usuarios INTEGER NOT NULL,
      id_categorias INTEGER,
      nome TEXT,
      tempo_preparo_minutos INTEGER,
      porcoes INTEGER,
      modo_preparo TEXT NOT NULL,
      ingredientes TEXT,
      criado_em DATETIME NOT NULL,
      alterado_em DATETIME NOT NULL,
      FOREIGN KEY (id_usuarios) REFERENCES usuarios (id) ON DELETE RESTRICT ON UPDATE CASCADE,
      FOREIGN KEY (id_categorias) REFERENCES categorias (id) ON DELETE CASCADE ON UPDATE CASCADE
    );


    BEGIN TRANSACTION;

    INSERT INTO categorias (id, nome) VALUES (1, 'Bolos e tortas doces');
    INSERT INTO categorias (id, nome) VALUES (2, 'Carnes');
    INSERT INTO categorias (id, nome) VALUES (3, 'Aves');
    INSERT INTO categorias (id, nome) VALUES (4, 'Peixes e frutos do mar');
    INSERT INTO categorias (id, nome) VALUES (5, 'Saladas, molhos e acompanhamentos');
    INSERT INTO categorias (id, nome) VALUES (6, 'Sopas');
    INSERT INTO categorias (id, nome) VALUES (7, 'Massas');
    INSERT INTO categorias (id, nome) VALUES (8, 'Bebidas');
    INSERT INTO categorias (id, nome) VALUES (9, 'Doces e sobremesas');
    INSERT INTO categorias (id, nome) VALUES (10, 'Lanches');
    INSERT INTO categorias (id, nome) VALUES (11, 'Prato Único');
    INSERT INTO categorias (id, nome) VALUES (12, 'Light');
    INSERT INTO categorias (id, nome) VALUES (13, 'Alimentação Saudável');

    COMMIT;
  `);
}
