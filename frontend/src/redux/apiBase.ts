import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiBaseUrl = {
  baseUrl: import.meta.env.VITE_BACKEND_URL??"http://localhost:5034/api",
};

export const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl.baseUrl,
});