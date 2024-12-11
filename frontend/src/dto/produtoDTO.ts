import { CategoriaDTO } from "./categoriaDTO";

export interface ProdutoDTO {
  id?: number;
  nome: string;
  preco: number;
  categoriaId: number;
  Categoria:CategoriaDTO;
}