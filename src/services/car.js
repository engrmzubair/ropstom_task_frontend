import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from '../config/development';

export const carsApi = createApi({
    reducerPath: 'carsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: config.api.baseUrl,
        prepareHeaders: (headers) => {
            const token = sessionStorage.getItem('jwt');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCars: builder.query({
            query: () => config.api.endpoints.getCars,
            transformResponse: (response) => {
                // handle successful response and return data to store
                return response
            },
        }),
        getCarById: builder.query({
            query: (id) => config.api.endpoints.getCarById(id),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
        }),
        createCar: builder.mutation({
            query: (body) => ({
                url: config.api.endpoints.createCar,
                method: 'POST',
                body,
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
        }),
        updateCar: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: config.api.endpoints.updateCar(id),
                method: 'PATCH',
                body: patch,
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
        }),
        deleteCar: builder.mutation({
            query: (id) => ({
                url: config.api.endpoints.deleteCar(id),
                method: 'DELETE',
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
        }),
    }),
});

export const {
    useGetCarsQuery,
    useGetCarByIdQuery,
    useCreateCarMutation,
    useUpdateCarMutation,
    useDeleteCarMutation,
} = carsApi

