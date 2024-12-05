import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiBaseUrl = {
  baseUrl: "https://localhost:44380/api",
};

export const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl.baseUrl,
});