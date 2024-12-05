import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseUrl } from '../redux/apiBase';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery(apiBaseUrl),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/Users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
