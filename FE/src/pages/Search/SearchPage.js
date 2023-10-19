import "./search.css"
import { AudioOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Input, Space, Radio, Pagination } from 'antd';
import TheAuthorBookItem from "~/components/author/TheAuthorBookItem";
import "~/components/author/bookItem.css";
const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);
const plainOptions = ['All', 'Tác giả', 'Tiêu đề'];
const onSearch = (value, _e, info) => console.log(info?.source, value);
const SearchPage = () => {
    const [value1, setValue1] = useState('All');
    const onChange1 = ({ target: { value } }) => {
        console.log('radio1 checked', value);
        setValue1(value);
    };
    return (
        <div className="search-page-containner">

            <div className="search-page-body">
                <h2>Search</h2>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
                <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />
                <TheAuthorBookItem />
                <TheAuthorBookItem />
                <TheAuthorBookItem />
                <Pagination defaultCurrent={6} total={500} style={{ marginTop: '2rem', marginBottom: '2rem', right: '0px', position: 'absolute' }} />;
            </div>

        </div>
    )

}
export default SearchPage
