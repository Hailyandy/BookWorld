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
import NotFoundPage from "../NotFound/NotFound";
import tokenService from "~/services/token.service";
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
    let roleUser = tokenService.getUserRoleName()

    console.log(friendSearchList)
    const onChange1 = ({ target: { value } }) => {
        console.log('radio1 checked', value);
        setValue1(value);
    };

    const onSearch = (value, _e, info) => {
        console.log(info?.source, value);
        // navigate(`${value}`, { replace: true });
        `${cicd_href}/${tokenService.getUserRoleName()}/search-user/${value}`
        window.location = `${cicd_href}/${tokenService.getUserRoleName()}/search-user/${value}`
    }
    return (
        <div className="friend-search-container">
            <Search
                placeholder="Tìm kiếm bạn bè"
                allowClear
                enterButton="Tìm kiếm"
                width={700}
                onSearch={onSearch}
            />
            {
                friendSearchList.length > 0 ?
                    friendSearchList.map((friendSearchListItem) => {
                        return <li class="reading-book-item">
                            <TheUserItem userItem={friendSearchListItem} type={friendSearchListItem.friendship} />
                        </li>
                    }) : <NotFoundPage />
            }
            {/* <Pagination defaultCurrent={6} total={500} className="search-pagination" /> */}
        </div>



    )

}
export default SearchFriendPage
