import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { api } from '../config/development';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: api.baseUrl }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (body) => ({
                url: api.endpoints.signup,
                method: 'POST',
                body,
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
        }),
        login: builder.mutation({
            query: (body) => ({
                url: api.endpoints.login,
                method: 'POST',
                body,
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
                sessionStorage.setItem('jwt', response.token);
            },
        }),
    }),
});

export const { useSignupMutation, useLoginMutation } = userApi;
