import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

function CustomHeader({ activeTab, handleLogout }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuClick = (e) => {
        navigate(`/${e.key}`);
    };

    return (
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[activeTab]} selectedKeys={[location.pathname.substr(1)]} onClick={handleMenuClick}>
                <Menu.Item key="">Dashboard</Menu.Item>
                <Menu.Item key="categories">Categories</Menu.Item>
                <Menu.Item key="cars">Cars</Menu.Item>
                <Menu.Item key="logout" style={{ float: 'right', marginLeft: 'auto' }}>
                    <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} style={{ color: '#fff' }}>
                        Logout
                    </Button>
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default CustomHeader;
