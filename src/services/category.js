import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from '../config/development';



export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
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
    tagTypes: ['Category'],

    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: config.api.endpoints.getCategories,
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
                return response.categories;
            },
        }),
        getCategoryById: builder.query({
            query: (id) => ({
                url: config.api.endpoints.getCategoryById(id),
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
            providesTags: (result, error, id) => [{ type: 'Category', id }],
        }),
        createCategory: builder.mutation({
            query: (body) => ({
                url: config.api.endpoints.createCategory,
                method: 'POST',
                body,
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
                return response
            },
            invalidatesTags: [{ type: 'Category', id: 'LIST' }],
        }),
        updateCategory: builder.mutation({
            query: ({ id, name }) => ({
                url: config.api.endpoints.updateCategory(id),
                method: 'PATCH',
                body: { name },
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
                return response
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Category', id }],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: config.api.endpoints.deleteCategory(id),
                method: 'DELETE',
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
            invalidatesTags: [{ type: 'Category', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApi

