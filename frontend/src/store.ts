import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './Auth/Auth';
import { produtosApi } from './redux/produtos';
import { categoriasApi } from './redux/categorias';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [produtosApi.reducerPath]: produtosApi.reducer,
    [categoriasApi.reducerPath]: categoriasApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(produtosApi.middleware)
      .concat(categoriasApi.middleware),
});

export default store;
