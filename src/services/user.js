// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
// import config from '../config/development';

// export const userApi = createApi({
//     reducerPath: 'userApi',
//     tagTypes: ["User"],
//     baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),
//     endpoints: (builder) => ({

//         signup: builder.mutation({
//             query: (body) => ({
//                 url: config.api.endpoints.signup,
//                 method: 'POST',
//                 body,
//             }),
//             providesTags: ["User"],
//             transformResponse: (response) => {
//                 // handle successful response and return data to store
//             },
//         }),
//         login: builder.mutation({
//             query: (body) => ({
//                 url: config.api.endpoints.login,
//                 method: 'POST',
//                 body,
//             }),
//             providesTags: ["User"],
//             transformResponse: (response) => {
//                 // handle successful response and return data to store
//                 sessionStorage.setItem('jwt', response.token);
//             },
//         }),
//     }),
// });

// export const { useSignupMutation, useLoginMutation } = userApi


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config/development';

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (body) => ({
                url: config.api.endpoints.signup,
                method: 'POST',
                body,
            }),
            providesTags: ['User'],
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
        }),
        login: builder.mutation({
            query: (body) => ({
                url: config.api.endpoints.login,
                method: 'POST',
                body,
            }),
            providesTags: ['User'],
            transformResponse: (response) => {
                // handle successful response and return data to store
                sessionStorage.setItem('jwt', response.token);
            },
        }),
    }),
});

// Generate hooks for each endpoint
export const { useSignupMutation, useLoginMutation } = userApi;
