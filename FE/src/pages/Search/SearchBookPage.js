import "./search.css"
import { AudioOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Input, Space, Radio, Pagination, AutoComplete } from 'antd';
import TheAuthorBookItem from "~/components/author/TheAuthorBookItem";
import "~/components/author/bookItem.css";
import { useLoaderData } from "react-router-dom";
import { mapToClass } from "~/helper/mappingToClass";
import { BookEntity } from "~/entity/bookEntity";
import { useNavigate } from "react-router-dom";
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

const SearchBookPage = () => {
    const [value1, setValue1] = useState('All');
    const navigate = useNavigate()
    const bookSearchList = mapToClass(useLoaderData(), BookEntity)
    console.log(bookSearchList)
    const onChange1 = ({ target: { value } }) => {
        console.log('radio1 checked', value);
        setValue1(value);
    };

    const onSearch = (value, _e, info) => {
        console.log(info?.source, value);
        navigate(`../search-book/${value}`, { replace: true });
    }
    return (
        <>
            <Search
                placeholder="Tìm kiếm sách"
                allowClear
                enterButton="Tìm kiếm"

                width={300}
                onSearch={onSearch}
            />
            {/* <Radio.Group options={plainOptions} onChange={onChange1} value={value1} /> */}

            {
                bookSearchList.map((bookSearchListItem) => {
                    return <TheAuthorBookItem bookItem={bookSearchListItem} />
                })
            }


            <Pagination defaultCurrent={6} total={500} className="search-pagination" />
        </>
    )

}
export default SearchBookPage
