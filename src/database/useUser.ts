import { useSQLiteContext } from "expo-sqlite";

export interface UserModel {
  id: number;
  nome: string;
  login: string;
  senha: string;
  criado_em: Date;
  alterado_em: Date;
}

export function useUserDatabase() {
  const database = useSQLiteContext();

  async function create(
    data: Omit<UserModel, "id" | "alterado_em" | "criado_em">,
  ) {
    const statement = await database.prepareAsync(
      "INSERT INTO usuarios (nome, login, senha, criado_em, alterado_em) VALUES ($nome, $login, $senha, $criado_em, $alterado_em)",
    );

    const result = await statement.executeAsync({
      $nome: data.nome,
      $login: data.login,
      $senha: data.senha,
      $criado_em: new Date().toISOString(),
      $alterado_em: new Date().toISOString(),
    });

    return result;
  }

  async function update(data: UserModel) {
    const statement = await database.prepareAsync(
      "INSERT OR REPLACE INTO usuarios (id, nome, login, senha, criado_em, alterado_em) VALUES ($id, $nome, $login, $senha, $criado_em, $alterado_em)",
    );

    const result = await statement.executeAsync<UserModel>({
      $id: data.id,
      $nome: data.nome,
      $login: data.login,
      $senha: data.senha,
      $criado_em: data.criado_em.toISOString(),
      $alterado_em: new Date().toISOString(),
    });

    return result;
  }

  async function findByLogin(login: string, senha: string) {
    const statement =
      "SELECT * FROM usuarios WHERE login = $login AND senha = $senha";

    const result = await database.getFirstAsync<UserModel>(statement, {
      $login: login,
      $senha: senha,
    });

    return result;
  }

  return { create, update, findByLogin };
}
