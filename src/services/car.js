import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { api } from '../config/development';

const carsApi = createApi({
    reducerPath: 'carsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: api.baseUrl,
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
            query: () => api.endpoints.getCars,
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
        }),
        getCarById: builder.query({
            query: (id) => api.endpoints.getCarById(id),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
        }),
        createCar: builder.mutation({
            query: (body) => ({
                url: api.endpoints.createCar,
                method: 'POST',
                body,
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
        }),
        updateCar: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: api.endpoints.updateCar(id),
                method: 'PATCH',
                body: patch,
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
        }),
        deleteCar: builder.mutation({
            query: (id) => ({
                url: api.endpoints.deleteCar(id),
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
} = carsApi;
