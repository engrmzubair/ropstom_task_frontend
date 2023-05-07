import React from 'react'
import useAuth from '../hooks/useAuth'
import { Layout } from 'antd';
import CustomHeader from '../components/customHeader';
import CategoriesList from '../components/categoriesList';


function Categories() {
    useAuth();

    return (
        <Layout className="layout" >
            <CustomHeader />
            <div style={{ margin: '0 auto', width: '60%' }}>

                <h1>Categories</h1>
                <p>List of categories goes here.</p>
            </div>
            <CategoriesList />
        </Layout>
    );
}

export default Categories;
