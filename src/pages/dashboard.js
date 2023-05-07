import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { Layout, Breadcrumb } from 'antd';
import CustomHeader from '../components/customHeader';

const { Header, Content, Footer } = Layout;

function Dashboard() {
    useAuth();

    return (
        <Layout className="layout">
            <CustomHeader />
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Overview</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <p>Total Registered Cars: 100</p>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Car Management System ©2023 Created by Your Name</Footer>
        </Layout>
    );
}

export default Dashboard;
