import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiBaseUrl = {
  baseUrl: "https://localhost:5000/api",
};

export const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl.baseUrl,
});