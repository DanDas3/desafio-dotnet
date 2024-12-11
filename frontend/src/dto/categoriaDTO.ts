import { ProdutoDTO } from "./produtoDTO";

export interface CategoriaDTO {
  id?: number,
  nome: string,
  produtos: ProdutoDTO[]
}