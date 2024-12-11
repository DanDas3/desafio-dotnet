import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import CategoriasPage from "../pages/Categorias/Categorias";
import ProductsPage from "../pages/Produtos/Produtos";
import ProtectedRoute from "../Auth/protectedRoute";
import { RoutesPath } from "../utils/constants";
import EditarCategoriaPage from "../pages/Categorias/EditarCategoriaPage";
import EditarProdutoPage from "../pages/Produtos/EditarProdutoPage";

const AppRoutes = () => {

  return(
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path={RoutesPath.LOGIN} element={<Login />}></Route>
      <Route path={RoutesPath.CATEGORIAS} element={<ProtectedRoute><CategoriasPage /> </ProtectedRoute>}></Route>
      <Route path={RoutesPath.EDITAR_CATEGORIAS} element={<ProtectedRoute><EditarCategoriaPage /> </ProtectedRoute>}></Route>
      <Route path={RoutesPath.REGISTRAR_CATEGORIAS} element={<ProtectedRoute><EditarCategoriaPage /> </ProtectedRoute>}></Route>
      <Route path={RoutesPath.PRODUTOS} element={<ProtectedRoute><ProductsPage /></ProtectedRoute>}></Route>
      <Route path={RoutesPath.EDITAR_PRODUTOS} element={<ProtectedRoute><EditarProdutoPage /></ProtectedRoute>}></Route>
      <Route path={RoutesPath.REGISTRAR_PRODUTOS} element={<ProtectedRoute><EditarProdutoPage /> </ProtectedRoute>}></Route>
    </Routes>
  )
}

export default AppRoutes;