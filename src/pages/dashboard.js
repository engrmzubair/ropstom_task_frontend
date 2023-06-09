import React from 'react'
import useAuth from '../hooks/useAuth'
import { Layout, Breadcrumb } from 'antd';
import CustomHeader from '../components/customHeader';
import { useGetCarsQuery } from '../services/car';

const { Content, Footer } = Layout;

function Dashboard() {
    useAuth();
    const { data = [] } = useGetCarsQuery();

    return (
        <Layout className="layout">
            <CustomHeader />
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Overview</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <p>Total Cars: {data.totalCount}</p>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ropstam MERN Task ©2023 Created by Your Name</Footer>
        </Layout>
    );
}

export default Dashboard;
