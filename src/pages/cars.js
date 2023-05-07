import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import CustomHeader from '../components/customHeader';
import CarFilter from '../components/carFilter';
import useAuth from '../hooks/useAuth';
import { useGetCarsQuery } from '../services/car';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../components/carCard';
import AddCar from '../components/addCar';
import CarPagination from '../components/carPagination';

function Cars() {
    useAuth();
    const [searchParams, setSearchParams] = useSearchParams({});
    // Get all params as an object
    const params = Object.fromEntries(searchParams.entries());
    // const page = Number(params.page);
    const page = 1

    const priceRange = params.priceRange
        ? {
            minPrice: Number(params.priceRange.split(',')[0]),
            maxPrice: Number(params.priceRange.split(',')[1]),
        }
        : {};

    const { data = [], isLoading, refetch } = useGetCarsQuery({
        page: params.page,
        limit: 6,
        year: Number(params.year) || "",
        make: params.make || "",
        category: params.category || "",
        color: params.color?.toLowerCase() || "",
        ...priceRange
    });

    console.log("year type => ", typeof params.year)

    const handlePageChange = (page) => {
        setSearchParams({ ...params, page: String(page) });
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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
                            <Button type="primary" style={{ marginRight: "18px" }} onClick={showModal}>
                                Add Car
                            </Button>
                            <AddCar refetchCars={refetch} visible={isModalVisible} handleOk={handleOk} onCancel={handleCancel} />
                        </Col>
                        {data?.cars?.map((car, i) => (
                            <Col key={car._id} span={8}>
                                <CarCard car={car} refetchCars={refetch} />
                            </Col>
                        ))}
                    </Row>
                    <CarPagination
                        total={data?.totalCount}
                        pageSize={6}
                        current={Number(params.page)}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Layout>

    );
}

export default Cars;
