import BookJacket from "~/components/ui/BookJacket/BookJacket"
import "./userhome.css"
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import ReviewPost from "~/components/form/Review Post/ReviewPost";
import Avartar from "~/components/ui/Avartar/Avartar";
import { useLoaderData } from "react-router-dom";
import NotFoundPage from "../NotFound/NotFound";
const items = [
    {
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item（disabled）',
        key: '3',
        disabled: true,
    },
];
//{ userPost: [], suggestionBooks: [], currentReadingBooks: [], favouriteBooks: [], friends: [] }
const UserHomePage = () => {
    var dataLoader = useLoaderData()
    console.log(dataLoader)
    return (
        <div className="user-home-container">
            {/* List Book */}
            <div className="list-book stick-to-top">
                <div class="reading-book ">
                    <h2 class="reading-book-title">Sách đang đọc</h2>
                    <ul class="reading-book-list">
                        {
                            dataLoader.currentReadingBooks?.length > 0 ?
                                dataLoader.currentReadingBooks.map((book) => {
                                    return <li class="reading-book-item">
                                        <BookJacket bookItem={book} />
                                    </li>
                                }) : <NotFoundPage />
                        }
                    </ul>
                </div>
                <div class="suggestion-book">
                    <h2 class="suggestion-book-title">Gợi ý sách</h2>
                    <ul class="suggestion-book-list">
                        {
                            dataLoader.suggestionBooks.length > 0 ?
                                dataLoader.suggestionBooks.map((book) => {
                                    return <li class="reading-book-item">
                                        <BookJacket bookItem={book} />
                                    </li>
                                }) : <NotFoundPage />
                        }
                    </ul>
                </div>
            </div>

            {/* Post Space */}

            <div className="post-space">
                <Dropdown
                    menu={{
                        items,
                    }}>

                    <Space>Bạn bè
                        <DownOutlined />
                    </Space>

                </Dropdown>
                <div class="list-post">
                    {
                        dataLoader.userPost.length > 0 ?
                            dataLoader.userPost.map((post) => {
                                return <ReviewPost postItem={post} />
                            }) : <NotFoundPage />
                    }
                </div>
            </div>

            {/* Book rank and friend */}

            <div className="book-friend stick-to-top">
                <div className="book-rating">
                    <h2 class="rating-tilte">Xếp hạng sách</h2>
                    <ul class="book-rating-list">
                        {
                            dataLoader.favouriteBooks.length > 0 ?
                                dataLoader.favouriteBooks.map((book) => {
                                    return <li class="reading-book-item">
                                        <BookJacket bookItem={book} />
                                    </li>
                                }) : <NotFoundPage />
                        }
                    </ul>
                </div>
                <div className="friend">
                    <h2 class="friend-title">Bạn bè</h2>
                    <ul class="friend-list">
                        {
                            dataLoader.friends.length > 0 ?
                                dataLoader.friends.map((friend) => {
                                    return <li class="friend-item">
                                        <Avartar friendItem={friend}></Avartar>
                                    </li>
                                }) : <NotFoundPage />
                        }
                    </ul>
                </div>
            </div>

        </div>
    )

}

export default UserHomePage
