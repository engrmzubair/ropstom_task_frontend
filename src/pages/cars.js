import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import CustomHeader from '../components/customHeader';
import CarFilter from '../components/carFilter';
import CarPagination from '../components/carPagination';
import useAuth from '../hooks/useAuth';
import { useGetCarsQuery } from '../services/car';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CarCard from '../components/carCard';

function Cars() {
    useAuth();
    const [searchParams, setSearchParams] = useSearchParams({});
    // Get all params as an object
    const params = Object.fromEntries(searchParams.entries());
    const page = Number(params.page);
    console.log({ params, page })

    const { data: cars = [], isLoading } = useGetCarsQuery({
        page,
        perPage: 6,
    });


    const handlePageChange = (page) => {
        setSearchParams({ ...params, page: String(page) });
    };

    return (
        <Layout className="layout">
            <CustomHeader />
            <Row gutter={[16, 16]} style={{ margin: '16px' }}>
                <Col span={5}>
                    <CarFilter />
                </Col>
                <Col span={19}>
                    <Row gutter={[16, 16]}>
                        {[...Array(6)].map((car, i) => (
                            <Col key={i} span={8}>
                                <CarCard car={car} />
                            </Col>
                        ))}
                    </Row>
                    <CarPagination
                        total={30}
                        pageSize={6}
                        current={page}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Layout>
    );
}

export default Cars;
