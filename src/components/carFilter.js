import { Select, Radio, InputNumber } from 'antd';
import { useGetCategoriesQuery } from '../services/category';
import { useSearchParams } from 'react-router-dom';
import { colors, makes, priceRange } from '../utils/data';

const { Option } = Select;


const Filter = () => {
    const { data: categories } = useGetCategoriesQuery();
    const [searchParams, setSearchParams] = useSearchParams({});

    const handleCategoryChange = (value) => {
        setSearchParams({ ...Object.fromEntries(searchParams), category: value || "" });
    };

    const handleColorChange = (e) => {
        setSearchParams({ ...Object.fromEntries(searchParams), color: e.target.value || "" });
    };

    const handleYearChange = (value) => {
        setSearchParams({ ...Object.fromEntries(searchParams), year: value || "" });
    };

    const handleMakeChange = (value) => {
        setSearchParams({ ...Object.fromEntries(searchParams), make: value || "" });
    };

    const handlePriceRangeChange = (e) => {
        console.log("price range => ", e.target.value)
        setSearchParams({ ...Object.fromEntries(searchParams), priceRange: e.target.value || "" });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '80px' }}>
            <div>
                <label style={{ marginRight: '16px' }}>Category:</label>
                <Select style={{ width: '120px' }} defaultValue={searchParams.get('category') || ""} onChange={handleCategoryChange}>
                    <Option key={1} value={""}>All</Option>
                    {categories?.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)}
                </Select>
            </div>
            <div>
                <label style={{ marginRight: '16px', marginBottom: '16px', display: "block" }}>Color:</label>
                <Radio.Group onChange={handleColorChange} value={searchParams.get('color')}>
                    <Radio value={""}>All</Radio>
                    {colors.map((color) => (
                        <Radio key={color} value={color}>
                            {color}
                        </Radio>
                    ))}
                </Radio.Group>
            </div>
            <div>
                <label style={{ marginRight: '16px' }}>Make:</label>
                <Select style={{ width: '120px' }} defaultValue={searchParams.get('make') || ""} onChange={handleMakeChange}>
                    <Option key={1} value={""}>All</Option>
                    {makes?.map((c, i) => <Option key={i} value={c}>{c}</Option>)}
                </Select>
            </div>
            <div>
                <label style={{ marginRight: '16px' }}>Year:</label>
                <InputNumber type="number" placeholder="Enter Year" defaultValue={searchParams.get('year') || ""} onChange={handleYearChange} />
            </div>
            <div>
                <label style={{ marginRight: '16px', display: 'block', marginBottom: '10px' }}>Price Range:</label>
                <Radio.Group onChange={handlePriceRangeChange} value={searchParams.get('priceRange')}>
                    <Radio style={{ display: 'block', marginBottom: '10px' }} value={""}>All</Radio>
                    {priceRange.map((range, index) => (
                        <Radio style={{ display: 'block', marginBottom: '10px' }} key={index} value={`${range.minPrice},${range.maxPrice}`}>
                            {`$${range.minPrice} - $${range.maxPrice}`}
                        </Radio>
                    ))}
                </Radio.Group>
            </div>
        </div>
    );
};

export default Filter;
