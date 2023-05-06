import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { api } from '../config/development';

const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
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
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: api.endpoints.getCategories,
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
        }),
        getCategoryById: builder.query({
            query: (id) => ({
                url: api.endpoints.getCategoryById(id),
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
            providesTags: (result, error, id) => [{ type: 'Category', id }],
        }),
        createCategory: builder.mutation({
            query: (body) => ({
                url: api.endpoints.createCategory,
                method: 'POST',
                body,
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
            invalidatesTags: [{ type: 'Category', id: 'LIST' }],
        }),
        updateCategory: builder.mutation({
            query: ({ id, body }) => ({
                url: api.endpoints.updateCategory(id),
                method: 'PATCH',
                body,
            }),
            transformResponse: (response) => {
                // handle successful response and return data to store
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Category', id }],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: api.endpoints.deleteCategory(id),
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
} = categoriesApi;
