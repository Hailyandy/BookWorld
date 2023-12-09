import "./search.css"
import { AudioOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Input, Space, Radio, Pagination, AutoComplete } from 'antd';
import TheAuthorBookItem from "~/components/author/TheAuthorBookItem";
import TheUserItem from "~/components/author/TheUserItem"
import "~/components/author/bookItem.css";
import { useLoaderData } from "react-router-dom";
import { mapToClass } from "~/helper/mappingToClass";
import { UserEntity } from "~/entity/userEntity";
import { useNavigate } from "react-router-dom";
import BSHAREnum from "~/helper/BSHAREenum";
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

const SearchUserPage = () => {
    const [value1, setValue1] = useState('All');
    const navigate = useNavigate()
    const userSearchList = mapToClass(useLoaderData(), UserEntity)
    console.log(userSearchList)
    const onChange1 = ({ target: { value } }) => {
        console.log('radio1 checked', value);
        setValue1(value);
    };
    const onSearch = (value, _e, info) => {
        console.log(info?.source, value);
        //dường dẫn relative path
        navigate(`../search-user/${value}`, { replace: true });
    }
    return (
        <>
            <Search
                placeholder="Tìm kiếm người dùng"
                allowClear
                enterButton="Tim kiếm"

                width={300}
                onSearch={onSearch}
            />


            {
                userSearchList.map((userSearchListItem) => {
                    return <TheUserItem userItem={userSearchListItem} type={userSearchListItem.friendship} />
                })
            }


            {/* <Pagination defaultCurrent={6} total={500} className="search-pagination" /> */}
        </>
    )

}
export default SearchUserPage
