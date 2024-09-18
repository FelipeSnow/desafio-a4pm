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

    INSERT OR IGNORE INTO categorias (id, nome) VALUES (1, 'Bolos e tortas doces');
    INSERT OR IGNORE INTO categorias (id, nome) VALUES (2, 'Carnes');
    INSERT OR IGNORE INTO categorias (id, nome) VALUES (3, 'Aves');
    INSERT OR IGNORE INTO categorias (id, nome) VALUES (4, 'Peixes e frutos do mar');
    INSERT OR IGNORE INTO categorias (id, nome) VALUES (5, 'Saladas, molhos e acompanhamentos');
    INSERT OR IGNORE INTO categorias (id, nome) VALUES (6, 'Sopas');
    INSERT OR IGNORE INTO categorias (id, nome) VALUES (7, 'Massas');
    INSERT OR IGNORE INTO categorias (id, nome) VALUES (8, 'Bebidas');
    INSERT OR IGNORE INTO categorias (id, nome) VALUES (9, 'Doces e sobremesas');
    INSERT OR IGNORE INTO categorias (id, nome) VALUES (10, 'Lanches');
    INSERT OR IGNORE INTO categorias (id, nome) VALUES (11, 'Prato Único');
    INSERT OR IGNORE INTO categorias (id, nome) VALUES (12, 'Light');
    INSERT OR IGNORE INTO categorias (id, nome) VALUES (13, 'Alimentação Saudável');

  INSERT OR IGNORE INTO usuarios (id, nome, login, senha, criado_em, alterado_em) VALUES (1, 'Admin', 'admin', 'admin', '2021-09-01 00:00:00', '2021-09-01 00:00:00');

   -- INSERT OR IGNORE INTO receitas (id, id_usuarios, id_categorias, nome, tempo_preparo_minutos, porcoes, modo_preparo, ingredientes, criado_em, alterado_em) VALUES (1, 1, 1, 'Bolo de cenoura', 60, 12, '1. Preaqueça o forno a 180°C. 2. Unte e enfarinhe uma forma de buraco no meio. 3. No liquidificador, bata a cenoura, os ovos e o óleo. 4. Em uma tigela, misture a farinha, o açúcar e o fermento. 5. Junte a mistura do liquidificador com a mistura da tigela e mexa bem. 6. Despeje a massa na forma e leve ao forno por 40 minutos.', '3 cenouras médias, 4 ovos, 1 xícara de óleo, 2 xícaras de açúcar, 2 xícaras de farinha de trigo, 1 colher de sopa de fermento em pó', '2021-09-01 00:00:00', '2021-09-01 00:00:00');
  `);
}
