export enum RoutesPath {
  ROOT = "/",
  LOGIN = "/login",
  CATEGORIAS = "/categorias",
  EDITAR_CATEGORIAS = "/categorias/:id",
  REGISTRAR_CATEGORIAS = "/categorias/registrar",
  PRODUTOS = "/produtos",
  EDITAR_PRODUTOS = "/produtos/:id",
  REGISTRAR_PRODUTOS = "/produtos/registrar",
}

export const formatIdRoute = (route:string, id:number):string => route.replace(":id",id.toString())