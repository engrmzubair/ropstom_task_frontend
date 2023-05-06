import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { api } from '../config/development';
import { userValidationSchema } from '../utils/validations/userValidation';

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
            validate: {
                body: userValidationSchema,
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
            validate: {
                body: userValidationSchema,
            },
        }),
    }),
});

export const { useSignupMutation, useLoginMutation } = userApi;
