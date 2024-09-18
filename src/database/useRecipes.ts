import { useSQLiteContext } from "expo-sqlite";

export interface Receita {
  id: number;
  id_usuarios: number;
  id_categorias?: number;
  nome: string;
  tempo_preparo_minutos: number;
  porcoes: number;
  modo_preparo: string;
  ingredientes: string;
  criado_em: string;
  alterado_em: string;

  /**
   * If joined with usuarios table
   */
  nome_usuario?: string;
}

export function useRecipesDatabase() {
  const db = useSQLiteContext();
  const create = async ({
    id_usuarios,
    id_categorias,
    nome,
    tempo_preparo_minutos,
    porcoes,
    modo_preparo,
    ingredientes,
  }: Omit<Receita, "criado_em" | "alterado_em" | "id">) => {
    const query = `
        INSERT INTO receitas (
          id_usuarios,
          id_categorias,
          nome,
          tempo_preparo_minutos,
          porcoes,
          modo_preparo,
          ingredientes,
          criado_em,
          alterado_em
        ) VALUES (?,?,?,?,?,?,?,?,?)
      `;

    db.runAsync(
      query,
      id_usuarios,
      id_categorias || null,
      nome,
      tempo_preparo_minutos,
      porcoes,
      modo_preparo,
      ingredientes,
      new Date().toISOString(),
      new Date().toISOString(),
    );
  };

  const filterByName = async (name: string): Promise<Receita[]> => {
    const query = `
    SELECT rec.*, usuarios.nome as nome_usuario
    FROM receitas rec
    LEFT JOIN usuarios ON rec.id_usuarios = usuarios.id
    WHERE rec.nome LIKE '%' || ? || '%'
  `;

    const result = await db.getAllAsync<Receita & { nome_usuario: string }>(
      query,
      name,
    );

    return result;
  };

  const getById = async (id: number): Promise<Receita | null> => {
    const query = `SELECT * FROM receitas WHERE id = (?)`;

    const result = await db.getFirstAsync<Receita>(query, id);

    return result;
  };

  const edit = async ({
    id,
    id_usuarios,
    id_categorias,
    nome,
    tempo_preparo_minutos,
    porcoes,
    modo_preparo,
    criado_em,
    ingredientes,
  }: Receita) => {
    const query = `
        INSERT OR REPLACE INTO receitas (
          id_usuarios,
          id_categorias,
          nome,
          tempo_preparo_minutos,
          porcoes,
          modo_preparo,
          ingredientes,
          criado_em,
          alterado_em
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

    db.runAsync(
      query,
      id,
      id_usuarios,
      id_categorias || null,
      nome,
      tempo_preparo_minutos,
      porcoes,
      modo_preparo,
      ingredientes,
      new Date(criado_em).toISOString(),
      new Date().toISOString(),
    );
  };

  const deleteByID = async (id: number) => {
    const query = `DELETE FROM receitas WHERE id = (?)`;

    await db.runAsync(query, id);
  };

  return { create, edit, deleteByID, filterByName, getById };
}
