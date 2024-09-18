export interface User {
  id: number;
  nome: string;
  login: string;
  senha: string;
  criado_em: Date;
  alterado_em: Date;
}

export interface Recipe {
  id: number;
  id_usuario: number;
  id_categoria: number;
  nome: string;
  tempo_preparo_minutos: number;
  porcoes: number;
  modo_preparo: string;
  ingredientes: number;
  criado_em: Date;
  alterado_em: Date;
}

export interface Category {
  id: number;
  nome: string;
}
