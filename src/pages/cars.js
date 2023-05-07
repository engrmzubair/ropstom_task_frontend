import React, { useEffect } from 'react';
import { Layout, Row, Col, Button } from 'antd';
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

    const { data = [], isLoading } = useGetCarsQuery({
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
                    <Row align="middle" gutter={[16, 16]}>
                        <Col span={12}>
                            <h2>Cars</h2>
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <Button type="primary" style={{ marginRight: "18px" }} onClick={() => { }}>
                                Add Car
                            </Button>
                        </Col>
                        {data?.cars?.map((car, i) => (
                            <Col key={car._id} span={8}>
                                <CarCard car={car} />
                            </Col>
                        ))}
                    </Row>
                    <CarPagination
                        total={data?.totalCount}
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
