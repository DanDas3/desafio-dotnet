import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './apiBase';

export const produtosApi = createApi({
  reducerPath: 'produtosApi',
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'Produtos',
    }),
    getProductById: builder.query({
      query: (id: number) => `Produtos/${id}`,
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...body }: { id: number; nome: string; preco: number }) => ({
        url: `Produtos/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    createCategory: builder.mutation({
      query: (produto) => ({
        url: 'Categorias',
        method: 'POST',
        body: produto,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} = produtosApi;
