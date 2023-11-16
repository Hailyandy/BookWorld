import BookJacket from "~/components/ui/BookJacket/BookJacket"
import "./userhome.css"
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import ReviewPost from "~/components/form/Review Post/ReviewPost";
import Avartar from "~/components/ui/Avartar/Avartar";


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

const UserHome = () => {
  return (
    <div className="user-home-container">


      {/* List Book */}

      <div className="list-book">
        <div class="reading-book">
          <h2 class="reading-book-title">Sách đang đọc</h2>
          <ul class="reading-book-list">
            <li class="reading-book-item">
              <BookJacket />
            </li>
            <li class="reading-book-item">
              <BookJacket />
            </li>
          </ul>
        </div>
        <div class="suggestion-book">
          <h2 class="suggestion-book-title">Gợi ý sách</h2>
          <ul class="suggestion-book-list">
            <li class="suggestion-book-item">
              <BookJacket />
            </li>
            <li class="suggestion-book-item">
              <BookJacket />
            </li>
          </ul>
        </div>
      </div>

      {/* Post Space */}

      <div className="post-space">
        <Dropdown
          menu={{
            items,
          }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>Bạn bè
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <div class="list-post">
          <ReviewPost />
          <ReviewPost />
          <ReviewPost />
        </div>
      </div>

      {/* Book rank and friend */}

      <div className="book-friend">
        <div className="book-rating">
          <h2 class="rating-tilte">Bảng xếp hạng sách</h2>
          <ul class="book-rating-list">
            <li class="book-rating-item">
              <BookJacket></BookJacket>
            </li>
            <li class="book-rating-item">
              <BookJacket></BookJacket>
            </li>
            <li class="book-rating-item">
              <BookJacket></BookJacket>
            </li>
          </ul>
        </div>
        <div className="friend">
          <h2 class="friend-title">Bạn bè</h2>
          <ul class="friend-list">
            <li class="friend-item">
              <Avartar></Avartar>
            </li>
            <li class="friend-item">
              <Avartar></Avartar>
            </li>
            <li class="friend-item">
              <Avartar></Avartar>
            </li>

          </ul>
        </div>
      </div>

    </div>
  )

}

export default UserHome
