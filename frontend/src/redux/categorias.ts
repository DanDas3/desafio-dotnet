import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './apiBase';
import { CategoriaDTO } from '../dto/categoriaDTO';

export const categoriasApi = createApi({
  reducerPath: 'categoriasApi',
  baseQuery,
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'Categorias', 
    }),
    getCategoryById: builder.query({
      query: (id: number) => `Categorias/${id}`,
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...body }: CategoriaDTO) => ({
        url: `Categorias/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteCategoryById: builder.mutation({
      query: (id: number) => ({
        url: `Categorias/${id}`,
        method: 'DELETE',
      }),
    }),
    createCategory: builder.mutation({
      query: (categoria: CategoriaDTO) => ({
        url: 'Categorias',
        method: 'POST',
        body: categoria,
      }),
    }),
  }),
});

export const { 
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryByIdMutation,
  useCreateCategoryMutation,
} = categoriasApi;

