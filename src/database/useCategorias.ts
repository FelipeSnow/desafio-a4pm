import { useSQLiteContext } from "expo-sqlite";

export interface Categoria {
  nome: string;
  id: number;
}

export const useCategoriaDatabase = () => {
  const db = useSQLiteContext();

  const getAllAsync = async (): Promise<Categoria[]> => {
    const result = db.getAllAsync<Categoria>(`SELECT * FROM categorias`);
    return result;
  };

  const create = async (nome: string) => {
    db.runAsync(`INSERT INTO categorias (nome) VALUES (?)`, nome);
  };

  const edit = async (id: number, nome: string) => {
    db.runAsync(
      `UPDATE SET categorias (nome) VALUES (?) where id= (?)`,
      nome,
      id,
    );
  };

  const deleteByID = async (id: number) => {
    db.runAsync(`DELETE FROM categorias WHERE id =(?)`, id);
  };

  return { create, edit, deleteByID, getAllAsync };
};
