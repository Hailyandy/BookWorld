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
import BSHAREnum from "~/helper/BSHAREenum";
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

const SearchFriendPage = () => {
    const navigate = useNavigate()
    const [value1, setValue1] = useState('All');
    const friendSearchList = mapToClass(useLoaderData(), UserEntity)
    console.log(friendSearchList)
    const onChange1 = ({ target: { value } }) => {
        console.log('radio1 checked', value);
        setValue1(value);
    };

    const onSearch = (value, _e, info) => {
        console.log(info?.source, value);
        navigate(`/search-result/search-user/${value}`, { replace: true });
    }
    return (
        <>
            <Search
                placeholder="Tìm kiếm bạn bè"
                allowClear
                enterButton="Tìm kiếm"

                width={300}
                onSearch={onSearch}
            />


            {
                friendSearchList.map((friendSearchListItem) => {
                    return <TheUserItem userItem={friendSearchListItem} type={friendSearchListItem.friendship} />
                })
            }


            <Pagination defaultCurrent={6} total={500} className="search-pagination" />
        </>
    )

}
export default SearchFriendPage
