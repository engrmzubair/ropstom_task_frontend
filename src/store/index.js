import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/user';
import { categoriesApi } from '../services/category';
import { carsApi } from '../services/car';

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [carsApi.reducerPath]: carsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(categoriesApi.middleware)
            .concat(carsApi.middleware),
});

export default store;
