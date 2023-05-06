const config = {
    api: {
        baseUrl: 'http://localhost:5000/api',
        endpoints: {
            signup: '/auth/signup',
            login: '/auth/login',
            getCars: '/cars',
            getCarById: (id) => `/cars/${id}`,
            createCar: '/cars/create',
            updateCar: (id) => `/cars/update/${id}`,
            deleteCar: (id) => `/cars/delete/${id}`,
            getCategories: '/categories',
            getCategoryById: (id) => `/categories/${id}`,
            createCategory: '/categories/create',
            updateCategory: (id) => `/categories/update/${id}`,
            deleteCategory: (id) => `/categories/delete/${id}`,
        },
    },
    // other configuration details specific to your development environment
};

export default config;
